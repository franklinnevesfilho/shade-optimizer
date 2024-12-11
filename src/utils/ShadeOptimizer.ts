import {BottomRailCollection, FabricCollection, Measurement, SystemCollection, TubeCollection} from "../types";
import {convert} from "./MeasurementConverter.ts";

function getRollUpDiameter(drop: Measurement, tubeOuterDiameter: Measurement, fabricThickness: Measurement, unit:string = "mm"){
    drop = convert(drop, unit);
    tubeOuterDiameter = convert(tubeOuterDiameter, unit);
    fabricThickness = convert(fabricThickness, unit);

    // square root of ( tubeOuterDiameter^2 + (4 * fabricThickness * drop)/pi )
    // return a Measurement object

    return {
        value: Math.sqrt(Math.pow(tubeOuterDiameter.value, 2) + (4 * fabricThickness.value * drop.value) / Math.PI),
        unit: unit
    }
}

function getMaxDrop(maxRollUp: Measurement, tubOuterDiameter: Measurement, fabricThickness: Measurement, unit: string = 'mm'){
    maxRollUp = convert(maxRollUp, unit);
    tubOuterDiameter = convert(tubOuterDiameter, unit);
    fabricThickness = convert(fabricThickness, unit);

    return{
        value: (Math.PI * (((Math.pow(maxRollUp.value, 2) - Math.pow(tubOuterDiameter.value, 2))/4))) / fabricThickness.value,
        unit: unit
    }

}

function getMomentOfInertia(tube: TubeCollection){
    let innerDiameter = convert(tube.insideDiameter, tube.outsideDiameter.unit);

    let tubeThickness = {
        value: tube.outsideDiameter.value - innerDiameter.value,
        unit: tube.outsideDiameter.unit
    }
    tubeThickness = convert(tubeThickness, 'mm');
    innerDiameter = convert(innerDiameter, 'mm');

    const moment = (Math.PI * ((Math.pow(innerDiameter.value, 4)) - (Math.pow((innerDiameter.value - (2 * tubeThickness.value)), 4)))) / 64;

    return {
        value: moment,
        unit: 'mm4'
    }


}

function getFabricWeight(fabric: FabricCollection, width: Measurement, drop: Measurement, unit: string = 'kg'){
    unit = unit + '/m2';

    const weight = convert(fabric.weight, unit);
    drop = convert(drop, 'm');
    width = convert(width, 'm');

    return {
        value: weight.value * width.value * drop.value,
        unit: unit
    }

}

function getBottomRailWeight(bottomRail: BottomRailCollection, length: Measurement, weightUnit: string = 'kg'){
    weightUnit = weightUnit + '/m';
    const weight = convert(bottomRail.weight, weightUnit);
    length = convert(length, 'm');

    return {
        value: weight.value * length.value,
        unit: weightUnit
    }
}

function getTotalLoad(fabric:FabricCollection, bottomRail:BottomRailCollection, width:Measurement, drop:Measurement){
    drop = convert(drop, 'm');
    width = convert(width, 'm');

    let fabricWeight = getFabricWeight(fabric, width, drop);
    fabricWeight = convert(fabricWeight, 'N');

    let bottomRailWeight = getBottomRailWeight(bottomRail, width);
    bottomRailWeight = convert(bottomRailWeight, 'N');

    return {
        value: fabricWeight.value + bottomRailWeight.value,
        unit: 'N'
    }
}

function getTubeDeflection(fabric:FabricCollection, bottomRail: BottomRailCollection, tube:TubeCollection, width:Measurement, drop:Measurement, unit: string = 'mm'){
    const L = convert(width, 'mm')
    const E = convert(tube.modulus, 'N/mm2')

    const W = getTotalLoad(fabric, bottomRail, width, drop)
    const I = getMomentOfInertia(tube)

    const deflection = (5 * W.value * Math.pow(L.value, 3)) / (384 * E.value * I.value)

    return convert({ value: deflection, unit: unit }, unit)
}


function getSystemLimit(system: SystemCollection, fabric: FabricCollection, tube: TubeCollection, bottomRail: BottomRailCollection){
    const maxDeflection = 2.99

    let maxDrop = getMaxDrop(system.maxDiameter, tube.outsideDiameter, fabric.thickness)
    maxDrop = convert(maxDrop, 'mm')

    let fabricWeight = convert(fabric.weight, 'g/mm2')
    fabricWeight = {
        value: fabricWeight.value * maxDrop.value,
        unit: 'g/mm'
    }

    const bottomRailWeight = convert(bottomRail.weight, 'g/mm')

    let W = {
        value: fabricWeight.value + bottomRailWeight.value,
        unit: 'g/mm'
    }

    W = convert(W, 'N')

    const I = getMomentOfInertia(tube)
    const E = convert(tube.modulus, 'N/mm2')

    const maxWidth = Math.pow((maxDeflection * 384 * E.value * I.value) / (5 * W.value), 1/4)

    return{
        maxDrop: maxDrop,
        maxWidth:{
            value: maxWidth,
            unit: 'mm'
        }
    }
}


export {
    getRollUpDiameter,
    getMaxDrop,
    getMomentOfInertia,
    getTotalLoad,
    getTubeDeflection,
    getSystemLimit
}