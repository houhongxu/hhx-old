import { FC } from 'react';

declare const Button: () => JSX.Element;

interface Props {
    isNumber?: boolean;
    value?: string[];
    onChange: (value: string[]) => void;
}
declare const MultiInput: FC<Props>;

export { Button, MultiInput };
