import React from 'react';
import {AddItemProps} from "../../types/Editable.ts";
import {SystemCollection} from "../../types";
import ThemedInput from "../form/ThemedInput.tsx";
import MeasurementInput from "../form/MeasurementInput.tsx";
import DefaultButton from "../basic/DefaultButton.tsx";

function AddSystem({onSave, item}: AddItemProps) {
    const [system, setSystem] = React.useState<SystemCollection>(item as SystemCollection || {
            id: "",
            name: "",
            maxDiameter: {
                value: 0,
                unit: "mm"
            }
    });

    return (
        <div className={`
        flex flex-col items-center justify-center gap-3 
        `}>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <div className="block text-lg font-medium mb-1">Id</div>
                {
                    item ? (
                        <div className="text-lg font-medium">{system.id}</div>
                    ) : (
                        <ThemedInput
                            value={system.id}
                            onChange={(e) => setSystem((prev) => ({...prev, id: e.target.value}))}
                        />
                    )
                }
            </div>

            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Name*</label>
                <ThemedInput
                    value={system.name}
                    onChange={(e) => setSystem((prev) => ({...prev, name: e.target.value}))}
                />
            </div>
            <MeasurementInput
                label="Max Diameter*"
                measurement={system.maxDiameter}
                setMeasurement={(measurement) => setSystem((prev) => ({...prev, maxDiameter: measurement}))}
                type="length"
            />
            <DefaultButton
                darkStyle={`bg-green-800 text-neutral-100 border-green-800 hover:bg-green-600 hover:text-white hover:border-green-600`}
                lightStyle={`bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600`}
                onClick={() => onSave(system)}
            >
                Save Bottom Rail
            </DefaultButton>
        </div>
    );
}

export default AddSystem;