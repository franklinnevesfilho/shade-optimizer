import {ItemCollection} from "./Components.ts";

export interface EditableComponentProps {
    item: ItemCollection;
}

export type EditableComponent = (props: EditableComponentProps) => JSX.Element;