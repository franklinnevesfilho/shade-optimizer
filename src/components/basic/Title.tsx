import {ReactNode} from 'react';
import {useTheme} from "../../hooks";

interface TitleProps {
    children: ReactNode;
    style?: string;
}
function Title({children, style}: TitleProps) {
    const {theme} = useTheme();

    return (
        <div className={`
        ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}
        text-2xl md:text-4xl font-bold items-center justify-center ${style}
        `}>
            {children}
        </div>
    );
}

export default Title;