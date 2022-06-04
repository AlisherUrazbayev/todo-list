import React from "react";

type TodoListPropsType = {
    title?: string | number
    tasks: Array<TasksTodoListPropsType>
}

type TasksTodoListPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(element => {
                    return <li><input type="checkbox" checked={element.isDone}/> <span>{element.title}</span></li>;
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;