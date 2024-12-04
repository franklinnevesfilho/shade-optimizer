export enum ShadePlacement {
    Inside = 'Inside',
    Outside = 'Outside'
}

export type ShadeOptions = {
    shadePlacement: ShadePlacement;
    fabric: string;
    width: number;
    drop: number;
    system: string;
    bottomRail: string;
}