import {BottomRailCollection, FabricCollection, TubeCollection} from "../../types";
import {convert} from "../../utils/MeasurementConverter.ts";
import {getTotalLoad, getTubeDeflection, round} from "../../utils/ShadeOptimizer.ts";
import {BottomRailOptions, FabricOptions} from "./BaseOptions.ts";
import LineChart from "./LineChart.tsx";


interface TubeChartProps {
    tube: TubeCollection,
    widthUnit: string,
    deflectionUnit: string,
    selectedFabric: FabricCollection | undefined,
    selectedBottomRail: BottomRailCollection | undefined
}

export function TubeChart({tube, widthUnit, deflectionUnit, selectedFabric, selectedBottomRail}: TubeChartProps) {

    const lengths = [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4
    ];

    const data = {
        labels: lengths.map((length)=> round(convert({value:length, unit:"m"}, widthUnit).value)),
        datasets: [
            {
                label: `Deflection (${deflectionUnit})`,
                data: lengths.map((length) => {
                    const weight = getTotalLoad(
                        selectedFabric! || FabricOptions[0],
                        selectedBottomRail! || BottomRailOptions[0],
                        {value: length, unit: 'm'}, // width
                        {value: 3, unit: 'm'}, // drop
                    )
                    return getTubeDeflection(
                        tube,
                        {value: length, unit: 'm'}, // width
                        weight,
                        deflectionUnit
                    ).value
                }),
                fill: false,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255, 0.2)',
            },
            {
                label: `Limit (${deflectionUnit})`,
                data: lengths.map(() => {
                    return convert({value: 2.99, unit: 'mm'}, deflectionUnit).value
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