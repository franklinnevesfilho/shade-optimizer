import React from 'react';
import {useTheme} from "../../hooks";

interface ThemedInputProps {
    value: never;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}
function ThemedInput({value, onChange, type, placeholder}: ThemedInputProps) {

    const {theme} = useTheme();

    return (
        <input
            className={`
            pointer-events-auto 
            w-full h-[3rem] border  bg-transparent  p-2 rounded
            focus:outline-none focus:border-transparent focus:ring-2
            transition-all duration-300
            ${theme === 'dark' ? 
                (`
                border-neutral-500 text-neutral-300
                focus:ring-neutral-500
                `) : (`
                border-neutral-400 text-neutral-600
                focus:ring-neutral-400
                `)
            }`}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default ThemedInput;