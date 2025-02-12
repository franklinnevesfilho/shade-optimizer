import {BottomRailCollection, FabricCollection} from "../../types";

export const BottomRailOptions: BottomRailCollection[] = [
    {
        name: "Light",
        weight: {
            value: 0.3,
            unit: "kg/m"
        }
    },
    {
        name: "Medium",
        weight: {
            value: 0.5,
            unit: "kg/m"
        }
    },
    {
        name: "Heavy",
        weight: {
            value: 1,
            unit: "kg/m"
        }
    }]

export const FabricOptions : FabricCollection[] = [
    {
        name: "Light",
        placement: "inside",
        thickness: {
            value: 0.3,
            unit: "mm"
        },
        weight: {
            value: 210,
            unit: "g/m2"
        }
    },
    {
        name: "Medium",
        placement: "inside",
        thickness: {
            value: 0.5,
            unit: "mm"
        },
        weight: {
            value: 420,
            unit: "g/m2"
        }
    },
    {
        name: "Heavy",
        placement: "inside",
        thickness: {
            value: 0.7,
            unit: "mm"
        },
        weight: {
            value: 610,
            unit: "g/m2"
        }
    }
]