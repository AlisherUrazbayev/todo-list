import {v1} from "uuid";
import {useState} from "react";
import {FilterValueTypes, TodoListType} from "../App";
import {addTodolistAC, changeFilterAC, removeListAC, renameListAC, todolistsReducer} from "./todolists-reducer";

let todoList_ID1: string;
let todoList_ID2: string;
let initialState: TodoListType[];

beforeEach(() => {
    todoList_ID1 = v1();
    todoList_ID2 = v1();

    initialState = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to eat", filter: "all"}
    ];
})

test("Correct todolist should be removed", ()=> {

    const endState = todolistsReducer(initialState, removeListAC(todoList_ID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoList_ID2);

});

test("Correct todolist should be added", ()=> {

    const newTitle = "New TODO List";

    const endState = todolistsReducer(initialState, addTodolistAC(newTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].title).toBe(newTitle);

});

test("Title should be renamed for correct list", ()=> {

    const newTitle = "New TODO List";

    const endState = todolistsReducer(initialState, renameListAC(todoList_ID2, newTitle));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTitle);

});

test("Filter should be changed for correct list", ()=> {

    const newFilter: FilterValueTypes = 'active';

    const endState = todolistsReducer(initialState, changeFilterAC(todoList_ID2,newFilter));

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);

});