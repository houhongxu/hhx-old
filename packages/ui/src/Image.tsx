import { cache } from './utils/cache'
import { useInViewport } from 'ahooks'
import classNames from 'classnames'
import mediumZoom, { Zoom } from 'medium-zoom'
import qs from 'query-string'
import { CSSProperties, FC, ImgHTMLAttributes, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Blurhash as BlurImage } from 'react-blurhash'

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> & {
  /**
   * @description 模糊图的哈希值，用于占位
   */
  hash?: string

  /**
   * @description 图片主色，用于占位
   */
  color?: string

  /**
   * @description 控制是否开启占位，传入占位组件视为开启
   * @default true
   */
  placeholder?: ReactNode

  /**
   * @description 图片宽高比
   */
  ratio?: number

  /**
   * @description 内部图片样式
   */
  imageStyle?: CSSProperties

  /**
   * @description 是否支持缩放
   * @default false
   */
  zoomable?: boolean
  /**
   * @description 是否启用图片居中
   * @default false
   */
  coverAndCenter?: boolean

  /**
   * @description 解决子节点在进行透明度变化时，忽略父节点 overflow:hidden 和圆角的问题
   * @see https://stackoverflow.com/questions/42297303/css-opacity-transition-ignoring-overflowhidden-in-chrome-safari
   */
  fixOpacityIgnoreHidden?: boolean
}

export const Image: FC<ImageProps> = ({
  imageStyle,
  className,
  style,
  src,
  children,
  onClick,
  onLoad,
  hash: _hash,
  color: _color,
  ratio: _ratio,
  placeholder = true,
  zoomable = false,
  coverAndCenter = false,
  fixOpacityIgnoreHidden = false,
  ...restProps
}) => {
  const ref = useRef(null)
  const [inViewport] = useInViewport(ref)
  const [loading, setLoading] = useState(true)
  const isCached = cache.getState().checkCache(src)
  const [delaying, setDelaying] = useState(true)
  const [zoom, setZoom] = useState<Zoom>()

  const coverAndCenterStyle = {
    top: 0,
    bottom: 0,
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    ...imageStyle,
  } as CSSProperties

  const fixOpacityIgnoreHiddenStyle = {
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    ...style,
  } as CSSProperties

  const { hash, color, ratio } = useMemo(() => {
    try {
      if (!src) throw new Error()

      // 解析链接中的参数
      const query = qs.parseUrl(src).query
      return {
        hash: (query['hash'] as string) || _hash,
        color: (query['color'] as string) || _color,
        ratio: Number(query['width']) / Number(query['height']) || _ratio,
      }
    } catch (err) {
      return {
        hash: _hash,
        color: _color,
        ratio: _ratio,
      }
    }
  }, [_hash, _color, _ratio, src])

  // 图片加载回调
  const handleLoad = useCallback(
    (e: any) => {
      if (onLoad) {
        onLoad(e)
      }
      // 图片加载完成
      setLoading(false)

      // ! 延迟需与占位消失动画同步
      if (!isCached && (placeholder || hash || color)) {
        // 如果无缓存且有占位，图片加载完毕后先占位，延迟显示图片
        setTimeout(() => {
          setDelaying(false)
          cache.getState().setCache(src)
        }, 1000)
      } else {
        // 如果有缓存或者无占位，直接加载
        cache.getState().setCache(src)
      }
    },
    [color, hash, isCached, onLoad, placeholder, src]
  )

  // 图片点击事件
  const handleClick = useCallback(
    (e: any) => {
      if (!zoomable && onClick) {
        onClick(e)
      }
    },
    [zoomable, onClick]
  )

  // 兼容图片缩放模式
  const attachZoom = useCallback(
    (ref) => {
      if (!zoom) return

      if (zoomable) {
        zoom.attach(ref)
      } else {
        zoom.detach(ref)
      }
    },
    [zoomable, zoom]
  )

  useEffect(() => {
    if (!zoom) {
      setZoom(mediumZoom())
    }
  }, [zoom])

  return (
    <div
      ref={ref}
      style={fixOpacityIgnoreHidden ? fixOpacityIgnoreHiddenStyle : style}
      className={classNames('flex items-center justify-center relative', className)}
      onClick={handleClick}
    >
      {/* 按宽高比撑开高度 */}
      {ratio && <div className='' style={{ paddingBottom: (1 / ratio) * 100 + '%' }}></div>}

      {/* 非首次加载有缓存 或 在视图中直接开始加载 */}
      {(isCached || inViewport) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          loading='lazy'
          src={src}
          alt='img'
          className='absolute w-full left-0 right-0 m-0'
          style={coverAndCenter ? coverAndCenterStyle : imageStyle}
          onLoad={handleLoad}
          ref={attachZoom}
          {...restProps}
        />
      )}

      {/* 占位组件 */}
      {/* 有占位组件+首次加载+等待延迟 */}
      {typeof placeholder !== 'boolean' && !isCached && delaying && (
        <div
          className={classNames(
            'absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000',
            loading ? 'opacity-100' : 'opacity-0'
          )}
        >
          {placeholder}
        </div>
      )}
      {/* 无占位组件默认优先模糊图 */}
      {placeholder === true && !isCached && hash && delaying && (
        <BlurImage
          hash={hash}
          className={classNames(
            '!absolute !inset-0 !w-full !h-full transition-opacity duration-1000',
            loading ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      {placeholder === true && !isCached && !hash && color && delaying && (
        <div
          style={{ background: color }}
          className={classNames(
            'absolute inset-0 w-full h-full transition-opacity duration-1000',
            loading ? 'opacity-100' : 'opacity-0'
          )}
        ></div>
      )}

      {children}
    </div>
  )
}
