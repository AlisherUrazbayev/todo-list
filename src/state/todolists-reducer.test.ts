import {v1} from "uuid";
import {useState} from "react";
import {FilterValueTypes, TodoListType} from "../App";
import {addTodolistAC, changeFilterAC, removeListAC, renameListAC, todolistsReducer} from "./todolists-reducer";

test("Correct todolist should be removed", ()=> {
    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const initialState: TodoListType[] = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ];

    const endState = todolistsReducer(initialState, removeListAC(todoList_ID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoList_ID2);

});

test("Correct todolist should be added", ()=> {
    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const newTitle = "New TODO List";

    const initialState: TodoListType[] = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ];

    const endState = todolistsReducer(initialState, addTodolistAC(newTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].title).toBe(newTitle);

});

test("Title should be renamed for correct list", ()=> {
    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const newTitle = "New TODO List";

    const initialState: TodoListType[] = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ];

    const endState = todolistsReducer(initialState, renameListAC(todoList_ID2, newTitle));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTitle);

});

test("Filter should be changed for correct list", ()=> {
    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const newFilter: FilterValueTypes = 'active';

    const initialState: TodoListType[] = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ];

    const endState = todolistsReducer(initialState, changeFilterAC(todoList_ID2,newFilter));

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);

});