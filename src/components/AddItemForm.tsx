import React, {useState, ChangeEvent} from 'react';
import '../App.css';
import {Button, TextField} from "@mui/material";

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
            <TextField id="outlined-basic" label={error} variant="outlined" size="small"
                       value={text} onChange={onChangeInputHandler}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") submitHandler(text);
                       }} error={!!error}
            />

            <Button variant="contained" color="primary" size="small"
                    style={{
                        maxWidth: '40px', maxHeight: '40px', minWidth: '40px',
                        minHeight: '40px', marginLeft: '10px'
                    }}
                    onClick={() => submitHandler(text)}>+</Button>
        </div>
    );
};

export default AddItemForm;