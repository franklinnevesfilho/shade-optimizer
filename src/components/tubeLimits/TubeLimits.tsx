'use client';
import 'chart.js/auto';
import {useEffect, useState} from "react";
import {BottomRailCollection, FabricCollection, TubeCollection} from "../../types";
import {BottomRailOptions, FabricOptions} from "./BaseOptions.ts";
import {Dropdown} from "../index.ts";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";
import {getTubeDeflection} from "../../utils/ShadeOptimizer.ts";
import {convert} from "../../utils/MeasurementConverter.ts";
import LineChart from "./LineChart.tsx";

function TubeLimits() {
    const [selectedFabric, setSelectedFabric] = useState<FabricCollection | undefined>(undefined);
    const [selectedBottomRail, setSelectedBottomRail] = useState<BottomRailCollection | undefined>(undefined);
    const [widthUnit, setWidthUnit] = useState<string>('mm');
    const [deflectionUnit, setDeflectionUnit] = useState<string>('mm');
    const [tubes, setTubes] = useState<TubeCollection[]>([]);


    const SelectOption = ({label, options, placeholder, selectedOption, setOptions}: {
        label: string,
        options: FabricCollection[] | BottomRailCollection[],
        selectedOption: FabricCollection | BottomRailCollection | undefined,
        setOptions: (value: string) => void,
        placeholder?: string
    }) => {

        return (
            <div className="flex flex-row items-center justify-center gap-3 ">
                <div className={`text-2xl`}>{label}</div>
                <Dropdown
                    options={options.map(option => option.name)}
                    selected={selectedOption?.name || ""}
                    setSelected={(value) => setOptions(value)}
                    placeholder={placeholder}
                />
            </div>
        )
    }

    const TubeChart = ({tube}:{tube:TubeCollection}) =>{

        const lengths = [
            0.5, 1, 1.5, 2, 2.5, 3
        ];

        const data = {
            labels: lengths.map((length)=> convert({value:length, unit:"m"}, widthUnit).value),
            datasets: [
                {
                    label: `Deflection (${widthUnit})`,
                    data: lengths.map((length) => {
                        return getTubeDeflection(
                            selectedFabric! || FabricOptions[0],
                            selectedBottomRail! || BottomRailOptions[0],
                            tube,
                            {value: length, unit: 'm'}, // width
                            {value: 3, unit: 'm'}, // drop
                            widthUnit).value
                    }),
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgba(0, 0, 255, 0.2)',
                },
                {
                    label: `Limit (${widthUnit})`,
                    data: lengths.map(() => {
                        return convert({value: 2.99, unit: 'mm'}, widthUnit).value
                    }),
                    fill: false,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderColor: 'rgba(255,0, 0, 0.2)',
                }
            ],
        }

        return(
            <div className="flex flex-col flex-wrap items-center justify-center border rounded-lg p-3">
                <div className="text-2xl">{tube.name}</div>
                <div className="flex flex-col items-center justify-center">
                    <div className="div">
                        <LineChart
                            data={data}
                            xLabel={`Width (${widthUnit})`}
                            yLabel={`Deflection (${deflectionUnit})`}
                        />
                    </div>
                </div>
            </div>
        )
    }

    useEffect(()=>{
        const getTubes = async () => {
            const tubes:TubeCollection[] = [];

            const tubeSnapshot = await getDocs(collection(firebaseDB, 'TubeCollection'));
            tubeSnapshot.forEach((doc) => {
                const tube: TubeCollection = doc.data() as TubeCollection
                tubes.push(tube)
            });

            setTubes(tubes);
        }

        getTubes();

    }, [])


    return (
        <div
            className={`
            w-full h-full flex flex-col items-center justify-center
            `}
        >
            <div className="flex flex-col items-center justify-center w-full pb-5 border-b">
                <div>
                    <div className="text-4xl font-bold">Tube Limits</div>
                </div>
                <div className="flex flex-col w-full items-start justify-start gap-2 ">
                    <SelectOption
                        label="Fabric"
                        options={FabricOptions}
                        selectedOption={selectedFabric}
                        setOptions={(value) => {
                            setSelectedFabric(FabricOptions.find(fabric => fabric.name === value))
                        }}
                        placeholder={"Select Fabric"}
                    />
                    <SelectOption
                        label="Bottom Rail"
                        options={BottomRailOptions}
                        selectedOption={selectedBottomRail}
                        setOptions={(value) => {
                            setSelectedBottomRail(BottomRailOptions.find(bottomRail => bottomRail.name === value))
                        }}
                        placeholder={"Select Bottom Rail"}
                    />
                    <div className="flex flex-row gap-3">
                        <span className={`text-2xl`}>Unit:</span>
                        <Dropdown
                            options={['mm', 'cm', 'in', 'ft']}
                            selected={widthUnit}
                            setSelected={(value) => setWidthUnit(value)}
                            placeholder={"Select Unit"}
                        />
                    </div>
                    <div className="text-sm">*All Measurements are calculated with a drop of 3 meters</div>
                </div>
            </div>
            <div
                className="flex flex-row flex-wrap mt-3 items-center justify-center gap-3 w-full h-3/5 overflow-y-scroll">
                <div className="flex w-full flex-row justify-between">
                    <div className="italic">Total Tubes: {tubes.length}</div>
                    <select name="result" id="">
                        {

                        }
                    </select>
                </div>
                {
                    tubes.map((tube, index) => (
                        <TubeChart key={index} tube={tube}/>
                    ))
                }
            </div>
        </div>
    );
}

export default TubeLimits;