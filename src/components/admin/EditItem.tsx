import {EditableComponentProps} from "../../types/Editable.ts";

function EditItem({item}: EditableComponentProps) {
    return (
        <div>
            {item.name}
        </div>
    );
}

export default EditItem;