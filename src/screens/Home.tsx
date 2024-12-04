import { Card } from "../components";
import {useState} from "react";
import BuildAShade from "../components/BuildAShade.tsx";

enum ShadePlacement {
    Inside = 'Inside',
    Outside = 'Outside'
}

type ShadeOptions = {
    shadePlacement: ShadePlacement;
    fabric: string;
    width: number;
    drop: number;
    system: string;
    bottomRail: string;
}

function Home() {
    const [shadeOptions, setShadeOptions] = useState<ShadeOptions>({
        shadePlacement: ShadePlacement.Inside,
        fabric: '',
        width: 0,
        drop: 0,
        system: '',
        bottomRail: ''
    })

    return (
        <Card
            style={`text-lg`}
        >
            <div className="text-2xl text-center mb-5">Please Answer the following questions:</div>
            <div className="flex flex-col items-center w-full h-full gap-5">
                <BuildAShade
                    shadeOptions={shadeOptions}
                    setShadeOptions={setShadeOptions}
                />
            </div>
        </Card>
    );
}

export default Home;