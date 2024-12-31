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

    const [shadeInfo, setShadeInfo] = useState<ShadeInfo>({
        drop: { value: 0, unit: "" },  // Default drop measurement
        fabric: undefined,
        bottomRail: undefined,
        tube: undefined,
        system: undefined,
    });

    const [maxWidth, setMaxWidth] = useState<Measurement>({ value: 0, unit: "cm" });
    const [rollUpDiameter, setRollUpDiameter] = useState<Measurement>({ value: 0, unit: "cm" });

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

        getOptions();
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
            <div className="flex gap-2 w-full items-center justify-between">
                System
            <Dropdown
                options={systems.map((system) => system.name)}
                selected={shadeInfo.system ? shadeInfo.system.name : ""}
                setSelected={(value) => {
                    const system = systems.find((s) => s.name === value);
                    setShadeInfo({ ...shadeInfo, system });
                }}
            />
            </div>
            <DefaultButton
                onClick={()=> {
                    calculateRollUpDiameter()
                    calculateMaxWidth()
                }}
            >
                Calculate Max Width
            </DefaultButton>
            <div>
                <div>
                    {
                        maxWidth.value > 0 ?
                            `Max Width: ${round(convert(maxWidth, shadeInfo.drop.unit).value)} ${shadeInfo.drop.unit}`
                            : "Please select all options to calculate max width"
                    }
                </div>
                <div>
                    {
                        rollUpDiameter.value > 0 ?
                            `Roll Up Diameter: ${round(convert(rollUpDiameter, shadeInfo.drop.unit).value)} ${shadeInfo.drop.unit}`
                            : "Please select all options to calculate roll up diameter"
                    }
                </div>
            </div>
        </QuestionTemplate>
    );
}

export default MaxWidth;
