import React, {ChangeEvent, useState} from 'react';

type EditableTextPropsType = {
    text: string
    callBack: (title: string) => void
}

const EditableText: React.FC<EditableTextPropsType> = ({text, callBack}) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [textValue, setTextValue] = useState<string>(text);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.currentTarget.value);
    }

    const onEditMode = () => {
        setEditMode(true);
    }

    const offEditMode = () => {
        setEditMode(false);
        callBack(textValue);
    }

    return (
        editMode
            ? <input value={textValue} onChange={onChangeHandler}
                     onBlur={offEditMode} autoFocus={true}/>
            : <span onDoubleClick={onEditMode}>{text}</span>
    );
};

export default EditableText;