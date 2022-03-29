import {TaskStateType} from '../../someExamples/App';
import {tasksReducer} from './tasks_reducer';
import {addToDoListAC, TodolistDomainType, todolistsReducer} from './to-do-list-reducer';
import {TodolistType} from '../../api/todolist-api';


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = addToDoListAC({item:todolist});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.item.id);
    expect(idFromTodolists).toBe(action.payload.item.id);
});



