import {ReactNode} from "react";
import {useTheme} from "../../hooks";

interface CardProps {
    style?: string;
    children?: ReactNode;
}
function Card({children, style}: CardProps) {

    const {theme} = useTheme();

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center mt-5 md:mt-16">
            <div className={`
            ${theme === 'dark' ? 
                'bg-neutral-800 border-neutral-700 ' :
                'bg-neutral-50  border-neutral-200'}
            w-[90%] sm:w-[60%] h-[90%] sm:h-[80%] flex flex-col border-2 rounded-lg shadow-lg p-5 mb-auto relative
            ${style}
            `}>
                {children}
            </div>
        </div>
    )
}

export default Card
