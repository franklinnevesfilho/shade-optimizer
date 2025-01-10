import {ItemCollection} from "./Components.ts";

export interface AddItemProps {
    onSave: (item: ItemCollection) => void;
    item?: ItemCollection;
}

export interface EditableComponentProps {
    item: ItemCollection;
    exit: () => void;
    type: "Fabric" | "Tube" | "BottomRail" | "System";
}

export type EditableComponent = (props: EditableComponentProps) => JSX.Element;