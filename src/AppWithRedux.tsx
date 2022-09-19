import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, removeListAC, renameListAC, todolistsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueTypes = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TasksListType = {
    [id: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state: AppRootStateType)=> state.todolists);
    const tasks = useSelector<AppRootStateType, TasksListType>((state: AppRootStateType) => state.tasks);

    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todoList_ID: string) => {
        dispatch(removeTaskAC(id, todoList_ID));
    },[]) //made reducer

    const addTask = useCallback((title: string, todoList_ID: string) => {
        dispatch(addTaskAC(title, todoList_ID));
    },[]) //made reducer

    const changeTaskTitle = useCallback((title: string, id: string, todoList_ID: string) => {
        dispatch(changeTaskTitleAC(title, id, todoList_ID));
    },[])//made reducer

    const changeTaskStatus = useCallback((status: boolean, id: string, todoList_ID: string) => {
        dispatch(changeTaskStatusAC(status, todoList_ID, id));
    },[])  //made reducer

    const changeFilter = useCallback((filter: FilterValueTypes, todoList_ID: string) => {
        dispatch(changeFilterAC(todoList_ID, filter));
    },[])  //made reducer

    const deleteList = useCallback((id: string) => {
        const action = removeListAC(id);
        dispatch(action);
    },[]) //made reducer

    const addList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    },[]) //made reducer


    const changeListTitle = useCallback((title: string, todoList_ID: string) => {
        const action = renameListAC(todoList_ID,title);
        dispatch(action);
    },[]) //made reducer

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

export default AppWithRedux;
