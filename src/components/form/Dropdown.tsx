import React, { useState } from "react";

interface DropdownProps {
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
    placeholder?: string;
}

function Dropdown({ options, selected, setSelected, placeholder }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative w-64">
            <button
                onClick={(e) => handleOpen(e)}
                className={`
                    w-full px-4 py-2 text-left border 
                    border-neutral-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-neutral-700
                    flex items-center justify-between
                `}
            >
                <span className={selected ? "text-white" : "text-neutral-400"}>
                    {selected || placeholder || "Select an option"}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            </button>
            {isOpen && (
                <ul
                    className={`
                        absolute z-10 w-full mt-2 bg-neutral-900 border border-neutral-300 rounded-md shadow-lg 
                        max-h-60 overflow-auto 
                    `}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                            className={`
                                px-4 py-2 cursor-pointer text-neutral-200
                                hover:bg-neutral-100 hover:text-neutral-900 
                                ${option === selected ? "bg-neutral-100 text-neutral-900" : "text-neutral-700"}
                            `}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
