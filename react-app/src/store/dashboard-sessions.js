// ACTIONS
const ADD_SESSION = 'dashboardSessions/ADD_SESSION';
const SET_SESSIONS = 'dashboardSessions/SET_SESSIONS';
const UPDATE_SESSION = 'dashboardSessions/UPDATE_SESSION';
const DELETE_SESSION = 'dashboardSessions/DELETE_SESSION';

// ACTION CREATORS
const setAddSession = session => {
    return {
        type: ADD_SESSION,
        session
    }
}

const setSessions = sessions => {
    return {
        type: SET_SESSIONS,
        sessions
    }
}

const setUpdateSession = session => {
    return {
        type: UPDATE_SESSION,
        session
    }
}

const removeSession = session => {
    return {
        type: DELETE_SESSION,
        session
    }
}
// THUNKS

export const addSession = session => async dispatch => {
    const res = await fetch('/api/sessions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
    });
    const data = await res.json();
    console.log(data)
    if(data.errors){
        // TODO: update errors store
    } else {
        dispatch(setAddSession(data))
    }
}

export const getSessions = userId => async dispatch => {
    const res = await fetch(`/api/sessions/${userId}`);
    const data = await res.json();
    console.log("GET DATA", data);
    if(res.ok){
        dispatch(setSessions(data));
    }
}

// REDUCER

export default function dashboardSessions(state = {}, action) {
    switch(action.type) {
        case ADD_SESSION:
            return {...state, [action.session.id]: action.session}
        case SET_SESSIONS:
            return action.sessions
        default:
            return state;
    }
}