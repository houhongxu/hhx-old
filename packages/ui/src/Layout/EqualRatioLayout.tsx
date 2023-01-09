import { FC } from 'react'

interface Props {
  ratio?: number
}
// TODO 目前图片可以适配，其他标签与特殊布局需要测试
export const EqualRatioLayout: FC<Props> = ({ ratio = 1, children }) => {
  return (
    <div className='relative w-full h-0 overflow-hidden' style={{ paddingBottom: `${(1 / ratio) * 100}%` }}>
      <div className='absolute w-full h-full'>{children}</div>
    </div>
  )
}
