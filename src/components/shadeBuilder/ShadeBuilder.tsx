import {Title} from "../index.ts";
import {BottomRailCollection, FabricCollection, ShadeOptions} from "../../types";
import {useEffect, useState} from "react";
import Systems from "./Systems.tsx";
import ShadeDetails from "./ShadeDetails.tsx";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";


function ShadeBuilder() {
    const [fabricOptions, setFabricOptions] = useState<FabricCollection[]>([]);
    const [bottomRailOptions, setBottomRailOptions] = useState<BottomRailCollection[]>([]);
    const [curPage, setCurPage] = useState(1)
    const [shadeOptions, setShadeOptions] = useState<ShadeOptions>({
        shadePlacement: '',
        width: {
            value: 60,
            unit: 'in'
        },
        drop: {
            value: 60,
            unit: 'in'
        },
        fabric: {
            id: '',
            name: '',
            thickness: {
                value: 0.65,
                unit: 'mm'
            },
            weight: {
                value: 500,
                unit: 'g/m2'
            }
        } as FabricCollection,
        bottomRail: {
            id: '',
            name: '',
            weight: {
                value: 0.3,
                unit: 'kg/m'
            }
        },
    })

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

    const handleNext = () => {
        if(curPage < questions.length - 1){
            setCurPage(curPage + 1)
        }
    }

    const handlePrev = () => {
        if(curPage > 0){
            setCurPage(curPage - 1)
        }
    }

    const questions = [
        <ShadeDetails
            fabricOptions={fabricOptions}
            bottomRailOptions={bottomRailOptions}
            specifics={
                {
                    shadePlacement: shadeOptions.shadePlacement,
                    width: shadeOptions.width,
                    drop: shadeOptions.drop,
                    fabric: shadeOptions.fabric,
                    bottomRail: shadeOptions.bottomRail
                }
            }
            setSpecifics={(value) =>
                setShadeOptions({
                    ...shadeOptions,
                    shadePlacement: value.shadePlacement,
                    width: value.width,
                    drop: value.drop,
                    fabric: value.fabric,
                    bottomRail: value.bottomRail
                })
            }
            onNext={handleNext}
        />,
        <Systems
            shadeOptions={shadeOptions}
            setShadeOptions={setShadeOptions}
            fabricOptions={fabricOptions}
            bottomRailOptions={bottomRailOptions}
            onPrev={handlePrev}
        />
    ]

    return (
        <div className={`
        flex flex-col justify-center items-center w-full h-full gap-5 
        `}>
            <div className="border-b w-full pb-3 mb-auto">
                <Title>Build Your Shade!</Title>
            </div>
            <div className="flex flex-col w-full h-full gap-5">
                {questions[curPage]}
            </div>
        </div>
    )
}

export default ShadeBuilder;