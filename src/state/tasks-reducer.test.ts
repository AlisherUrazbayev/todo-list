import {v1} from "uuid";
import {
    addTaskAC,
    AddTaskActionType, changeTaskStatusAC, ChangeTaskStatusActionType,
    changeTaskTitleAC,
    ChangeTaskTitleActionType,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";

test("Correct task should be removed", () => {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();
    const taskId1 = v1();

    const initialState = {
        [todoList_ID1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
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
    }

    const finalState = tasksReducer(initialState, removeTaskAC(taskId1,  todoList_ID1));

    expect(finalState[todoList_ID1].length).toBe(3);
    expect(finalState[todoList_ID1][0].title).toBe("JS");
});

test("Correct task should be removed", () => {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const newTitle = "Java";

    const initialState = {
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
    }

    const action: AddTaskActionType = addTaskAC(newTitle, todoList_ID1);

    const endState = tasksReducer(initialState, action);

    expect(endState[todoList_ID1].length).toBe(5);
    expect(endState[todoList_ID1][0].title).toBe(newTitle);
});

test("Correct task title should be changed", () => {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const newTitle = "Java";
    const taskId = v1();

    const initialState = {
        [todoList_ID1]: [
            {id: taskId, title: "HTML&CSS", isDone: true},
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
    }

    const action: ChangeTaskTitleActionType = changeTaskTitleAC(newTitle, taskId, todoList_ID1);

    const endState = tasksReducer(initialState, action);

    expect(endState[todoList_ID1].length).toBe(4);
    expect(endState[todoList_ID1][0].title).toBe(newTitle);
})

test("Correct task status should be changed", () => {

    const todoList_ID1 = v1();
    const todoList_ID2 = v1();

    const taskId = v1();
    const newStatus = false;

    const initialState = {
        [todoList_ID1]: [
            {id: taskId, title: "HTML&CSS", isDone: true},
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
    }

    const action: ChangeTaskStatusActionType = changeTaskStatusAC(newStatus, todoList_ID1, taskId);

    const endState = tasksReducer(initialState, action);

    expect(endState[todoList_ID1].length).toBe(4);
    expect(endState[todoList_ID1][0].isDone).toBe(newStatus);
})