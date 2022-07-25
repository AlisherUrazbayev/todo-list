import {TasksListType} from "../App";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string,
    todoListId: string
}

type ActionsType = RemoveTaskActionType;


export const tasksReducer = (state: TasksListType, action: ActionsType): TasksListType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter((task) => {
                return task.id !== action.taskId;
                })}
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