import {
    AddToDoListAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC, FilterValuesType,
    RemoveToDoListAC, TodolistDomainType,
    todolistsReducer
} from './to-do-list-reducer';
import {v1} from 'uuid';


let todolistId1:string;   //для упрощения кода, вынесли повторяющийся код в глобальную область видимость
let todolistId2 :string;
let startState: Array<TodolistDomainType>


beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order:0, addedDate:''},
        {id: todolistId2, title: "What to buy", filter: "all", order:0 , addedDate:''}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState,  RemoveToDoListAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, AddToDoListAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, ChangeTitleTodolistAC(todolistId2,newTodolistTitle));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, ChangeFilterTodolistAC(newFilter, todolistId2));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




