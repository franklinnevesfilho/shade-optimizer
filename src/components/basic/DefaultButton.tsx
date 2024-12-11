import { ReactNode } from 'react';
import {useTheme} from "../../hooks";

export interface DefaultButtonProps {
    children: ReactNode;
    onClick?: () => void;
    style?: string;
}

function DefaultButton({ children, onClick, style }: DefaultButtonProps) {

    const {theme} = useTheme();

    return (
        <button
            className={`
            border-2 rounded-lg p-2 px-5
                ${theme === 'dark' ? 
                    `bg-neutral-800
                    text-neutral-300
                    border-neutral-700
                    hover:bg-neutral-800
                    hover:border-neutral-500`
                :
                    `bg-neutral-300 
                    text-neutral-800 
                    border-neutral-300
                    hover:bg-neutral-200
                    hover:border-neutral-400`
            }
            ${style}
            `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default DefaultButton;