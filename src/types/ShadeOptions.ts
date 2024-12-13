import {Measurement} from "./Measurement.ts";
import {BottomRailCollection, FabricCollection} from "./Components.ts";

export type ShadeOptions = {
    shadePlacement: "inside" | "outside" | "";
    width: Measurement;
    drop: Measurement;
    fabric: FabricCollection | undefined;
    bottomRail: BottomRailCollection | undefined;
}