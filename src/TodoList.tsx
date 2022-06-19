import React, {ChangeEvent, useState} from "react";
import Button from "./components/Button";
import {FilterValueTypes} from "./App";


type TodoListPropsType = {
    title?: string | number
    tasks: Array<TasksTodoListPropsType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueTypes) => void
    addTask: (title: string) => void
    changeTaskStatus: (status: boolean, id: string) => void
}

export type TasksTodoListPropsType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState("");

    const addTaskHandler = (title: string) => {
        props.addTask(title);
        setTaskTitle("");
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let taskValue = event.currentTarget.value;
        setTaskTitle(taskValue);
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id);
    }

    const changeFilterHandler = (filter: FilterValueTypes) => {
        props.changeFilter(filter);
    }

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeTaskStatus(event.currentTarget.checked, id);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeInputHandler}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") addTaskHandler(taskTitle);
                       }}/>
                <Button name={"+"} callback={() => addTaskHandler(taskTitle)}/>
            </div>
            <ul>
                {props.tasks.map(element => {
                    return (
                        <li key={element.id}>
                            <input type="checkbox" defaultChecked={element.isDone}
                                   onChange={(event) => onChangeCheckboxHandler(event, element.id)}/>
                            <span>{element.title}</span>
                            <Button name={"Delete"} callback={() => removeTaskHandler(element.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={"All"} callback={() => changeFilterHandler("all")}/>
                <Button name={"Active"} callback={() => changeFilterHandler("active")}/>
                <Button name={"Completed"} callback={() => changeFilterHandler("completed")}/>
            </div>
        </div>
    );
}

export default TodoList;