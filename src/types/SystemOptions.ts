import {SystemCollection, TubeCollection} from "./Components.ts";
import {Measurement} from "./Measurement.ts";

export type SystemOptions = {
    system: SystemCollection;
    options:{
        tube: TubeCollection;
        deflection: Measurement;
    }[]
}