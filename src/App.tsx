import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
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

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    const changeFilter = (filter: FilterValueTypes) => {
        setFilter(filter);
    }

    const changeTaskStatus = (status: boolean, id: string) => {
        let task = tasks.find(t => t.id === id);
        if (task) task.isDone = status;
        setTasks(tasks);
    }

    return (
        <div className="App">
            <TodoList title={"What to learn-1"} tasks={filteredTasks}
                      removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
