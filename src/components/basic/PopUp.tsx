import {ReactNode} from 'react';
import Title from './Title.tsx';
import {useTheme} from "../../hooks";

export interface PopUpProps {
    children?: ReactNode;
    title?: string;
    style?: string;
    onClose: (state: boolean) => void;
}

function PopUp({ children, style, onClose, title }: PopUpProps) {
    const {theme} = useTheme()

    const themedStyle = theme === 'dark' ?
        'bg-neutral-800 border-neutral-700' :
        'bg-neutral-50  border-neutral-200';

    const CloseBtn = () => {
        return (
            <button
                className={`
                text-2xl
                btn btn-square bg-transparent border-2
                hover:bg-transparent
                transition-colors duration-300
                ${theme === 'dark' ? 
                    (`
                    text-red-500 border-neutral-700
                    hover:border-red-400 hover:text-red-400
                    `) : (`
                    text-red-600 border-neutral-200
                    hover:border-red-700 hover:text-red-700
                    `)}
                `}
                onClick={() => onClose(false)}
            >
                X
            </button>
        )
    }

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
            <div className={`border rounded-lg flex flex-col w-max h-max ${themedStyle} ${style}`}>
                <div className={`w-full flex flex-row items-center justify-between rounded-t-lg border-b p-3 gap-5 ${themedStyle}`}>
                    <Title>
                        {title}
                    </Title>
                    <CloseBtn/>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PopUp;