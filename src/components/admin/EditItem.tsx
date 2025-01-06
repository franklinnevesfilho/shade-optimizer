import {EditableComponentProps} from "../../types/Editable.ts";
import {useState} from "react";
import {BottomRailCollection, FabricCollection, Measurement, SystemCollection, TubeCollection} from "../../types";
import {firebaseDB} from "../../../firebase.config.ts";
import {doc, setDoc} from "firebase/firestore";
import MeasurementInput from "../form/MeasurementInput.tsx";

type AnyCollection = FabricCollection | BottomRailCollection | TubeCollection | SystemCollection;

function EditItem({item, type, exit}: EditableComponentProps) {
    const [obj, setObj] = useState<AnyCollection>(item as AnyCollection)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (field: keyof AnyCollection, value: string | Measurement) => {
        setObj((prev) => ({...prev, [field]: value}))
    }

    const onSave = async () => {
        if (!obj.id) {
            setError("Invalid item: ID is missing.")
            return
        }

        setIsSaving(true)
        setError(null)

        try {
            await setDoc(doc(firebaseDB, `${type}Collection`, obj.id), obj)
            console.log("Saved successfully")
            exit()
        } catch (err) {
            console.error("Error saving:", err)
            setError("Failed to save. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex flex-col">
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {Object.keys(obj).map((key) => {
                const value = obj[key as keyof typeof obj];
                const isMeasurement = typeof value === "object" && value !== null && "value" in value && "unit" in value;
                const isString = typeof value === "string";

                return (
                    <div key={key} className={`flex flex-row  gap-2 items-center justify-between mb-4`}>
                        {isMeasurement ? (
                            <MeasurementInput
                                label={key}
                                measurement={value as Measurement}
                                setMeasurement={(measurement) => handleChange(key as keyof typeof obj, measurement)}
                                type={key as 'weight' | 'length' | undefined}
                            />
                        ) : (
                            <>
                                <label className="block text-sm font-medium mb-1">{key}</label>
                                {isString ? (
                                    <input
                                        type="text"
                                        value={value || ""}
                                        onChange={(e) => handleChange(key as keyof typeof obj, e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (<div>Invalid Data</div>)}
                            </>
                        )}
                    </div>
                );
            })}
            <div className="flex justify-end mt-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                    onClick={exit}
                    disabled={isSaving}
                >
                    Cancel
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${isSaving ? "bg-gray-400" : "bg-green-500"} text-white`}
                    onClick={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default EditItem;