import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveListActionType = {
    type: "REMOVE-LIST",
    id: string
}

type AddListActionType = {
    type: "ADD-LIST",
    title: string
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
            return [...state, {id: v1(), title: action.title, filter: "all"}];
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

export const addListAC = (title: string): AddListActionType => {
    return {type: "ADD-LIST", title}
}

export const renameListAC = (id: string, title: string): RenameListActionType => {
    return {type: "RENAME-LIST", id, title}
}

export const changeFilterAC = (id: string, filter: FilterValueTypes): ChangeFilterActionType => {
    return {type: "CHANGE-FILTER", id, filter}
}