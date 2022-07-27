import {TasksListType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string,
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    listId: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: "RENAME-TASK"
    listId: string
    taskId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS"
    listId: string
    taskId: string
    status: boolean
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType |
    AddListActionType;


export const tasksReducer = (state: TasksListType, action: ActionsType): TasksListType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter((task) => {
                return task.id !== action.taskId;
                })}
        case "ADD-TASK":
            return {...state, [action.listId]: [{id: v1(), title: action.title, isDone: false} , ...state[action.listId]]}
        case "RENAME-TASK":
            return {...state, [action.listId] : state[action.listId].map((task) => {
                return action.taskId === task.id ? {...task, title: action.title} : task;
                })}
        case "CHANGE-STATUS":
            return {...state, [action.listId]: state[action.listId].map((task) => {
                return action.taskId === task.id ? {...task, isDone: action.status} : task;
                })}
        case "ADD-LIST":
            return {...state, [action.id]: []}
        default:
            throw new Error("Something went wrong!");
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todoListId
    } as const;
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", listId: todoListId, title} as const;
}

export const changeTaskTitleAC = (title: string, taskId: string, listId: string): ChangeTaskTitleActionType => {
    return {type: "RENAME-TASK", taskId, title, listId} as const;
}

export const changeTaskStatusAC = (status: boolean, listId: string, taskId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-STATUS", listId, taskId, status} as const;
}
