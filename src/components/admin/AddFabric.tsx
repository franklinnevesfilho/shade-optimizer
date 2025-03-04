import {AddItemProps} from "../../types/Editable.ts";
import {FabricCollection} from "../../types";
import {useState} from "react";
import MeasurementInput from "../form/MeasurementInput.tsx";
import ThemedInput from "../form/ThemedInput.tsx";
import ToggleBtn from "../basic/ToggleBtn.tsx";
import {DefaultButton} from "../index.ts";
import Dropdown from "../form/Dropdown.tsx";

function AddFabric({onSave, item}: AddItemProps) {
    const [fabric, setFabric] = useState<FabricCollection>(item as FabricCollection || {
        id: "",
        name: "",
        isNeolux: false,
        maxWidth:{
            value: 0,
            unit: "mm"
        },
        placement: "inside",
        thickness:{
            value: 0,
            unit: "mm"
        },
        weight:{
            value: 0,
            unit: "g/m2"
        }
    });

    return (
        <div className={`
        flex flex-col items-center justify-center gap-3 
        `}>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Id</label>
                {
                    item ? (
                        <div className="text-lg font-medium">{fabric.id}</div>
                    ) : (
                        <ThemedInput
                            value={fabric.id}
                            onChange={(e) => setFabric((prev) => ({...prev, id: e.target.value}))}
                        />
                    )
                }
            </div>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Name*</label>
                <ThemedInput
                    value={fabric.name}
                    onChange={(e) => setFabric((prev) => ({...prev, name: e.target.value}))}
                />
            </div>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Is Neolux</label>
                <ToggleBtn
                    isToggled={fabric.isNeolux == undefined ? false : fabric.isNeolux}
                    onClick={() => setFabric((prev) => ({...prev, isNeolux: !prev.isNeolux}))}
                >
                    {fabric.isNeolux ? "Is Neolux" : "is not Neolux"}
                </ToggleBtn>
            </div>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <label className="block text-md font-medium mb-1">Placement*</label>
                <Dropdown
                    options={["inside", "outside"]}
                    selected={fabric.placement}
                    setSelected={(placement) => setFabric((prev) => ({
                        ...prev,
                        placement: placement == 'inside' ? 'inside' : 'outside'
                    }))}
                />
            </div>
            <div className={'flex flex-row w-full justify-between items-center gap-5'}>
                <MeasurementInput
                    label={"Max Width"}
                    measurement={fabric.maxWidth == undefined ?
                        {
                            value: 0,
                            unit: "mm"
                        } : fabric.maxWidth
                    }
                    setMeasurement={(measurement) => setFabric((prev) => ({...prev, maxWidth: measurement}))}
                    type="length"
                />
            </div>
            <MeasurementInput
                label="Thickness*"
                measurement={fabric.thickness}
                setMeasurement={(measurement) => setFabric((prev) => ({
                    ...prev, thickness:
                    measurement
                }))}
                type="length"
            />
            <MeasurementInput
                label="Weight*"
                measurement={fabric.weight}
                setMeasurement={(measurement) => setFabric((prev) => ({
                    ...prev, weight:
                    measurement
                }))}
                type="fabric"
            />

            <DefaultButton
                darkStyle={`bg-green-800 text-neutral-100 border-green-800 hover:bg-green-600 hover:text-white hover:border-green-600`}
                lightStyle={`bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600`}
                onClick={() => onSave(fabric)}
            >
                Save Fabric
            </DefaultButton>
        </div>
    );
}

export default AddFabric;