import React, {ChangeEvent, useState} from "react";
import Button from "./components/Button";
import {FilterValueTypes} from "./App";


type TodoListPropsType = {
    title?: string | number
    tasks: Array<TaskType>
    removeTask: (id: string, todoList_ID: string) => void
    changeFilter: (filter: FilterValueTypes, todoList_ID: string) => void
    addTask: (title: string, todoList_ID: string) => void
    changeTaskStatus: (status: boolean, id: string, todoList_ID: string) => void
    filter: FilterValueTypes
    todoList_ID: string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    let [taskTitle, setTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTaskHandler = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todoList_ID);
            setTaskTitle("");
        } else {
            setError("Invalid input");
        }
    }

    //some comment here

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let taskValue = event.currentTarget.value;
        setTaskTitle(taskValue);
        setError(null)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id, props.todoList_ID);
    }

    const changeFilterHandler = (filter: FilterValueTypes) => {
        props.changeFilter(filter, props.todoList_ID);
    }

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeTaskStatus(event.currentTarget.checked, id, props.todoList_ID);
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
                        <li key={element.id} className={element.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={element.isDone}
                                   onChange={(event) => onChangeCheckboxHandler(event, element.id)}/>
                            <span>{element.title}</span>
                            <Button name={"Delete"} callback={() => removeTaskHandler(element.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={"All"}
                        callback={() => changeFilterHandler("all")}
                        styler={props.filter === "all" ? "active-filter" : ""}
                />
                <Button name={"Active"}
                        callback={() => changeFilterHandler("active")}
                        styler={props.filter === "active" ? "active-filter" : ""}
                />
                <Button name={"Completed"}
                        callback={() => changeFilterHandler("completed")}
                        styler={props.filter === "completed" ? "active-filter" : ""}
                />
            </div>
        </div>
    );
}

export default TodoList;