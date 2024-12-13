import {Title} from "../index.ts";
import {ShadeOptions} from "../../types";
import {useState} from "react";
import Specifics from "./Specifics.tsx";
import Style from "./Style.tsx";
import Systems from "./Systems.tsx";


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


    // const questions = [
    //     {
    //         title: 'Shade Specifics',
    //         question:
    //             <>
    //                 <div className={`flex flex-row justify-center items-center gap-3`}>
    //                     <ToggleBtn
    //                         isToggled={shadeOptions.shadePlacement === 'inside'}
    //                         onClick={() => setShadeOptions({
    //                             ...shadeOptions,
    //                             shadePlacement: 'inside'
    //                         })}
    //                         style={`text-xl p-2`}> Inside </ToggleBtn>
    //                     or
    //                     <ToggleBtn
    //                         isToggled={shadeOptions.shadePlacement === 'outside'}
    //                         onClick={() => setShadeOptions({
    //                             ...shadeOptions,
    //                             shadePlacement: 'outside'
    //                         })}
    //                         style={`text-xl p-2`}> Outside </ToggleBtn>
    //
    //                     shade placement?
    //                 </div>
    //                 <MeasurementInput
    //                     label={"Width"}
    //                     setMeasurement={(width) => setShadeOptions({...shadeOptions, width})}
    //                     measurement={shadeOptions.width}
    //                 />
    //                 <MeasurementInput
    //                     label={"Drop"}
    //                     setMeasurement={(drop) => setShadeOptions({...shadeOptions, drop})}
    //                     measurement={shadeOptions.drop}
    //                 />
    //             </>
    //     },
    //
    //     {
    //         title: 'Shade Style',
    //         question:
    //             <>
    //                 <ShadeOption
    //                     label={"Fabric"}
    //                     options={['Fabric 1', 'Fabric 2', 'Fabric 3']}
    //                     selected={shadeOptions.fabric}
    //                     setSelected={(fabric) => setShadeOptions({...shadeOptions, fabric})}
    //                 />
    //                 <ShadeOption
    //                     label={"Bottom Rail"}
    //                     options={['Rail 1', 'Rail 2', 'Rail 3']}
    //                     selected={shadeOptions.bottomRail}
    //                     setSelected={(bottomRail) => setShadeOptions({...shadeOptions, bottomRail})}
    //                 />
    //             </>
    //     },
    //     {
    //         title: 'Available Systems',
    //         question:
    //             <>
    //                 <ShadeOption
    //                     label={"System"}
    //                     options={['System 1', 'System 2', 'System 3']}
    //                     selected={shadeOptions.system}
    //                     setSelected={(system) => setShadeOptions({...shadeOptions, system})}
    //                 />
    //             </>
    //     }
    //
    // ]

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
        <Specifics
            specifics={
                {
                    shadePlacement: shadeOptions.shadePlacement,
                    width: shadeOptions.width,
                    drop: shadeOptions.drop
                }
            }
            setSpecifics={(value) => setShadeOptions({
                ...shadeOptions,
                shadePlacement: value.shadePlacement,
                width: value.width,
                drop: value.drop
            })}
            onNext={handleNext}
        />,
        <Style
            styleOptions={{
                fabric: shadeOptions.fabric,
                bottomRail: shadeOptions.bottomRail
            }}
            setStyleOptions={(value) => setShadeOptions({
                ...shadeOptions,
                fabric: value.fabric,
                bottomRail: value.bottomRail
            })}
            onNext={handleNext}
            onPrev={handlePrev}
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