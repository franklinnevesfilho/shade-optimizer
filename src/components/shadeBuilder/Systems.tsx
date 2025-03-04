import {useState, useEffect} from "react";
import QuestionTemplate, {QuestionsProps} from "./QuestionTemplate.tsx";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";
import {
    BottomRailCollection,
    FabricCollection, Measurement,
    ShadeOptions,
    SystemCollection,
    SystemOptions,
    TubeCollection
} from "../../types";
import {getSystems, round} from "../../utils/ShadeOptimizer.ts";
import SearchDropdown from "../form/SearchDropdown.tsx";
import ThemedInput from "../form/ThemedInput.tsx";

interface SystemsProps  extends QuestionsProps{
    shadeOptions: ShadeOptions,
    setShadeOptions: (value: ShadeOptions) => void
    fabricOptions: FabricCollection[],
    bottomRailOptions: BottomRailCollection[],
}

function Systems({shadeOptions, setShadeOptions, fabricOptions, bottomRailOptions, ...props}: SystemsProps) {
    const [systemOptions, setSystemOptions] = useState<SystemOptions[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filterOptions = (options: SystemOptions[]) => {
        const search = searchTerm.toLowerCase().trim();
        if(search === '') return options;

        // filter the options that include any word or both words in the search term
        // create a set so no repeated options
        const filteredOptions = new Set<SystemOptions>();
        for( const option of options){
            const terms = search.split(' ');
            const optionName = option.system.name.toLowerCase();

            // if all terms is in the option name, add it to the set
            if(terms.every((term) => optionName.includes(term))){
                filteredOptions.add(option);
            }
        }

        return Array.from(filteredOptions);
    }

    const ShadeOption = () => {

        const ShowMeasurement = ({label, measurement}: { label: string, measurement: Measurement }) =>{
            return (
                <div className={`w-full text-center`}>
                    {label + ': '} <span className={'border-b'}>{measurement.value + ' ' + measurement.unit}</span>
                </div>
            )
        }

        return (
            <div className={`
            flex flex-col md:flex-row w-full gap-5
            justify-center items-center
            `}>
                <div className={`
                w-full md:w-1/3 text-xl font-medium
                flex flex-col items-center justify-center gap-3 
                `}>
                    <ShowMeasurement label={'Width'} measurement={shadeOptions.width}/>
                    <ShowMeasurement label={'Drop'} measurement={shadeOptions.drop}/>
                </div>
                <div className={` w-full md:w-1/3
                flex flex-col items-center justify-center gap-3 
                `}>
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

            console.log("Systems: ",systemConfig)

            setSystemOptions(systemConfig);
        }

        getOptions();
    },[ shadeOptions])

    return (
        <QuestionTemplate
            title={'System Details'}
            style={`
            w-full h-full
            flex flex-col items-center justify-center
            `}
            {...props}
        >
            <div className={`
            w-full 
            flex flex-col items-center justify-center
            mb-auto pb-2
            `}>
                <ShadeOption/>
                <div className={`
                w-full mt-5
                `}>
                    <ThemedInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={'Search for a system'}
                    />
                </div>
            </div>
            <div className={`
            w-full h-full
            `}>
                <div
                    className={`
                    w-full border rounded-xl p-2
                    flex flex-row flex-wrap items-center justify-center
                    gap-3 overflow-x-hidden overflow-y-auto max-h-72
                    `}
                >
                    {
                        filterOptions(systemOptions).map((option, index) => (
                            <div
                                key={index}
                                className={`
                                flex flex-col items-center justify-start
                                p-2 border rounded-md
                                `}
                            >
                                <span className={`w-full font-medium border-b`}>{option.system.name}</span>
                                <span className={` w-full text-start mt-1 border-b`}>Available Tubes:</span>
                                <div className={`
                                flex flex-col gap-1 max-w-48 max-h-32 overflow-y-auto overflow-x-hidden
                                px-2 py-1
                                `}>
                                    {
                                        option.options.map((option, index) => (
                                            <div className={`
                                            flex flex-col w-full text-start gap-1 items-start justify-center 
                                            border-b p-0.5 italic
                                            `} key={index}>
                                                <div>{option.tube.name}</div>
                                                <div>Deflection: {round(option.deflection.value) + ' ' +option.deflection.unit}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </QuestionTemplate>
    );
}

export default Systems;