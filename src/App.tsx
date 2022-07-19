import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";

export type FilterValueTypes = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueTypes
}

type TasksListType = {
    [id: string]: Array<TaskType>
}

function App() {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ]);

    let [tasks, setTasks] = useState<TasksListType>({
        [todoList_ID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Angular", isDone: false}
        ],
        [todoList_ID2]: [
            {id: v1(), title: "Burger", isDone: true},
            {id: v1(), title: "Nachos", isDone: true},
            {id: v1(), title: "Fish & Chips", isDone: false},
            {id: v1(), title: "Winner Schnitzel", isDone: false}
        ]
    })

    const removeTask = (id: string, todoList_ID: string) => {
        setTasks({
            ...tasks, [todoList_ID]: tasks[todoList_ID].filter((task) => {
                return task.id !== id;
            })
        });
    }

    const addTask = (title: string, todoList_ID: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todoList_ID]: [newTask, ...tasks[todoList_ID]]});
    }

    const changeTaskTitle = (title: string, id: string, todoList_ID: string) => {
        setTasks({
            ...tasks, [todoList_ID]: tasks[todoList_ID].map((task) => {
                return task.id === id ? {...task, title} : task;
            })
        })
    }

    const changeTaskStatus = (status: boolean, id: string, todoList_ID: string) => {
        setTasks({
            ...tasks, [todoList_ID]: tasks[todoList_ID].map((task) => {
                if (task.id === id) {
                    return {...task, isDone: status};
                } else {
                    return task;
                }
            })
        })
    }

    const changeFilter = (filter: FilterValueTypes, todoList_ID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoList_ID ? {...tl, filter} : tl));
    }

    const deleteList = (id: string) => {
        setTodoLists(todoLists.filter(el => el.id !== id));
    }

    const addList = (title: string) => {
        const todoList_ID = v1();
        setTodoLists([{id: todoList_ID, title, filter: "all"}, ...todoLists]);
        setTasks({[todoList_ID]: [], ...tasks});
    }

    const changeListTitle = (title: string, todoList_ID: string) => {
        setTodoLists(todoLists.map(list => list.id === todoList_ID ? {...list, title} : list));
    }

    const todoListsComponent = todoLists.map((tl) => {
        let filteredTasks = tasks[tl.id];
        if (tl.filter === "active") filteredTasks = tasks[tl.id].filter(t => !t.isDone)
        if (tl.filter === "completed") filteredTasks = tasks[tl.id].filter(t => t.isDone)
        return (
            <TodoList key={tl.id}
                      title={tl.title} tasks={filteredTasks}
                      filter={tl.filter} todoList_ID={tl.id}
                      removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask} changeTaskStatus={changeTaskStatus}
                      deleteList={deleteList} changeTaskTitle={changeTaskTitle}
                      changeListTitle={changeListTitle}
            />
        )
    })

    return (
        <div className="App">
            <ButtonAppBar addItem={addList}/>
            <div className="lists">
                {todoListsComponent}
            </div>
        </div>
    );
}

export default App;
