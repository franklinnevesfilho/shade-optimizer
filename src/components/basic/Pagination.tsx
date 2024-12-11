import {useTheme} from "../../hooks";
import {ReactNode} from "react";

interface PaginationProps {
    numberOfPages: number;
    selectedPage: number;
    setSelectedPage: (page: number) => void;
}

function Pagination({numberOfPages, selectedPage, setSelectedPage}: PaginationProps) {

    const {theme} = useTheme();

    const Button = ({disabled=false, onClick, children}: {
        disabled?: boolean,
        onClick: () => void,
        children: ReactNode
    }) => {

        const darkTheme = `
    bg-neutral-800 border-neutral-700 text-neutral-200
    ${disabled ? `
    bg-neutral-900 border-neutral-700 text-neutral-500
    hover:border-neutral-700 hover:bg-neutral-900
    ` : `
    cursor-pointer hover:border-neutral-500 hover:bg-neutral-700
    `}
    
    transition duration-300 ease-in-out
    `
        const lightTheme = `
    bg-neutral-100 border-neutral-400 text-neutral-800
    ${disabled ? `
    bg-neutral-50 border-neutral-400 text-neutral-500
    hover:border-neutral-400 hover:bg-neutral-100
    ` : `
    cursor-pointer hover:border-neutral-500 hover:bg-neutral-200
    `}
    transition duration-300 ease-in-out
    `

        return (
            <button
                className={theme === 'dark' ? darkTheme : lightTheme}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }

    return (
        <div className={`flex flex-row w-full items-center justify-center gap-3`}>
            <Button
                disabled={selectedPage === 0}
                onClick={() => {
                    if (selectedPage > 0) {
                        setSelectedPage(selectedPage - 1)
                    }
                }}
            >
                {
                    selectedPage < numberOfPages - 1 ? 'Prev' : 'Back'
                }
            </Button>
            {
                selectedPage < numberOfPages-1 &&(
                    <Button
                        onClick={() => {
                            if (selectedPage < numberOfPages - 1) {
                                setSelectedPage(selectedPage + 1)
                            }
                        }}
                    >
                        {
                            selectedPage === numberOfPages - 1 ? 'Finish' : 'Next'
                        }
                    </Button>
                )
            }
        </div>
    );
}

export default Pagination;