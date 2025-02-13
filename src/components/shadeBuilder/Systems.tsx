import {useState, useEffect} from "react";
import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";
import {
    BottomRailCollection,
    FabricCollection,
    ShadeOptions,
    SystemCollection,
    SystemOptions,
    TubeCollection
} from "../../types";
import {getSystems} from "../../utils/ShadeOptimizer.ts";
import MeasurementInput from "../form/MeasurementInput.tsx";
import SearchDropdown from "../form/SearchDropdown.tsx";

interface SystemsProps  extends QuestionsProps{
    shadeOptions: ShadeOptions,
    setShadeOptions: (value: ShadeOptions) => void
    fabricOptions: FabricCollection[],
    bottomRailOptions: BottomRailCollection[],
}

function Systems({shadeOptions, setShadeOptions, fabricOptions, bottomRailOptions, ...props}: SystemsProps) {
    const [systemOptions, setSystemOptions] = useState<SystemOptions[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const getOptions = async () => {
            const systemOptions:SystemCollection[] = [];
            const tubes: TubeCollection[] = [];

            const systemSnapshot = await getDocs(collection(firebaseDB, 'SystemCollection'));
            systemSnapshot.forEach((doc) => {
                const system: SystemCollection = doc.data() as SystemCollection
                systemOptions.push(system)
            });

            const tubeSnapshot = await getDocs(collection(firebaseDB, 'TubeCollection'));
            tubeSnapshot.forEach((doc) => {
                const tube: TubeCollection = doc.data() as TubeCollection
                tubes.push(tube)
            });

            const systemConfig = getSystems(tubes, systemOptions, shadeOptions)

            setSystemOptions(systemConfig);
        }

        getOptions();

    },[shadeOptions])

    const ShadeOptions = () => {
        return (
            <div className={`
            flex flex-row
            w-3/4
            justify-between items-center
            `}>
                <div>
                    <MeasurementInput
                        label={'Width'}
                        measurement={shadeOptions.width}
                        setMeasurement={ (value) =>
                            setShadeOptions({...shadeOptions, width: value})}
                    />
                    <MeasurementInput
                        label={'Drop'}
                        measurement={shadeOptions.drop}
                        setMeasurement={ (value) =>
                            setShadeOptions({...shadeOptions, drop: value})}
                    />
                </div>
                <div>
                    <SearchDropdown
                        label={"Fabric"}
                        selected={shadeOptions.fabric && shadeOptions.fabric.name}
                        setSelected={(value) => {
                            const fabric = fabricOptions.find((f) => f.name === value)
                            setShadeOptions({...shadeOptions, fabric})
                        }}
                        options={fabricOptions.map((fabric) => fabric.name)}
                    />
                    <SearchDropdown
                        label={"Bottom Rail"}
                        selected={shadeOptions.bottomRail && shadeOptions.bottomRail.name}
                        setSelected={(value) => {
                            const bottomRail = bottomRailOptions.find((br) => br.name === value)
                            setShadeOptions({...shadeOptions, bottomRail})
                        }}
                        options={bottomRailOptions.map((br) => br.name)}
                    />
                </div>
            </div>
        )
    }


    return (
        <QuestionTemplate
            title={'Available Systems'}
            style={`
            w-full h-full
            flex flex-col items-center justify-center
            bg-red-500
            `}
            {...props}
        >
            <ShadeOptions/>
            <div>

            </div>
        </QuestionTemplate>
    );
}

export default Systems;