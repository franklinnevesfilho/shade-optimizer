import {BottomRailCollection, FabricCollection, Measurement, SystemCollection, TubeCollection} from "../../types";
import {useEffect, useState} from "react";
import {getDocs, collection} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config";
import {DefaultButton, Dropdown} from "../index.ts";
import {getMaxWidth, getRollUpDiameter, round} from "../../utils/ShadeOptimizer.ts";
import MeasurementInput from "../form/MeasurementInput.tsx";
import QuestionTemplate from "../shadeBuilder/QuestionTemplate.tsx";
import {convert} from "../../utils/MeasurementConverter.ts";

interface ShadeInfo {
    drop: Measurement;
    fabric: FabricCollection | undefined;
    secondaryFabric?: FabricCollection | undefined;
    bottomRail: BottomRailCollection | undefined;
    tube: TubeCollection | undefined;
    system: SystemCollection | undefined;
}

function MaxWidth() {
    const [fabrics, setFabrics] = useState<FabricCollection[]>([]);
    const [bottomRails, setBottomRails] = useState<BottomRailCollection[]>([]);
    const [tubes, setTubes] = useState<TubeCollection[]>([]);
    const [systems, setSystems] = useState<SystemCollection[]>([]);
    const [widthUnit, setWidthUnit] = useState<string>("mm");
    const [rollUpUnit, setRollUpUnit] = useState<string>("mm");

    const [shadeInfo, setShadeInfo] = useState<ShadeInfo>({
        drop: { value: 0, unit: "" },  // Default drop measurement
        fabric: undefined,
        bottomRail: undefined,
        tube: undefined,
        system: undefined,
    });

    const [maxWidth, setMaxWidth] = useState<Measurement>({ value: 0, unit: "in" });
    const [rollUpDiameter, setRollUpDiameter] = useState<Measurement>({ value: 0, unit: "mm" });

    const calculateMaxWidth= () => {
        if (shadeInfo.fabric && shadeInfo.bottomRail && shadeInfo.tube) {
            const width = getMaxWidth(shadeInfo.fabric, shadeInfo.tube, shadeInfo.bottomRail, shadeInfo.drop);
            setMaxWidth(width);
        }
    }

    const calculateRollUpDiameter = () => {
        if (shadeInfo.fabric && shadeInfo.bottomRail && shadeInfo.tube) {
            const diameter = getRollUpDiameter(shadeInfo.drop, shadeInfo.tube.outside_diameter, shadeInfo.fabric, "mm");
            setRollUpDiameter(diameter);
        }
    }

    useEffect(() => {
        const getOptions = async () => {
            const fabricOptions: FabricCollection[] = [];
            const bottomRailOptions: BottomRailCollection[] = [];
            const tubeOptions: TubeCollection[] = [];
            const systemOptions: SystemCollection[] = [];

            const fabricSnapshot = await getDocs(collection(firebaseDB, "FabricCollection"));
            fabricSnapshot.forEach((doc) => {
                const fabric: FabricCollection = doc.data() as FabricCollection;
                fabricOptions.push(fabric);
            });

            const bottomRailSnapshot = await getDocs(collection(firebaseDB, "BottomRailCollection"));
            bottomRailSnapshot.forEach((doc) => {
                const bottomRail: BottomRailCollection = doc.data() as BottomRailCollection;
                bottomRailOptions.push(bottomRail);
            });

            const tubeSnapshot = await getDocs(collection(firebaseDB, "TubeCollection"));
            tubeSnapshot.forEach((doc) => {
                const tube: TubeCollection = doc.data() as TubeCollection;
                tubeOptions.push(tube);
            });

            const systemSnapshot = await getDocs(collection(firebaseDB, "SystemCollection"));
            systemSnapshot.forEach((doc) => {
                const system: SystemCollection = doc.data() as SystemCollection;
                systemOptions.push(system);
            });

            tubeOptions.sort((a,b) => {
                const aNum = parseInt(a.name.slice(0,2))
                const bNum = parseInt(b.name.slice(0,2))
                return aNum - bNum
            })

            setFabrics(fabricOptions);
            setBottomRails(bottomRailOptions);
            setTubes(tubeOptions);
            setSystems(systemOptions);
        };

        getOptions().then();
    }, []);

    return (
        <QuestionTemplate
            title="Max Width"
        >
            <MeasurementInput
                label="Drop"
                setMeasurement={(drop) => {
                    setShadeInfo({ ...shadeInfo, drop });
                }}
                measurement={shadeInfo.drop}
            />
            <div className="flex gap-2 w-full items-center justify-between">
                Tube
                <Dropdown
                    options={tubes.map((tube) => tube.name)}
                    selected={shadeInfo.tube ? shadeInfo.tube.name : ""}
                    setSelected={(value) => {
                        const tube = tubes.find((t) => t.name === value);
                        setShadeInfo({ ...shadeInfo, tube});
                    }}
                />
            </div>
            <div className="flex gap-2 w-full items-center justify-between">
                Fabric
                <Dropdown
                    options={fabrics.map((fabric) => fabric.name)}
                    selected={shadeInfo.fabric ? shadeInfo.fabric.name : ""}
                    setSelected={(value) => {
                        const fabric = fabrics.find((f) => f.name === value);
                        setShadeInfo({ ...shadeInfo, fabric });
                    }}
                />
            </div>
            <div className="flex gap-2 w-full items-center justify-between">
                Bottom Rail
            <Dropdown
                options={bottomRails.map((bottomRail) => bottomRail.name)}
                selected={shadeInfo.bottomRail ? shadeInfo.bottomRail.name : ""}
                setSelected={(value) => {
                    const bottomRail = bottomRails.find((br) => br.name === value);
                    setShadeInfo({ ...shadeInfo, bottomRail });
                }}
            />
            </div>
            <div className={`
                flex flex-row gap-2 w-full justify-center items-center
            `}>
                <DefaultButton
                    style={`w-3/4`}
                    onClick={()=> {
                        calculateRollUpDiameter()
                        calculateMaxWidth()
                    }}
                >
                    Calculate Max Width
                </DefaultButton>
            </div>
            <div className={`
                flex flex-col gap-2 p-2 w-full justify-center items-center
            `}>
                <div className={`
                    flex flex-row w-full justify-between items-center gap-2
                `}>
                    <span>Max Width:</span>
                    {
                        maxWidth.value > 0 && (
                            <div className={`flex flex-row justify-center items-center gap-2`}>
                                <div>{round(convert(maxWidth, widthUnit).value)}</div>
                                <Dropdown
                                    style="w-1/2"
                                    innerStyle="px-0 py-1"
                                    options={["mm", "cm", "in", "m", "ft"]}
                                    selected={widthUnit}
                                    setSelected={(value) => setWidthUnit(value)}
                                    placeholder={"Select Unit"}
                                />
                            </div>
                        )
                    }
                </div>
                <div className={`
                    flex flex-row w-full justify-between items-center gap-2
                `}>
                    <span>Roll Up Diameter:</span>
                    {
                        rollUpDiameter.value > 0 && (
                            <div className={`flex flex-row justify-center items-center gap-2`}>
                                <div>{round(convert(rollUpDiameter, rollUpUnit).value)}</div>
                                <Dropdown
                                    style="w-1/2"
                                    innerStyle="px-0 py-1"
                                    options={["mm", "cm", "in", "m", "ft"]}
                                    selected={rollUpUnit}
                                    setSelected={(value) => setRollUpUnit(value)}
                                    placeholder={"Select Unit"}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                maxWidth.value > 0 && rollUpDiameter.value > 0 && (
                    <div className=" flex flex-col gap-2 w-full p-3 items-center justify-between">
                        <Dropdown
                            style="w-full"
                            options={systems.filter((system) => system.maxDiameter.value >= rollUpDiameter.value).map((system) => system.name)}
                            selected={shadeInfo.system ? shadeInfo.system.name : ""}
                            setSelected={(value) => {
                                const system = systems.find((s) => s.name === value);
                                setShadeInfo({ ...shadeInfo, system });
                            }}
                            placeholder={"Available Systems"}
                        />
                    </div>
                )
            }
        </QuestionTemplate>
    );
}

export default MaxWidth;
