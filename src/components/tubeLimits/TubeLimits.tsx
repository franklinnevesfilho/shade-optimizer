'use client';
import 'chart.js/auto';
import {useEffect, useState} from "react";
import {BottomRailCollection, FabricCollection, TubeCollection} from "../../types";
import {BottomRailOptions, FabricOptions} from "./BaseOptions.ts";
import {Dropdown} from "../index.ts";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../firebase.config.ts";
import {TubeChart} from "./TubeChart.tsx";

function TubeLimits() {
    const [selectedFabric, setSelectedFabric] = useState<FabricCollection | undefined>(undefined);
    const [selectedBottomRail, setSelectedBottomRail] = useState<BottomRailCollection | undefined>(undefined);
    const [widthUnit, setWidthUnit] = useState<string>('mm');
    const [deflectionUnit, setDeflectionUnit] = useState<string>('mm');
    const [tubes, setTubes] = useState<TubeCollection[]>([]);


    const SelectOption = ({label, options, placeholder, selectedOption, setOptions}: {
        label: string,
        options: string[],
        selectedOption: string | undefined,
        setOptions: (value: string) => void,
        placeholder?: string
    }) => {

        return (
            <div className="flex flex-row items-center justify-center gap-3 ">
                <div className={`text-2xl`}>{label}</div>
                <Dropdown
                    options={options}
                    selected={selectedOption || ""}
                    setSelected={(value) => setOptions(value)}
                    placeholder={placeholder}
                />
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
                <div className="flex flex-col w-[80%] items-center justify-start gap-3">
                    <div className="flex flex-col md:flex-row w-full items-center justify-between">
                        <SelectOption
                            label="Fabric:"
                            options={FabricOptions.map(fabric => fabric.name)}
                            selectedOption={selectedFabric?.name}
                            setOptions={(value) => {
                                setSelectedFabric(FabricOptions.find(fabric => fabric.name === value))
                            }}
                            placeholder={"Select Fabric"}
                        />
                        <SelectOption
                            label="Bottom Rail:"
                            options={BottomRailOptions.map(bottomRail => bottomRail.name)}
                            selectedOption={selectedBottomRail?.name}
                            setOptions={(value) => {
                                setSelectedBottomRail(BottomRailOptions.find(bottomRail => bottomRail.name === value))
                            }}
                            placeholder={"Select Bottom Rail"}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row w-full items-center justify-between gap-3">
                        <SelectOption
                            label="Width Unit:"
                            options={['mm', 'cm', 'in', 'm', 'ft']}
                            selectedOption={widthUnit}
                            setOptions={(value) => setWidthUnit(value)}
                        />
                        <SelectOption
                            label="Deflection Unit:"
                            options={['mm', 'cm', 'in', 'm', 'ft']}
                            selectedOption={deflectionUnit}
                            setOptions={(value) => setDeflectionUnit(value)}
                        />
                    </div>
                    <div className="text-sm">*All Measurements are calculated with a drop of <span className={`italic`}>9.8 FT | 3 M</span></div>
                </div>
                <div className="flex w-full flex-row justify-between">
                    <div className="italic">Total Tubes: {tubes.length}</div>

                </div>
            </div>
            <div
                className="flex flex-row flex-wrap mt-3 items-center justify-center gap-3 w-full h-3/5 overflow-y-scroll">
                {
                    tubes.map((tube, index) => (
                        <TubeChart
                            key={index}
                            tube={tube}
                            widthUnit={widthUnit}
                            deflectionUnit={deflectionUnit}
                            selectedFabric={selectedFabric}
                            selectedBottomRail={selectedBottomRail}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default TubeLimits;