import {Title} from "../index.ts";
import {ShadeOptions} from "../../types";
import {useState} from "react";
import Systems from "./Systems.tsx";
import ShadeDetails from "./ShadeDetails.tsx";


function ShadeBuilder() {
    const [curPage, setCurPage] = useState(0)
    const [shadeOptions, setShadeOptions] = useState<ShadeOptions>({
        shadePlacement: '',
        width: {
            value: 0,
            unit: ''
        },
        drop: {
            value: 0,
            unit: ''
        },
        fabric: undefined,
        bottomRail: undefined,
    })

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
            specifics={
                {
                    shadePlacement: shadeOptions.shadePlacement,
                    width: shadeOptions.width,
                    drop: shadeOptions.drop,
                    fabric: shadeOptions.fabric,
                    bottomRail: shadeOptions.bottomRail
                }
            }
            setSpecifics={(value) => setShadeOptions({
                ...shadeOptions,
                shadePlacement: value.shadePlacement,
                width: value.width,
                drop: value.drop,
                fabric: value.fabric,
                bottomRail: value.bottomRail
            })}
            onNext={handleNext}
        />,
        <Systems
            shadeOptions={shadeOptions}
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