import { ReactNode } from 'react';

interface DefaultButtonProps {
    children: ReactNode;
    onClick?: () => void;
    style?: string;
}

function DefaultButton({ children, onClick, style }: DefaultButtonProps) {
    return (
        <button
            className={`
                btn bg-neutral-700 text-neutral-100
                hover:bg-neutral-100 hover:text-neutral-800
                ${style}
            `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default DefaultButton;