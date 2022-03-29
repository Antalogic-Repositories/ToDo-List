import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks_reducer';
import {TaskStateType} from '../../someExamples/App';

import {TaskStatuses, TodoTaskPriorities} from '../../api/todolist-api';
import {addToDoListAC, removeToDoListAC} from './to-do-list-reducer';


let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                entityStatus: 'idle'
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    //ассоциативный массив
    //можно использовать экшионы из другого редьюсера

    const action = removeTaskAC({taskId: "2", todoListId: "todolistId2"});
    const endState = tasksReducer(startState, action)
    //every = метод массива
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    //const action = addTaskAC("juce", "todolistId2");
    const action = addTaskAC({task:{
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exists",
        entityStatus: 'idle'
    }});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const action = updateTaskAC({taskId:"2", model: {status: TaskStatuses.New}, todoListId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC({ taskId:"2", model: {title: "yogurt"}, todoListId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});

test('new array should be added when new todolist is added', () => {
    const action = addToDoListAC({
        item: {
            id: "blabla",
            title: "new todolist",
            order: 0,
            addedDate: ''
        }
    });

    // @ts-ignore
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeToDoListAC({id: "todolistId2"});
    // @ts-ignore
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});






