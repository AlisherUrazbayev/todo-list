import React, {useState, ChangeEvent} from 'react';
import Button from "./Button";
import '../App.css';

type AddItemFormPropsType = {
    addItem: (item: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

    let [text, setText] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        setError(null);
    }

    const submitHandler = (text: string) => {
        if (text.trim() !== "") {
            addItem(text.trim());
            setText("");
        } else {
            setError("Invalid input");
        }
    }

    return (
        <div>
            <input value={text} onChange={onChangeInputHandler}
                   onKeyDown={(event) => {
                       if (event.key === "Enter") submitHandler(text);
                   }}
                   className={error ? ".error" : ""}
            />
            <Button name={"+"} callback={() => submitHandler(text)}/>
            {error && <div className={".errorMessage"}>{error}</div>}
        </div>
    );
};

export default AddItemForm;