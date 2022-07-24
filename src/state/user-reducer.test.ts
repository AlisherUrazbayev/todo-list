import {userReducer, UserType} from "./user-reducer";

test("User reducer should increment only age", () => {
    const initialState: UserType = {
        name: "Alisher",
        age: 22,
        childrenCount: 0
    }

    const updatedState = userReducer(initialState,{type: "INCREMENT-AGE"});

    expect(updatedState.age).toBe(23);
    expect(updatedState.childrenCount).toBe(0);
})

test("User reducer should increment only childrenCount", () => {
    const initialState: UserType = {
        name: "Alisher",
        age: 22,
        childrenCount: 0
    }

    const updatedState = userReducer(initialState, {type: "INCREMENT-CHILDRENCOUNT"});

    expect(updatedState.childrenCount).toBe(1);
    expect(updatedState.age).toBe(22);
})

test("User reducer should change only name", () => {
    const initialState: UserType = {
        name: "Alisher",
        age: 22,
        childrenCount: 0
    };

    const newName = "James";

    const updatedState = userReducer(initialState, {type: "CHANGE-NAME", newName: newName});

    expect(updatedState.name).toBe(newName);
    expect(updatedState.age).toBe(22);
})