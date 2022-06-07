import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksTodoListPropsType} from "./TodoList";
import {v1} from "uuid";

export type FilterValueTypes = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Angular", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValueTypes>("all");
    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((element) => {
            return element.id !== id;
        })
        setTasks(filteredTasks);
    }

    const addTask = (newTask: TasksTodoListPropsType) => {
        setTasks([newTask, ...tasks]);
    }

    const changeFilter = (filter: FilterValueTypes) => {
        setFilter(filter);
    }

    return (
        <div className="App">
            <TodoList title={"What to learn-1"} tasks={filteredTasks}
                      removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
