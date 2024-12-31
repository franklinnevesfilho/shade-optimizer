import {Measurement} from "../types";

type ConversionTable = {
    [from: string]: {
        [to: string]: number;
    }
}

const conversionTable: ConversionTable = {
    "mm": {
        "cm": 0.1,
        "m": 0.001,
        "in": 0.0393701,
        "ft": 0.00328084,
    },
    "cm": {
        "mm": 10,
        "m": 0.01,
        "in": 0.393701,
        "ft": 0.0328084,
    },
    "m": {
        "mm": 1000,
        "cm": 100,
        "in": 39.3701,
        "ft": 3.28084,
    },
    "in": {
        "mm": 25.4,
        "cm": 2.54,
        "m": 0.0254,
        "ft": 0.0833333,
    },
    "ft": {
        "mm": 304.8,
        "cm": 30.48,
        "m": 0.3048,
        "in": 12,
    },
    "g/m":{
        "kg/m": 0.001,
        "g/mm": 0.001
    },
    "g/m2":{
        "kg/m2": 0.001,
        "g/mm2": 1000
    },
    "kg/m":{
        "g/m": 1000,
        "g/mm": 1,
    },
    'kg/m2': {
        'g/m2': 1000,
        'g/mm2': 1
    },
    "kg":{
        "N": 9.8,
        "g": 1000,
        "mg": 1000000
    },
    "g":{
        "N": 0.0098,
        "kg": 0.001,
        "mg": 1000
    },
    "GPa":{
        "N/mm2": 1000,
        "MPa": 1000,
        "kPa": 1000000,
        "Pa": 1000000000
    }
}

export function convert(from:Measurement, to: string): Measurement {

    if(from.unit === to){
        return {
            value: from.value,
            unit: to
        } as Measurement;
    }

    try{
        const value = from.value * conversionTable[from.unit][to];
        return {
            value,
            unit: to
        } as Measurement
    } catch (e){
        console.error("Conversion not possible", e)
    }

    return {
        value: 0,
        unit: to
    } as Measurement;
}