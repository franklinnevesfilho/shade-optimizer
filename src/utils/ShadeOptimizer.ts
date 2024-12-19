import {
    BottomRailCollection,
    FabricCollection,
    Measurement,
    ShadeOptions,
    SystemCollection, SystemOptions,
    TubeCollection
} from "../types";
import {convert} from "./MeasurementConverter.ts";

function getRollUpDiameter(drop: Measurement, tubeOuterDiameter: Measurement, fabric: FabricCollection, unit:string = "mm"){

    let fabricThickness = fabric.thickness;
    let newDrop = convert(drop, unit);

    if(fabric.isNeolux){
        newDrop = {
            value: newDrop.value * 2,
            unit: newDrop.unit
        }
    }

    tubeOuterDiameter = convert(tubeOuterDiameter, unit);

    fabricThickness = convert(fabricThickness, unit);
    return {
        value: Math.sqrt(Math.pow(tubeOuterDiameter.value, 2) + (4 * fabricThickness.value * newDrop.value) / Math.PI),
        unit: unit
    }
}

function getMaxDrop(maxRollUp: Measurement, tubOuterDiameter: Measurement, fabricThickness: Measurement, unit: string = 'mm'){
    console.log("Get Max Roll up")
    maxRollUp = convert(maxRollUp, unit);
    tubOuterDiameter = convert(tubOuterDiameter, unit);
    fabricThickness = convert(fabricThickness, unit);

    return{
        value: (Math.PI * (((Math.pow(maxRollUp.value, 2) - Math.pow(tubOuterDiameter.value, 2))/4))) / fabricThickness.value,
        unit: unit
    }

}

function getMomentOfInertia(tube: TubeCollection){
    console.log("Tube", tube)
    let innerDiameter = convert(tube.inner_diameter, tube.outside_diameter.unit);

    let tubeThickness = {
        value: tube.outside_diameter.value - innerDiameter.value,
        unit: tube.outside_diameter.unit
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
    const weightUnit = unit + '/m2';

    let weight = convert(fabric.weight, weightUnit);
    drop = convert(drop, 'm');
    width = convert(width, 'm');

    weight = {
        value: weight.value * width.value * drop.value,
        unit: unit
    }

    if ( fabric.isNeolux ){
        weight = {
            value: weight.value * 2,
            unit: unit
        }
    }

    return weight
}

function getBottomRailWeight(bottomRail: BottomRailCollection, length: Measurement, unit: string = 'kg'){
    const weightUnit = unit + '/m';
    const weight = convert(bottomRail.weight, weightUnit);
    length = convert(length, 'm');

    return {
        value: weight.value * length.value,
        unit: unit
    }
}

function getTotalLoad(fabric:FabricCollection, bottomRail:BottomRailCollection, width:Measurement, drop:Measurement){
    drop = convert(drop, 'm');
    width = convert(width, 'm');

    let fabricWeight = getFabricWeight(fabric, width, drop);
    console.log("fabricWeight", fabricWeight)
    fabricWeight = convert(fabricWeight, 'N');
    console.log("fabricWeight in N:", fabricWeight)

    let bottomRailWeight = getBottomRailWeight(bottomRail, width);
    console.log("bottomRailWeight", bottomRailWeight)
    bottomRailWeight = convert(bottomRailWeight, 'N');
    console.log("bottomRailWeight in N:", bottomRailWeight)

    return {
        value: fabricWeight.value + bottomRailWeight.value,
        unit: 'N'
    }
}

function getTubeDeflection(fabric:FabricCollection, bottomRail: BottomRailCollection, tube:TubeCollection, width:Measurement, drop:Measurement, unit: string = 'mm'){
    const L = convert(width, 'mm')
    console.log("L", L)
    const E = convert(tube.modulus, 'N/mm2')
    console.log("E", E)

    const W = getTotalLoad(fabric, bottomRail, width, drop)
    console.log("W", W)
    const I = getMomentOfInertia(tube)
    console.log("I", I)

    const deflection = (5 * W.value * Math.pow(L.value, 3)) / (384 * E.value * I.value)

    return convert({ value: deflection, unit: 'mm' }, unit)
}


function getSystemLimit(system: SystemCollection, fabric: FabricCollection, tube: TubeCollection, bottomRail: BottomRailCollection){
    const maxDeflection = 2.99

    let maxDrop = getMaxDrop(system.maxDiameter, tube.outside_diameter, fabric.thickness)
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

const round = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
}


function getSystems(tubeCollections:TubeCollection[], systemCollections:SystemCollection[], shadeOptions: ShadeOptions): SystemOptions[]{
    const results : SystemOptions[] = []

    console.log("shadeOptions", shadeOptions)

    if (shadeOptions.fabric === undefined || shadeOptions.bottomRail === undefined){
        return []
    }else{
        for(const system of systemCollections){
            for(const tube of tubeCollections){
                const rollUpDiameter = getRollUpDiameter(shadeOptions.drop, tube.outside_diameter, shadeOptions.fabric)
                if(rollUpDiameter.value <= system.maxDiameter.value){
                    const deflection = getTubeDeflection(shadeOptions.fabric, shadeOptions.bottomRail, tube, shadeOptions.width, shadeOptions.drop)

                    if(deflection.value <= 2.99){
                        const completeSystem : SystemOptions | undefined
                            = results.find((result) => result.system.name === system.name) || undefined

                        if(completeSystem === undefined){
                            results.push({
                                system: system,
                                options: [{
                                    tube: tube,
                                    deflection: {
                                        value: round(deflection.value),
                                        unit: deflection.unit
                                    }
                                }]
                            })
                        } else{
                            completeSystem.options.push({
                                tube: tube,
                                deflection: deflection
                            })
                        }
                    }
                }
            }
        }

        return results
    }
}

export {
    getRollUpDiameter,
    getMaxDrop,
    getMomentOfInertia,
    getTotalLoad,
    getTubeDeflection,
    getSystemLimit,
    round,
    getSystems
}