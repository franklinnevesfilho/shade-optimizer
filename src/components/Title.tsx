import {ReactNode} from 'react';

interface TitleProps {
    children: ReactNode;
    style?: string;
}
function Title({children, style}: TitleProps) {
    return (
        <div className={'text-2xl md:text-4xl font-bold items-center justify-center ' + style}>
            {children}
        </div>
    );
}

export default Title;