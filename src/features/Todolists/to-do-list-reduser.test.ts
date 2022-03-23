import {
    addToDoListAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    FilterValuesType, removeToDoListAC,
    TodolistDomainType,
    todolistsReducer
} from './to-do-list-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolist-api';


let todolistId1:string;   //для упрощения кода, вынесли повторяющийся код в глобальную область видимость
let todolistId2 :string;
let startState: Array<TodolistDomainType>


beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order:0, addedDate:'', entityStatus:'failed'},
        {id: todolistId2, title: "What to buy", filter: "all", order:0 , addedDate:'', entityStatus:'failed'}
    ]
})


test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }


    const endState = todolistsReducer(startState, addToDoListAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
})


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, changeTitleTodolistAC(todolistId2,newTodolistTitle));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeFilterTodolistAC(newFilter, todolistId2));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




