import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, removeListAC, renameListAC, todolistsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueTypes = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TasksListType = {
    [id: string]: Array<TaskType>
}

function App() {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();


    let [todoLists, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
        dispatchToTasks(removeTaskAC(id, todoList_ID));
    } //made reducer

    const addTask = (title: string, todoList_ID: string) => {
        dispatchToTasks(addTaskAC(title, todoList_ID));
    } //made reducer

    const changeTaskTitle = (title: string, id: string, todoList_ID: string) => {
        dispatchToTasks(changeTaskTitleAC(title, id, todoList_ID));
    } //made reducer

    const changeTaskStatus = (status: boolean, id: string, todoList_ID: string) => {
        dispatchToTasks(changeTaskStatusAC(status, todoList_ID, id));
    }  //made reducer

    const changeFilter = (filter: FilterValueTypes, todoList_ID: string) => {
        dispatchToTodolist(changeFilterAC(todoList_ID, filter));
    }  //made reducer

    const deleteList = (id: string) => {
        const action = removeListAC(id);
        dispatchToTodolist(action);
        dispatchToTasks(action);
    } //made reducer

    const addList = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodolist(action);
        dispatchToTasks(action);
    } //made reducer

    const changeListTitle = (title: string, todoList_ID: string) => {
        const action = renameListAC(todoList_ID,title);
        dispatchToTodolist(action);
    } //made reducer

    const todoListsComponent = todoLists.map((tl) => {
        let filteredTasks = tasks[tl.id];
        if (tl.filter === "active") filteredTasks = tasks[tl.id].filter(t => !t.isDone)
        if (tl.filter === "completed") filteredTasks = tasks[tl.id].filter(t => t.isDone)
        return (
            <Grid item>
                <Paper style={{padding: '10px'}}>
                    <TodoList key={tl.id}
                              title={tl.title} tasks={filteredTasks}
                              filter={tl.filter} todoList_ID={tl.id}
                              removeTask={removeTask} changeFilter={changeFilter}
                              addTask={addTask} changeTaskStatus={changeTaskStatus}
                              deleteList={deleteList} changeTaskTitle={changeTaskTitle}
                              changeListTitle={changeListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    Add Task
                    <AddItemForm addItem={addList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponent}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
