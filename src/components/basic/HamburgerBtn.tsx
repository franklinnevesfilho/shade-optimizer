import {useTheme} from "../../hooks";

interface HamburgerBtnProps {
    state: boolean;
    onToggle: (state: boolean) => void;
    style?: string;
}

function HamburgerBtn({state, onToggle, style }: HamburgerBtnProps) {

    const {theme} = useTheme();

    const handleToggle = () => {
        onToggle(!state);
    }

    const darkStyle = `
        text-neutral-300
        border-neutral-700
        hover:border-neutral-500
    `;
    const lightStyle = `
        
        text-neutral-800 
        border-neutral-300
        hover:border-neutral-400
    `;

    return (
        <button
            className={`
            bg-transparent
            border-2 rounded-lg p-2 px-5
            active:border-none
            focus:outline-none
            ${style}
            ${theme === 'dark' ? darkStyle : lightStyle}
            `}
            onClick={handleToggle}
        >
            <svg
                className="w-8 h-8 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                {state ? (
                    // Close icon
                    <path
                        className="transition-all duration-300"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    // Hamburger menu icon
                    <path
                        className="transition-all duration-300"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-16 6h16"
                    />
                )}
            </svg>
        </button>
    );
}

export default HamburgerBtn;
