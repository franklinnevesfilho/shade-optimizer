import {Measurement} from "./Measurement.ts";

export type CollectionItem = {
    id: string;
    description: string;
}


export type FabricCollection = {
    name: string;
    placement: "inside" | "outside";
    thickness: Measurement;
    weight: Measurement;
    items: CollectionItem[];
}

export type TubeCollection = {
    name: string;
    modulus: Measurement;
    density: Measurement;
    insideDiameter: Measurement;
    outsideDiameter: Measurement;
    items: CollectionItem[];
}

export type BottomRailCollection = {
    name: string;
    weight: Measurement;
    items: CollectionItem[];
}

export type SystemCollection = {
    name: string;
    maxDiameter: Measurement;
    items: CollectionItem[];
}