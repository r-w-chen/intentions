// ACTIONS
const ADD_TODO = 'todo-sessions/ADD_TODO';
const REMOVE_TODO = 'todo-sessions/REMOVE_TODO';


// ACTION CREATORS
const setAddTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const removeTodo = todoId => {
    return {
        type: REMOVE_TODO,
        todoId
    }
}

// THUNKS

export const addTodo = (todo) => async dispatch => {
    const res = await fetch('/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    console.log(todo)
}

export const deleteTodo = (todo) => async dispatch => {

}

// REDUCER

export default function todoSessions(state = {}, action){
    
    switch(action.type){
        default:
            return state;
    }
}