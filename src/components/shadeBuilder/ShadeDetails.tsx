import MeasurementInput from "../form/MeasurementInput.tsx";

import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {BottomRailCollection, FabricCollection, Measurement} from "../../types";
import SearchDropdown from "../form/SearchDropdown.tsx";

interface SpecificsProps extends QuestionsProps{
    specifics:{
        shadePlacement: "" | "outside" | "inside",
        width: Measurement,
        drop: Measurement,
        fabric: FabricCollection | undefined,
        bottomRail: BottomRailCollection | undefined,
    },
    setSpecifics: (
        value: {
            shadePlacement: "" | "outside" | "inside",
            width: Measurement,
            drop: Measurement,
            fabric: FabricCollection | undefined,
            bottomRail: BottomRailCollection | undefined,
        }) => void,
    fabricOptions: FabricCollection[],
    bottomRailOptions: BottomRailCollection[],
}

function ShadeDetails({specifics, setSpecifics, onNext, fabricOptions, bottomRailOptions, ...props}: SpecificsProps) {


    const fullyAnswered = () => {
        const width = specifics.width
        const drop = specifics.drop
        const fabric = specifics.fabric
        const bottomRail = specifics.bottomRail

        return width.value !== 0 && width.unit != '' && drop.value !== 0 && drop.unit != '' && fabric !== undefined && bottomRail !== undefined
    }

    const errorMsg = () => {
        const width = specifics.width
        const drop = specifics.drop

        return width.value !== 0 && width.unit != '' ?
            (drop.value !== 0 && drop.unit != '' ? '' : 'Please enter a drop') :
            (drop.value !== 0 && drop.unit != '' ? 'Please enter a width' : 'Please enter a width and drop');
    }

    return (
        <QuestionTemplate
            style={`flex flex-col items-center justify-center`}
            title={'Shade Details'}
            answered={fullyAnswered}
            onNext={onNext}
            errorMsg={errorMsg}
            {...props}
        >
            <div className={`flex flex-col w-full justify-center items-center gap-3`}>
                <MeasurementInput
                    label={"Width"}
                    setMeasurement={(width) => {
                        setSpecifics({...specifics, width})
                    }}
                    measurement={specifics.width}
                />
                <MeasurementInput
                    label={"Drop"}
                    setMeasurement={(drop) => setSpecifics({...specifics, drop})}
                    measurement={specifics.drop}
                />
            </div>
            <div className={`flex flex-col w-full justify-center items-center gap-3`}>
                <SearchDropdown
                    label={"Fabric"}
                    selected={specifics.fabric && specifics.fabric.name}
                    setSelected={(value) => {
                        const fabric = fabricOptions.find((f) => f.name === value)
                        setSpecifics({...specifics, fabric})
                    }}
                    options={fabricOptions.map((fabric) => fabric.name)}
                />
                <SearchDropdown
                    label={"Bottom Rail"}
                    selected={specifics.bottomRail && specifics.bottomRail.name}
                    setSelected={(value) => {
                        const bottomRail = bottomRailOptions.find((br) => br.name === value)
                        setSpecifics({...specifics, bottomRail})
                        console.log("Updated bottom Rail: ", specifics)
                    }}
                    options={bottomRailOptions.map((br) => br.name)}
                />
            </div>
        </QuestionTemplate>
    )
}

export default ShadeDetails;