import {Dropdown} from "../index.ts";

export const ShadeOption = ({label, options, selected, setSelected}:{
    label: string,
    options: string[],
    selected: string,
    setSelected: (value: string) => void
}) => {
    return(
        <div className={`flex flex-row justify-center items-center w-full gap-3`}>
            <div
                className={`flex flex-grow`}
            >
                {label}
            </div>
            <Dropdown
                options={options}
                selected={selected}
                setSelected={setSelected}/>
        </div>
    )
}