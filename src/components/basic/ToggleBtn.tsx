import {useTheme} from "../../hooks";
import {ReactNode} from "react";

interface ToggleBtnProps {
    children: ReactNode;
    onClick?: () => void;
    style?: string;
    isToggled: boolean;
}

function ToggleBtn({onClick, isToggled, style, children}: ToggleBtnProps) {
    const {theme} = useTheme();

    return (
        <button
            className={`
            ${theme === 'dark' ?
            isToggled ? (`
                bg-neutral-400
                text-neutral-900
                border-neutral-700
                hover:border-neutral-300
                hover:text-white
                `):(`
                bg-neutral-800 border-neutral-700
                text-neutral-300
                hover:text-white
                hover:border-neutral-300
                `)
            :
            isToggled ?
                (`bg-neutral-300 
                text-neutral-800 
                border-neutral-300
                hover:text-black
                hover:border-neutral-500`)
                :(`
                bg-neutral-50 border-neutral-200
                text-neutral-800
                hover:text-black
                hover:border-neutral-500
                `)
            }
            ${style}
            `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ToggleBtn;