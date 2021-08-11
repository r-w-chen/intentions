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
const UPDATE_TODO_EXERCISE = 'todo-sessions/UPDATE_TODO_EXERCISE';
const UPDATE_TODO_SESSION_STATUS = 'todo-sessions/UPDATE_TODO_SESSION_STATUS';
const CLEAR_TODOS = 'todo-sessions/CLEAR_TODOS';
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

const setTodoExercise = (todo_ex) => {
    return {
        type: UPDATE_TODO_EXERCISE,
        todo_ex
    }
}

const setTodoSessionStatus = (todo) => {
    return {
        type: UPDATE_TODO_SESSION_STATUS,
        todo
    }
}

export const clearTodoSessions = () => {
    return {
        type: CLEAR_TODOS
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
    let data = await res.json();
    if(data.error){
        return;
    } else {
        dispatch(setAddTodo(data))
    }

}

export const deleteTodo = (todoId) => async dispatch => {
    const res = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    // console.log("DELETED ID", data)
    dispatch(removeTodo(data));
}

export const updateTodoExercise = (id, bool) => async dispatch => {
    const res = await fetch(`/api/todos/exercises/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({is_checked: bool})
    })
    const data = await res.json();
    // update store with new exercise
    // console.log("UPDATED TODO EX", data)
    dispatch(setTodoExercise(data));
}


export const updateTodoSessionComplete = (todo) => async (dispatch) => {
    const res = await fetch(`/api/todos/completed/${todo.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const data = await res.json();
    // console.log("UPDATED SESSION", data)
    dispatch(setTodoSessionStatus(data))
}

export const updateTodoSessionReschedule = (todo) => async dispatch => {
    const res = await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const data = await res.json();
    
    dispatch(setTodoSessionStatus(data));
}
// REDUCER

export default function todoSessions(state = {}, action){
    let newState
    switch(action.type){
        case SET_TODOS:
            return action.todos;
        case ADD_TODO :
            newState = JSON.parse(JSON.stringify(state));
            newState['+' + action.todo.id] = action.todo
            return newState;
        case UPDATE_TODO_EXERCISE:
            newState = JSON.parse(JSON.stringify(state));
            // Replace the current todo_session_exercise with the updated one 
            const todoSession = newState[`+${action.todo_ex.todo_session_id}`];
            todoSession.todo_exercises[action.todo_ex.id] = action.todo_ex;
            return newState;
        case UPDATE_TODO_SESSION_STATUS:
            newState = JSON.parse(JSON.stringify(state));
            newState['+' + action.todo.id] = action.todo;
            return newState;
        case REMOVE_TODO :
            newState = JSON.parse(JSON.stringify(state));
            delete newState['+' + action.todoId];
            return newState;
        case CLEAR_TODOS:
            return {};
        default:
            return state;
    }
}