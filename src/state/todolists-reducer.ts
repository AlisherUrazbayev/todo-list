import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveListActionType = {
    type: "REMOVE-LIST",
    id: string
}

export type AddListActionType = {
    type: "ADD-LIST",
    title: string
    id: string
}

type RenameListActionType = {
    type: "RENAME-LIST",
    id: string
    title: string
}

type ChangeFilterActionType = {
    type: "CHANGE-FILTER",
    id: string
    filter: FilterValueTypes
}

type ActionsTypes = RemoveListActionType | AddListActionType | RenameListActionType | ChangeFilterActionType;

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes) => {
    switch (action.type) {
        case "REMOVE-LIST":
            return state.filter(el => el.id !== action.id);
        case "ADD-LIST":
            return [...state, {id: action.id, title: action.title, filter: "all"}];
        case "RENAME-LIST":
            return state.map((el) => {
                return el.id === action.id ? {...el, title: action.title} : el;
            });
        case "CHANGE-FILTER":
            return state.map((el) => {
                return el.id === action.id ? {...el, filter: action.filter} : el;
            })
        default:
            throw new Error("Something went wrong");
    }
}

export const removeListAC = (todoList_ID: string): RemoveListActionType => {
    return {type: "REMOVE-LIST", id: todoList_ID}
}

export const addTodolistAC = (title: string): AddListActionType => {
    return {type: "ADD-LIST", title, id: v1()}
}

export const renameListAC = (id: string, title: string): RenameListActionType => {
    return {type: "RENAME-LIST", id, title}
}

export const changeFilterAC = (id: string, filter: FilterValueTypes): ChangeFilterActionType => {
    return {type: "CHANGE-FILTER", id, filter}
}