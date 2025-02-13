import {useState, useRef, useEffect} from 'react';
import {useTheme} from "../../hooks";
import SearchIcon from '../../assets/search.tsx'
import ThemedInput from "./ThemedInput.tsx";
import AnimatedCaret from "../basic/AnimatedCaret.tsx";

interface SearchDropdownProps {
    style?: string;
    selected?: string;
    label: string;
    setSelected: (value: string) => void;
    options: string[];
}

function SearchDropdown({ style, setSelected, options, selected, label }: SearchDropdownProps) {
    const[showDropdown, setDropdown] = useState<boolean>(false)
    const[filterBy, setFilterBy] = useState<string>('')
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme()

    const closeDropDown = () => {
        setDropdown(false)
        setFilterBy('')
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropDown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative inline-block w-full" ref={dropdownRef}>
            <div
                className={`
                    ${style}
                    w-full rounded-lg p-2
                    flex items-center justify-between
                    cursor-pointer
                    border border-gray-200
                `}
                onClick={(e) => {
                    e.stopPropagation();
                    setDropdown(!showDropdown);
                }}
            >
                <span>
                    {
                        selected ? selected : 'Select a ' + label
                    }
                </span>
                <AnimatedCaret
                    isOpen={showDropdown}
                />
            </div>

            {showDropdown && (
                <div className={`
                    absolute z-10 w-full mt-1
                    rounded-lg shadow-lg
                    overflow-hidden
                    border
                    ${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-50 text-neutral-800'}
                    `}>
                    <div
                        className={`
                            flex flex-row justify-between items-center
                            p-1 border-b
                        `}
                    >
                        <SearchIcon/>
                        <ThemedInput
                            style={`
                                w-full h-auto
                                border-t-0 border-l-0 border-r-0
                                rounded-none
                                focus-visible:outline-none focus:outline-none
                                focus:outline-none 
                            `}
                            placeholder={'Search'}
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                        />
                    </div>
                    <div
                        className={`
                        overflow-hidden
                        max-h-60 overflow-y-auto
                        `}
                    >
                        {
                            options.filter((option) => option.toLowerCase().includes(filterBy.toLowerCase())).map((option, index) => (
                                <div
                                    key={index}
                                    className={`
                                    relative
                                    p-2 cursor-pointer
                                    `}
                                    onClick={() => {
                                        setSelected(option)
                                        closeDropDown()
                                    }}
                                >
                                    <span
                                        className={`
                                        block text-center w-full
                                        `}
                                    >
                                        {option}
                                    </span>
                                    {selected === option && (
                                        <span className={`
                                            absolute right-2 top-1/2 -translate-y-1/2 text-sm`}>
                                            &#10003;
                                        </span>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchDropdown;