const AnimatedCaret = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`
        h-6 w-6
        transition-all duration-200 ease-in-out
        ${isOpen ? 'rotate-0' : 'rotate-180'}
      `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );
};

export default AnimatedCaret;