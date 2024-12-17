import {useState, useEffect} from "react";
import {ShadeOption} from "./ShadeOptions.tsx";
import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {collection, getDocs} from "firebase/firestore";
import ThemedText from "../basic/ThemedText.tsx";
import {firebaseDB} from "../../../firebase.config.ts";
import {Measurement, ShadeOptions, SystemCollection, SystemOptions, TubeCollection} from "../../types";
import {getSystems} from "../../utils/ShadeOptimizer.ts";

interface SystemsProps  extends QuestionsProps{
    shadeOptions: ShadeOptions,
    setShadeOptions?: (value: ShadeOptions) => void
}

function Systems({shadeOptions, ...props}: SystemsProps) {
    const [systemOptions, setSystemOptions] = useState<SystemOptions[]>([]);
    const [selectedSystem, setSelectedSystem] = useState<SystemOptions | undefined>(undefined)


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


    const answered = selectedSystem !== undefined

    const TubeCard = ({tube, deflection}:{tube:TubeCollection, deflection:Measurement}) => {
        return (
            <div className={`flex flex-col border p-2 rounded-lg gap-1 w-2/5`}>
                <div>Tube: {tube.name}</div>
                <div>Deflection: {deflection.value.toPrecision(2)} {deflection.unit}</div>
            </div>
        )
    }

    return (
        <QuestionTemplate
            title={'Available Systems'}
            answered={answered}
            {...props}
        >
            <ShadeOption
                label={"System"}
                options={systemOptions.map((system) => system.system.name)}
                selected={selectedSystem?.system.name || ''}
                setSelected={(system) => {
                    setSelectedSystem(systemOptions.find((option) => option.system.name === system))
                }}
            />
            {
                answered &&
                // make the div scrollable
                <div className={`
                flex flex-col gap-2
                overflow-y-auto w-full h-96
                `}>
                    <ThemedText>Tube Options</ThemedText>
                    <div className="flex flex-row w-full flex-wrap justify-center items-center h-full gap-3">
                        {
                            selectedSystem?.options.map((option, index) => {
                                return(
                                    <TubeCard key={index} tube={option.tube} deflection={option.deflection}/>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </QuestionTemplate>
    );
}

export default Systems;