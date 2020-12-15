import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks_reducer';
import {TaskStateType} from '../App';
import {AddToDoListAC, RemoveToDoListAC} from './to-do-list-reducer';
import {TaskStatuses, TodoTaskPriorities} from '../api/todolist-api';


let startState: TaskStateType

beforeEach(()=>{
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', addedDate: '',
        deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low  },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', addedDate: '',
        deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low },
            { id: "3", title: "tea",  status: TaskStatuses.New, todoListId: "todolistId2", addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low  }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    //ассоциативный массив
    //можно использовать экшионы из другого редьюсера

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)
        //every = метод массива
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    //ассоциативный массив
    const action = addTaskAC("juce", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined(); //проверяем не пустой ли id
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New); //0
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", 'coffee', "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('coffee');
    expect(endState["todolistId1"][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {

    const action = AddToDoListAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState); //array of keys
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);//глубокое сравнение эквивалентны, не равны
});
test('property with todolistId should be deleted', () => {

    const action = RemoveToDoListAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});






