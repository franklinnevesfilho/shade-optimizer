import React from 'react';
import {TubeCollection} from "../../types";
import ThemedInput from "../form/ThemedInput.tsx";
import MeasurementInput from "../form/MeasurementInput.tsx";
import {AddItemProps} from "../../types/Editable.ts";
import DefaultButton from "../basic/DefaultButton.tsx";


function AddTube({onSave, item}: AddItemProps) {
    const defaultItem: TubeCollection = {
        id: "",
        name: "",
        modulus: {
            value: 68.9,
            unit: "GPa"
        },
        density: {
            value: 2.7,
            unit: "g/cc"
        },
        inner_diameter: {
            value: 0,
            unit: "mm"
        },
        outside_diameter: {
            value: 0,
            unit: "mm"
        }
    }
    const [tube, setTube] = React.useState<TubeCollection>(item as TubeCollection || defaultItem);
    return (
        <div
            className={`
            flex flex-col items-center justify-center gap-3 
            `}
        >
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Id</label>
                {
                    item ? (
                        <div className="text-lg font-medium">{tube.id}</div>
                    ) : (
                        <ThemedInput
                            value={tube.id}
                            onChange={(e) => setTube((prev) => ({...prev, id: e.target.value}))}
                        />
                    )
                }
            </div>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Name*</label>
                <ThemedInput
                    value={tube.name}
                    onChange={(e) => setTube((prev) => ({...prev, name: e.target.value}))}
                />
            </div>

            <MeasurementInput
                label="Inner Diameter*"
                measurement={tube.inner_diameter}
                setMeasurement={(measurement) => setTube((prev) => ({...prev, inner_diameter: measurement}))}
                type="length"
            />
            <MeasurementInput
                label="Outside Diameter*"
                measurement={tube.outside_diameter}
                setMeasurement={(measurement) => setTube((prev) => ({...prev, outside_diameter: measurement}))}
                type="length"
            />

            <div
                className={`
                flex flex-col w-full
               border-2  rounded-lg p-2
                `}
            >
                <MeasurementInput
                    label="MODULUS"
                    measurement={tube.modulus}
                    setMeasurement={(measurement) => setTube((prev) => ({...prev, modulus: measurement}))}
                    type="modulus"
                />
                <MeasurementInput
                    label="DENSITY"
                    measurement={tube.density}
                    setMeasurement={(measurement) => setTube((prev) => ({...prev, density: measurement}))}
                    type="density"
                />
            </div>

            <DefaultButton
                darkStyle={`bg-green-800 text-neutral-100 border-green-800 hover:bg-green-600 hover:text-white hover:border-green-600`}
                lightStyle={`bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600`}
                onClick={() => onSave(tube)}
            >
                Save Tube
            </DefaultButton>
        </div>
    );
}

export default AddTube;