import {Measurement} from "./Measurement.ts";

export type ShadeOptions = {
    shadePlacement: "inside" | "outside" | "";
    fabric: string;
    width: Measurement;
    drop: Measurement;
    system: string;
    bottomRail: string;
}