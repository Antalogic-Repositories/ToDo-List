import {taskStateType, ToDoListsType} from '../App';
import {tasksReducer} from './tasks_reducer';
import {AddToDoListAC, todolistsReducer} from './to-do-list-reducer';


test('ids should be equals', () => {
    const startTasksState: taskStateType = {};
    const startTodolistsState: Array<ToDoListsType> = [];

    const action = AddToDoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(idFromTodolists);

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id)
});



