// ACTIONS
const ADD_SESSION = 'dashboardSessions/ADD_SESSION';
const SET_SESSIONS = 'dashboardSessions/SET_SESSIONS';
const UPDATE_SESSION = 'dashboardSessions/UPDATE_SESSION';
const DELETE_SESSION = 'dashboardSessions/DELETE_SESSION';
const DELETE_SESSION_EXERCISE = 'dashboardSessions/DELETE_SESSION_EXERCISE';
const ADD_SESSION_EXERCISE = 'dashboardSessions/ADD_SESSION_EXERCISE';

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

const removeSession = sessionId => {
    return {
        type: DELETE_SESSION,
        sessionId
    }
}

const removeSessionExercise = (exerciseId, sessionId) => {
    return {
        type: DELETE_SESSION_EXERCISE,
        exerciseId,
        sessionId
    }
}

const setAddSessionExercise = sessionExercise => {
    return {
        type: ADD_SESSION_EXERCISE,
        sessionExercise
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
    // console.log("GET DATA", data);
    if(res.ok){
        dispatch(setSessions(data));
    }
}

export const deleteSessions = sessionId => async dispatch => {
    const res = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE',
    })
    const data = await res.json();
    dispatch(removeSession(data))
}

export const deleteSessionExercise = (sessionExerciseId, sessionId) => async dispatch => {
    const res = await fetch(`/api/sessions/exercise/${sessionExerciseId}`, {
        method: 'DELETE',
    })
    const data = await res.json();
    if (res.ok){
        dispatch(removeSessionExercise(data, sessionId))
    }
}

export const addSessionExercise = (sessionId, exerciseId) => async dispatch => {
    const res = await fetch(`/api/sessions/exercise/${sessionId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseId)
    })
    const data = await res.json();
    console.log('SESSION EX', data);
    dispatch(setAddSessionExercise(data))
}

// REDUCER

export default function dashboardSessions(state = {}, action) {
    let newState;
    switch(action.type) {
        case ADD_SESSION:
            return {...state, [action.session.id]: action.session}
        case SET_SESSIONS:
            return action.sessions
        case ADD_SESSION_EXERCISE:
            newState = JSON.parse(JSON.stringify(state));
            const sessionToAddTo = newState[action.sessionExercise.session_id]
            sessionToAddTo.exercises[action.sessionExercise.id] = action.sessionExercise
            return newState;
        case DELETE_SESSION:
            newState = {...state};
            delete newState[action.sessionId];
            return newState;
        case DELETE_SESSION_EXERCISE:
            newState = JSON.parse(JSON.stringify(state));
            const session = newState[action.sessionId];
            console.log('SESSION TO DELETE', session, session.exercises);
            delete session.exercises[action.exerciseId];
            console.log("EXERCISE TO DELETE", action.exerciseId)
            console.log(session.exercises)
            return newState;
        default:
            return state;
    }
}