function beginWork(current, workInProgress, renderLanes) {
  var updateLanes = workInProgress.lanes

  {
    if (workInProgress._debugNeedsRemount && current !== null) {
      // This will restart the begin phase with a new fiber.
      return remountFiber(
        current,
        workInProgress,
        createFiberFromTypeAndProps(
          workInProgress.type,
          workInProgress.key,
          workInProgress.pendingProps,
          workInProgress._debugOwner || null,
          workInProgress.mode,
          workInProgress.lanes
        )
      )
    }
  }

  if (current !== null) {
    var oldProps = current.memoizedProps
    var newProps = workInProgress.pendingProps

    if (
      oldProps !== newProps ||
      hasContextChanged() || // Force a re-render if the implementation changed due to hot reload:
      workInProgress.type !== current.type
    ) {
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      didReceiveUpdate = false // This fiber does not have any pending work. Bailout without entering
      // the begin phase. There's still some bookkeeping we that needs to be done
      // in this optimized path, mostly pushing stuff onto the stack.

      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress)
          resetHydrationState()
          break

        case HostComponent:
          pushHostContext(workInProgress)
          break

        case ClassComponent: {
          var Component = workInProgress.type

          if (isContextProvider(Component)) {
            pushContextProvider(workInProgress)
          }

          break
        }

        case HostPortal:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo)
          break

        case ContextProvider: {
          var newValue = workInProgress.memoizedProps.value
          pushProvider(workInProgress, newValue)
          break
        }

        case Profiler:
          {
            // Profiler should only call onRender when one of its descendants actually rendered.
            var hasChildWork = includesSomeLane(renderLanes, workInProgress.childLanes)

            if (hasChildWork) {
              workInProgress.flags |= Update
            } // Reset effect durations for the next eventual effect phase.
            // These are reset during render to allow the DevTools commit hook a chance to read them,

            var stateNode = workInProgress.stateNode
            stateNode.effectDuration = 0
            stateNode.passiveEffectDuration = 0
          }

          break

        case SuspenseComponent: {
          var state = workInProgress.memoizedState

          if (state !== null) {
            {
              if (state.dehydrated !== null) {
                pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current)) // We know that this component will suspend again because if it has
                // been unsuspended it has committed as a resolved Suspense component.
                // If it needs to be retried, it should have work scheduled on it.

                workInProgress.flags |= DidCapture // We should never render the children of a dehydrated boundary until we
                // upgrade it. We return null instead of bailoutOnAlreadyFinishedWork.

                return null
              }
            } // If this boundary is currently timed out, we need to decide
            // whether to retry the primary children, or to skip over it and
            // go straight to the fallback. Check the priority of the primary
            // child fragment.

            var primaryChildFragment = workInProgress.child
            var primaryChildLanes = primaryChildFragment.childLanes

            if (includesSomeLane(renderLanes, primaryChildLanes)) {
              // The primary children have pending work. Use the normal path
              // to attempt to render the primary children again.
              return updateSuspenseComponent(current, workInProgress, renderLanes)
            } else {
              // The primary child fragment does not have pending work marked
              // on it
              pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current)) // The primary children do not have pending work with sufficient
              // priority. Bailout.

              var child = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)

              if (child !== null) {
                // The fallback children have pending work. Skip over the
                // primary children and work on the fallback.
                return child.sibling
              } else {
                return null
              }
            }
          } else {
            pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current))
          }

          break
        }

        case SuspenseListComponent: {
          var didSuspendBefore = (current.flags & DidCapture) !== NoFlags

          var _hasChildWork = includesSomeLane(renderLanes, workInProgress.childLanes)

          if (didSuspendBefore) {
            if (_hasChildWork) {
              // If something was in fallback state last time, and we have all the
              // same children then we're still in progressive loading state.
              // Something might get unblocked by state updates or retries in the
              // tree which will affect the tail. So we need to use the normal
              // path to compute the correct tail.
              return updateSuspenseListComponent(current, workInProgress, renderLanes)
            } // If none of the children had any work, that means that none of
            // them got retried so they'll still be blocked in the same way
            // as before. We can fast bail out.

            workInProgress.flags |= DidCapture
          } // If nothing suspended before and we're rendering the same children,
          // then the tail doesn't matter. Anything new that suspends will work
          // in the "together" mode, so we can continue from the state we had.

          var renderState = workInProgress.memoizedState

          if (renderState !== null) {
            // Reset to the "together" mode in case we've started a different
            // update in the past but didn't complete it.
            renderState.rendering = null
            renderState.tail = null
            renderState.lastEffect = null
          }

          pushSuspenseContext(workInProgress, suspenseStackCursor.current)

          if (_hasChildWork) {
            break
          } else {
            // If none of the children had any work, that means that none of
            // them got retried so they'll still be blocked in the same way
            // as before. We can fast bail out.
            return null
          }
        }

        case OffscreenComponent:
        case LegacyHiddenComponent: {
          // Need to check if the tree still needs to be deferred. This is
          // almost identical to the logic used in the normal update path,
          // so we'll just enter that. The only difference is we'll bail out
          // at the next level instead of this one, because the child props
          // have not changed. Which is fine.
          // TODO: Probably should refactor `beginWork` to split the bailout
          // path from the normal path. I'm tempted to do a labeled break here
          // but I won't :)
          workInProgress.lanes = NoLanes
          return updateOffscreenComponent(current, workInProgress, renderLanes)
        }
      }

      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    } else {
      if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        // This is a special case that only exists for legacy mode.
        // See https://github.com/facebook/react/pull/19216.
        didReceiveUpdate = true
      } else {
        // An update was scheduled on this fiber, but there are no new props
        // nor legacy context. Set this to false. If an update queue or context
        // consumer produces a changed value, it will set this to true. Otherwise,
        // the component will assume the children have not changed and bail out.
        didReceiveUpdate = false
      }
    }
  } else {
    didReceiveUpdate = false
  } // Before entering the begin phase, clear pending update priority.
  // TODO: This assumes that we're about to evaluate the component and process
  // the update queue. However, there's an exception: SimpleMemoComponent
  // sometimes bails out later in the begin phase. This indicates that we should
  // move this assignment out of the common path and into each branch.

  workInProgress.lanes = NoLanes

  switch (workInProgress.tag) {
    case IndeterminateComponent: {
      return mountIndeterminateComponent(current, workInProgress, workInProgress.type, renderLanes)
    }

    case LazyComponent: {
      var elementType = workInProgress.elementType
      return mountLazyComponent(current, workInProgress, elementType, updateLanes, renderLanes)
    }

    case FunctionComponent: {
      var _Component = workInProgress.type
      var unresolvedProps = workInProgress.pendingProps
      var resolvedProps =
        workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps)
      return updateFunctionComponent(current, workInProgress, _Component, resolvedProps, renderLanes)
    }

    case ClassComponent: {
      var _Component2 = workInProgress.type
      var _unresolvedProps = workInProgress.pendingProps

      var _resolvedProps =
        workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps)

      return updateClassComponent(current, workInProgress, _Component2, _resolvedProps, renderLanes)
    }

    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)

    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes)

    case HostText:
      return updateHostText(current, workInProgress)

    case SuspenseComponent:
      return updateSuspenseComponent(current, workInProgress, renderLanes)

    case HostPortal:
      return updatePortalComponent(current, workInProgress, renderLanes)

    case ForwardRef: {
      var type = workInProgress.type
      var _unresolvedProps2 = workInProgress.pendingProps

      var _resolvedProps2 =
        workInProgress.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2)

      return updateForwardRef(current, workInProgress, type, _resolvedProps2, renderLanes)
    }

    case Fragment:
      return updateFragment(current, workInProgress, renderLanes)

    case Mode:
      return updateMode(current, workInProgress, renderLanes)

    case Profiler:
      return updateProfiler(current, workInProgress, renderLanes)

    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes)

    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes)

    case MemoComponent: {
      var _type2 = workInProgress.type
      var _unresolvedProps3 = workInProgress.pendingProps // Resolve outer props first, then resolve inner props.

      var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3)

      {
        if (workInProgress.type !== workInProgress.elementType) {
          var outerPropTypes = _type2.propTypes

          if (outerPropTypes) {
            checkPropTypes(
              outerPropTypes,
              _resolvedProps3, // Resolved for outer only
              'prop',
              getComponentName(_type2)
            )
          }
        }
      }

      _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3)
      return updateMemoComponent(current, workInProgress, _type2, _resolvedProps3, updateLanes, renderLanes)
    }

    case SimpleMemoComponent: {
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateLanes,
        renderLanes
      )
    }

    case IncompleteClassComponent: {
      var _Component3 = workInProgress.type
      var _unresolvedProps4 = workInProgress.pendingProps

      var _resolvedProps4 =
        workInProgress.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4)

      return mountIncompleteClassComponent(current, workInProgress, _Component3, _resolvedProps4, renderLanes)
    }

    case SuspenseListComponent: {
      return updateSuspenseListComponent(current, workInProgress, renderLanes)
    }

    case FundamentalComponent: {
      break
    }

    case ScopeComponent: {
      break
    }

    case Block: {
      {
        var block = workInProgress.type
        var props = workInProgress.pendingProps
        return updateBlock(current, workInProgress, block, props, renderLanes)
      }
    }

    case OffscreenComponent: {
      return updateOffscreenComponent(current, workInProgress, renderLanes)
    }

    case LegacyHiddenComponent: {
      return updateLegacyHiddenComponent(current, workInProgress, renderLanes)
    }
  }

  {
    {
      throw Error(
        'Unknown unit of work tag (' +
          workInProgress.tag +
          '). This error is likely caused by a bug in React. Please file an issue.'
      )
    }
  }
}
