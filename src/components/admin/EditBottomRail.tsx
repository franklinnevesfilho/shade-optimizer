import {EditableComponentProps} from "../../types/Editable.ts";
import {BottomRailCollection} from "../../types";
import {useState} from "react";
import MeasurementInput from "../form/MeasurementInput.tsx";

function EditBottomRail({item}: EditableComponentProps) {
    const bottomRail = item as BottomRailCollection

    const [weight, setWeight] = useState(bottomRail.weight);

    return (
        <div className={`
            flex flex-col gap-3
        `}>
            <div className="flex flex-row w-full justify-between">
                <label
                    className={`
                text-2xl
                `}
                >Name</label>
                <input
                    className={`
                 p-2 border-neutral-600 border-2 rounded-md
                `}
                    type="text"
                    value={bottomRail.name}
                />
            </div>
            <MeasurementInput
                label={'Weight'}
                measurement={weight}
                setMeasurement={setWeight}
                type={'weight'}
            />
        </div>
    );
}

export default EditBottomRail;