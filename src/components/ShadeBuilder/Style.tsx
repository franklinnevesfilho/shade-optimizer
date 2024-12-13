import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {ShadeOption} from "./ShadeOptions.tsx";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";
import {useEffect, useState} from "react";
import {BottomRailCollection, FabricCollection} from "../../types";

interface StyleProps extends QuestionsProps{
    styleOptions: {
        fabric: FabricCollection | undefined,
        bottomRail: BottomRailCollection | undefined
    },
    setStyleOptions: (value: {fabric: FabricCollection | undefined, bottomRail: BottomRailCollection | undefined}) => void
}

function Style({styleOptions, setStyleOptions, ...props}: StyleProps) {
    const [fabricOptions, setFabricOptions] = useState<FabricCollection[]>([]);
    const [bottomRailOptions, setBottomRailOptions] = useState<BottomRailCollection[]>([]);

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

    const errorMsg =
        styleOptions.fabric !== undefined ?
            (styleOptions.bottomRail !== undefined ? '' : 'Please select a bottom rail') :
            (styleOptions.bottomRail !== undefined ? 'Please select a fabric' : 'Please select a fabric and bottom rail');


    return (
        <QuestionTemplate
            title={'Shade Style'}
            answered={
                styleOptions.fabric !== undefined && styleOptions.bottomRail !== undefined
            }
            errorMsg={errorMsg}
            {...props}
        >
            <ShadeOption
                label={"Fabric"}
                options={fabricOptions.map((fabric) => fabric.name)}
                selected={styleOptions.fabric !== undefined ? styleOptions.fabric.name : ''}
                setSelected={(fabricName) =>{
                    const fabric = fabricOptions.find((f) => f.name === fabricName)
                    setStyleOptions({...styleOptions, fabric})
                }}
            />
            <ShadeOption
                label={"Bottom Rail"}
                options={bottomRailOptions.map((bottomRail) => bottomRail.name)}
                selected={styleOptions.bottomRail !== undefined ? styleOptions.bottomRail.name : ''}
                setSelected={(bottomRailName) => {
                    const bottomRail = bottomRailOptions.find((br) => br.name === bottomRailName)
                    setStyleOptions({...styleOptions, bottomRail})
                }}
            />
        </QuestionTemplate>
    );
}

export default Style;