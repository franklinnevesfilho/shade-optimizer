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
    maxRollUp = convert(maxRollUp, unit);
    tubOuterDiameter = convert(tubOuterDiameter, unit);
    fabricThickness = convert(fabricThickness, unit);

    return{
        value: (Math.PI * (((Math.pow(maxRollUp.value, 2) - Math.pow(tubOuterDiameter.value, 2))/4))) / fabricThickness.value,
        unit: unit
    }

}

function getMomentOfInertia(tube: TubeCollection){
    let innerDiameter = convert(tube.inner_diameter, tube.outside_diameter.unit);

    let tubeThickness = {
        value: tube.outside_diameter.value - innerDiameter.value,
        unit: tube.outside_diameter.unit
    }
    tubeThickness = convert(tubeThickness, 'mm');
    innerDiameter = convert(innerDiameter, 'mm');

    const moment =
        (Math.PI * ((Math.pow(innerDiameter.value, 4)) -
            (Math.pow((innerDiameter.value -
                (2 * tubeThickness.value)), 4)))) / 64;

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
    fabricWeight = convert(fabricWeight, 'N');

    let bottomRailWeight = getBottomRailWeight(bottomRail, width);
    bottomRailWeight = convert(bottomRailWeight, 'N');

    return {
        value: fabricWeight.value + bottomRailWeight.value,
        unit: 'N'
    }
}

function getTubeDeflection(tube:TubeCollection, width:Measurement, totalWeight: Measurement, unit: string = 'mm'){
    const L = convert(width, 'mm')
    const E = convert(tube.modulus, 'N/mm2')

    const W = totalWeight
    const I = getMomentOfInertia(tube)


    const deflection = (5 * W.value * Math.pow(L.value, 3)) / (384 * E.value * I.value)

    return convert({ value: deflection, unit: 'mm' }, unit)
}

function getMaxWidth(fabric:FabricCollection, tube:TubeCollection, bottomRail:BottomRailCollection, drop:Measurement){
    const maxDeflection = 2.99

    drop = convert(drop, 'm')
    let fabricWeight = convert(fabric.weight, 'g/m2')
    fabricWeight = {
        value: (fabricWeight.value * drop.value) / 1000,
        unit: 'g/mm'
    }

    const bottomRailWeight = convert(bottomRail.weight, 'g/mm')

    let W = {
        value: fabricWeight.value + bottomRailWeight.value,
        unit: 'g'
    }

    W = convert(W, 'N')

    const I = getMomentOfInertia(tube)
    const E = convert(tube.modulus, 'N/mm2')

    const maxWidth =
        Math.pow((maxDeflection * 384 * E.value * I.value) / (5 * W.value), 1/4)
    return{
            value: maxWidth,
            unit: 'mm'
    }
}

function getSystemLimit(system: SystemCollection, fabric: FabricCollection, tube: TubeCollection, bottomRail: BottomRailCollection){
    let maxDrop = getMaxDrop(system.maxDiameter, tube.outside_diameter, fabric.thickness)
    maxDrop = convert(maxDrop, 'mm')

    return {
        maxDrop: maxDrop,
        maxWidth: getMaxWidth(fabric, tube, bottomRail, maxDrop)
    }
}

const round = (value: number) => {
    return Number(value.toPrecision(2))
}


function getSystems(tubeCollections:TubeCollection[], systemCollections:SystemCollection[], shadeOptions: ShadeOptions): SystemOptions[]{
    const results : SystemOptions[] = []


    if (shadeOptions.fabric === undefined || shadeOptions.bottomRail === undefined){
        return []
    }else{

        for(const tube of tubeCollections){
            const rollUpDiameter = getRollUpDiameter(shadeOptions.drop, tube.outside_diameter, shadeOptions.fabric)
            const W = getTotalLoad(shadeOptions.fabric, shadeOptions.bottomRail, shadeOptions.width, shadeOptions.drop)
            const deflection = getTubeDeflection(tube, shadeOptions.width, W)

            if(deflection.value <= 2.99){
                for(const system of systemCollections){
                    if(rollUpDiameter.value <= system.maxDiameter.value){
                        const completeSystem : SystemOptions | undefined
                            = results.find((result) => result.system.name === system.name) || undefined

                        if(completeSystem === undefined){
                            results.push({
                                system: system,
                                weight: W,
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
            }else{
                console.log(`Deflection too high for ${tube.name}: ${deflection.value} ${deflection.unit}`)
            }
        }

        // sort tubes in increasing order
        results.map((system)=>{
            system.options.sort((a,b)=>{
                const aNum = parseInt(a.tube.name.slice(0,2))
                const bNum = parseInt(b.tube.name.slice(0,2))
                return aNum - bNum
            })
        })


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
    getSystems,
    getMaxWidth
}