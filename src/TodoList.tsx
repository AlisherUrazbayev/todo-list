import React, {ChangeEvent} from "react";
import Button from "./components/Button";
import {FilterValueTypes} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableText from "./components/EditableText";


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
            <Button name={"Delete list"} callback={onDeleteHandler}/>
            <h3><EditableText text={props.title.toString()} callBack={changeListTitle} /></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(element => {
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(title, element.id, props.todoList_ID)
                    }

                    return (
                        <li key={element.id} className={element.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={element.isDone}
                                   onChange={(event) => onChangeCheckboxHandler(event, element.id)}/>
                            <EditableText text={element.title} callBack={changeTaskTitle}/>
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