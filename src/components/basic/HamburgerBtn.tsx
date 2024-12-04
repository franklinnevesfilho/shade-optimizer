
interface HamburgerBtnProps {
    state: boolean;
    onToggle: (state: boolean) => void;
}

function HamburgerBtn({state, onToggle }: HamburgerBtnProps) {
    const handleToggle = () => {
        onToggle(!state);
    }

    return (
        <div>
            <button
                className={`
                p-2 rounded focus:outline-none transition-colors duration-300 bg-transparent
                `}
                aria-label={state ? "Close menu" : "Open menu"}
                aria-expanded={state}
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
        </div>
    );
}

export default HamburgerBtn;
