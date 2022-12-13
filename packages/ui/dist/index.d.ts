import { FC, ImgHTMLAttributes, ReactNode, CSSProperties } from 'react';

declare const Button: () => JSX.Element;

interface Props {
    isNumber?: boolean;
    value?: string[];
    onChange: (value: string[]) => void;
}
declare const MultiInput: FC<Props>;

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> & {
    /**
     * @description 模糊图的哈希值，用于占位
     */
    hash?: string;
    /**
     * @description 图片主色，用于占位
     */
    color?: string;
    /**
     * @description 控制是否开启占位，传入占位组件视为开启
     * @default true
     */
    placeholder?: ReactNode;
    /**
     * @description 图片宽高比
     */
    ratio?: number;
    /**
     * @description 内部图片样式
     */
    imageStyle?: CSSProperties;
    /**
     * @description 是否支持缩放
     * @default false
     */
    zoomable?: boolean;
    /**
     * @description 是否启用图片居中
     * @default false
     */
    coverAndCenter?: boolean;
    /**
     * @description 解决子节点在进行透明度变化时，忽略父节点 overflow:hidden 和圆角的问题
     * @see https://stackoverflow.com/questions/42297303/css-opacity-transition-ignoring-overflowhidden-in-chrome-safari
     */
    fixOpacityIgnoreHidden?: boolean;
};
declare const Image: FC<ImageProps>;

export { Button, Image, ImageProps, MultiInput };
