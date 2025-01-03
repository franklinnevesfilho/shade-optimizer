import { Measurement } from "./Measurement.ts";

// Base collection item type
export type CollectionItem = {
    id: string;
    description: string;
};

// Base collection interface
export interface ItemCollection {
    id?: string;
    name: string;
    items: CollectionItem[];
}

// Specific collection types extending the base `ItemCollection`
export type FabricCollection = ItemCollection & {
    isNeolux?: boolean;
    placement: "inside" | "outside";
    thickness: Measurement;
    weight: Measurement;
};

export type TubeCollection = ItemCollection & {
    modulus: Measurement;
    density: Measurement;
    inner_diameter: Measurement;
    outside_diameter: Measurement;
};

export type BottomRailCollection = ItemCollection & {
    weight: Measurement;
};

export type SystemCollection = ItemCollection & {
    maxDiameter: Measurement;
};
