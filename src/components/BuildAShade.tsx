import {DefaultButton, Dropdown} from "./index.ts";
import {ShadeOptions, ShadePlacement} from "../types";

interface BuildAShadeProps {
    shadeOptions: ShadeOptions;
    setShadeOptions: (shadeOptions: ShadeOptions) => void;
}

function BuildAShade({shadeOptions, setShadeOptions}: BuildAShadeProps) {
    return (
        <>
            <div
                className={`flex flex-row justify-center items-center w-full gap-3`}
            >
                <DefaultButton
                    onClick={() => setShadeOptions({
                        ...shadeOptions,
                        shadePlacement: ShadePlacement.Outside
                    })}
                    style={`
                    text-xl pb-10 
                    ${shadeOptions.shadePlacement === ShadePlacement.Outside ?
                        'bg-neutral-200 text-neutral-900' : ''}
                    `}
                >
                    Outside
                </DefaultButton>
                or
                <DefaultButton
                    onClick={() => setShadeOptions({
                        ...shadeOptions,
                        shadePlacement: ShadePlacement.Inside
                    })}
                    style={`
                    text-xl pb-10 
                    ${shadeOptions.shadePlacement === ShadePlacement.Inside ?
                        'bg-neutral-200 text-neutral-900' : ''}
                    `}
                >
                    Inside
                </DefaultButton>
                shade placement?
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-3">
                Choose the Fabric :
                <Dropdown
                    options={['Fabric 1', 'Fabric 2', 'Fabric 3']}
                    selected={shadeOptions.fabric}
                    setSelected={(fabric) => setShadeOptions({...shadeOptions, fabric})}/>
            </div>
        </>
    )
}

export default BuildAShade;