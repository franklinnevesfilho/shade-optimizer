import {useTheme} from "../../hooks";

interface DropdownProps {
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
    placeholder?: string;
}

function Dropdown({ options, selected, setSelected, placeholder }: DropdownProps) {

    const {theme} = useTheme()

    const Option = ({ option }: { option: string }) => (
        <option
            value={option}>
            {option}
        </option>
    );

    return (
        <div className="relative">
            <select
                className={`
                    ${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-50 text-neutral-800'}
                    w-full px-4 py-2 text-left border 
                    border-neutral-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-neutral-700
                    flex items-center justify-between
                `}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option
                    className={`
                        text-neutral-400 
                    `}
                    value="" selected disabled>
                    {placeholder || 'Select an option'}
                </option>
                {options.map((option, index) => (
                    <Option key={index} option={option} />
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
