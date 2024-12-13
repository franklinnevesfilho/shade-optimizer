import {useTheme} from "../../hooks";

function ThemedText({children, className}:{
    children?: string,
    className?: string
}) {

    const {theme} = useTheme();

    return (
        <div className={`
        ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}
        items-center justify-center ${className}
        `}>
            {children}
        </div>
    );
}

export default ThemedText;