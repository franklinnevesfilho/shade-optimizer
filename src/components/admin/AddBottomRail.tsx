import React from 'react';
import {BottomRailCollection} from "../../types";
import ThemedInput from "../form/ThemedInput.tsx";
import MeasurementInput from "../form/MeasurementInput.tsx";
import DefaultButton from "../basic/DefaultButton.tsx";
import {AddItemProps} from "../../types/Editable.ts";

function AddBottomRail({onSave, item}: AddItemProps) {
    const [bottomRail, setBottomRail] = React.useState<BottomRailCollection>(item as BottomRailCollection || {
        id: "",
        name: "",
        weight:{
            value: 0,
            unit: "kg"
        }
    });

    const addBottomRail = () => {
        onSave(bottomRail);
    }

    return (
        <div className={`
        flex flex-col items-center justify-center gap-3 
        `}>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <div className="block text-lg font-medium mb-1">Id</div>
                {
                    item ? (
                        <div className="text-lg font-medium">{bottomRail.id}</div>
                    ) : (
                    <ThemedInput
                        value={bottomRail.id}
                        onChange={(e) => setBottomRail((prev) => ({...prev, id: e.target.value}))}
                    />
                    )
                }
            </div>

            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Name*</label>
                <ThemedInput
                    value={bottomRail.name}
                    onChange={(e) => setBottomRail((prev) => ({...prev, name: e.target.value}))}
                />
            </div>
            <MeasurementInput
                label="Weight*"
                measurement={bottomRail.weight}
                setMeasurement={(measurement) => setBottomRail((prev) => ({...prev, weight: measurement}))}
                type="weight"
            />
            <DefaultButton
                darkStyle={`bg-green-800 text-neutral-100 border-green-800 hover:bg-green-600 hover:text-white hover:border-green-600`}
                lightStyle={`bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600`}
                onClick={() => addBottomRail()}
            >
                Save Bottom Rail
            </DefaultButton>
        </div>
    );
}

export default AddBottomRail;