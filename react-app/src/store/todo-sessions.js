const normalize = (arr) => {
    return arr.reduce((acc, obj) => {
        acc[`+${obj.id}`] = obj
        return acc;
    }, {})
}
// ACTIONS
const ADD_TODO = 'todo-sessions/ADD_TODO';
const SET_TODOS = 'todo-sessions/SET_TODOS';
const REMOVE_TODO = 'todo-sessions/REMOVE_TODO';


// ACTION CREATORS
const setAddTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const setTodos = todos => {
    return {
        type: SET_TODOS,
        todos
    }
}

const removeTodo = todoId => {
    return {
        type: REMOVE_TODO,
        todoId
    }
}

// THUNKS
export const getTodos = (userId) => async dispatch => {
    const res = await fetch(`/api/todos/${userId}`)
    const data = await res.json();

    if(res.ok){
        dispatch(setTodos(normalize(data)));
    }
}

export const addTodo = (todo) => async dispatch => {
    const res = await fetch('/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const data = await res.json();
    if(data.error){
        return;
    } else {
        dispatch(setAddTodo(data))
    }

}

export const deleteTodo = (todo) => async dispatch => {

}

// REDUCER

export default function todoSessions(state = {}, action){
    let newState
    switch(action.type){
        case SET_TODOS:
            return action.todos;
        case ADD_TODO :
            newState = JSON.parse(JSON.stringify(state));
            newState[action.todo.id] = action.todo
            return newState;
        default:
            return state;
    }
}