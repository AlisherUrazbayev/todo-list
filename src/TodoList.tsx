import React, {ChangeEvent} from "react";
import {FilterValueTypes} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableText from "./components/EditableText";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TodoListPropsType = {
    title: string | number
    tasks: Array<TaskType>
    removeTask: (id: string, todoList_ID: string) => void
    changeFilter: (filter: FilterValueTypes, todoList_ID: string) => void
    addTask: (title: string, todoList_ID: string) => void
    changeTaskStatus: (status: boolean, id: string, todoList_ID: string) => void
    filter: FilterValueTypes
    todoList_ID: string
    deleteList: (id: string) => void
    changeTaskTitle: (title: string, id: string, todoList_ID: string) => void
    changeListTitle: (title: string, todoList_ID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const removeTaskHandler = (id: string) => {
        props.removeTask(id, props.todoList_ID);
    }

    const changeFilterHandler = (filter: FilterValueTypes) => {
        props.changeFilter(filter, props.todoList_ID);
    }

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeTaskStatus(event.currentTarget.checked, id, props.todoList_ID);
    }

    const onDeleteHandler = () => {
        props.deleteList(props.todoList_ID);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoList_ID);
    }

    const changeListTitle = (title: string) => {
        props.changeListTitle(title, props.todoList_ID);
    }

    return (
        <div>
            <h3>
                <EditableText text={props.title.toString()} callBack={changeListTitle}/>
                <IconButton aria-label="delete">
                    <Delete onClick={onDeleteHandler}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map(element => {
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(title, element.id, props.todoList_ID)
                    }

                    return (
                        <div key={element.id} className={element.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={element.isDone}
                                   onChange={(event) => onChangeCheckboxHandler(event, element.id)}/>
                            <EditableText text={element.title} callBack={changeTaskTitle}/>
                            <IconButton aria-label="delete">
                                <Delete onClick={() => removeTaskHandler(element.id)}/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"} color="secondary" size="small"
                        onClick={() => changeFilterHandler("all")} style={{marginRight: '10px'}}
                >All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} color="success" size="small"
                        onClick={() => changeFilterHandler("active")} style={{marginRight: '10px'}}
                >Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} color="error" size="small"
                        onClick={() => changeFilterHandler("completed")} style={{marginRight: '10px'}}
                >Completed</Button>
            </div>
        </div>
    );
}

export default TodoList;