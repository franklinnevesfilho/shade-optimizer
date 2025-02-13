import MeasurementInput from "../form/MeasurementInput.tsx";

import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {BottomRailCollection, FabricCollection, Measurement} from "../../types";
import {useEffect, useState} from "react";
import SearchDropdown from "../form/SearchDropdown.tsx";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";

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
}

function ShadeDetails({specifics, setSpecifics, onNext, ...props}: SpecificsProps) {
    const [fabricOptions, setFabricOptions] = useState<FabricCollection[]>([]);
    const [bottomRailOptions, setBottomRailOptions] = useState<BottomRailCollection[]>([]);




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

    useEffect(() => {
        const getOptions = async () => {
            const fabricOptions:FabricCollection[] = [];
            const bottomRailOptions:BottomRailCollection[] = [];

            const fabricSnapshot = await getDocs(collection(firebaseDB, 'FabricCollection'));
            fabricSnapshot.forEach((doc) => {
                const fabric: FabricCollection = doc.data() as FabricCollection
                fabricOptions.push(fabric)
            });

            const bottomRailSnapshot = await getDocs(collection(firebaseDB, 'BottomRailCollection'));
            bottomRailSnapshot.forEach((doc) => {
                const bottomRail: BottomRailCollection = doc.data() as BottomRailCollection
                bottomRailOptions.push(bottomRail)

            });

            setFabricOptions(fabricOptions);
            setBottomRailOptions(bottomRailOptions);
        }

        getOptions();

    },[])

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