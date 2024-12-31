import {useState, useEffect} from "react";
import {ShadeOption} from "./ShadeOptions.tsx";
import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {collection, getDocs} from "firebase/firestore";
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
            <div className={`flex flex-col border p-2 rounded-lg`}>
                <div>Tube: <span className={`font-bold`}>{tube.name}</span></div>
                <div>Deflection: {deflection.value.toPrecision(2)} {deflection.unit}</div>
            </div>
        )
    }

    return (
        <QuestionTemplate
            title={'Available Systems'}
            style={`
            w-full h-full
            `}
            answered={answered}
            {...props}
        >
            <ShadeOption
                options={systemOptions.map((system) => system.system.name)}
                selected={selectedSystem?.system.name || ''}
                setSelected={(system) => {
                    setSelectedSystem(systemOptions.find((option) => option.system.name === system))
                }}
            />
            <div className="flex flex-col gap-5 justify-start items-center border-t-2 p-2 w-full h-full ">
                <div className={` flex flex-col gap-2 w-[80%]
                p-2 pb-0 border-b italic text-lg font-bold justify-center items-center 
                `}>Tubes: </div>

                <div className={`flex flex-row gap-2 w-full justify-center items-center `}>
                    {
                        selectedSystem?.options.map((option, index) => {
                            return (
                                <TubeCard key={index} tube={option.tube} deflection={option.deflection}/>
                            )
                        })
                    }
                </div>
            </div>
        </QuestionTemplate>
    );
}

export default Systems;