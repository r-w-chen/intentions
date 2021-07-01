// ACTIONS
const SET_SKILLS_ERRORS = 'errors/SET_SKILLS_ERRORS';
const SET_SESSIONS_ERRORS = 'errors/SET_SESSIONS_ERRORS';
const SET_EXERCISES_ERRORS = 'errors/SET_EXERCISES_ERRORS';
const CLEAR_ERRORS = 'errors/CLEAR_ERRORS';

// ACTION CREATORS
export const setSkillsErrors = errors => {
    return {
        type: SET_SKILLS_ERRORS,
        errors
    }
}

export const setSessionsErrors = errors => {
    return {
        type: SET_SESSIONS_ERRORS,
        errors
    }
}

export const setExercisesErrors = errors => {
    return {
        type: SET_EXERCISES_ERRORS,
        errors
    }
}

export const clearErrors = errors => {
    return {
        type: CLEAR_ERRORS
    }
}
// REDUCER

const initialState= {
    skills: null,
    sessions: null,
    exercises: null
}

export default function errors(state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case SET_SKILLS_ERRORS:
            newState.skills = action.errors;
            return newState;
        case SET_SESSIONS_ERRORS:
            newState.sessions = action.errors;
            return newState;
        case SET_EXERCISES_ERRORS:
            newState.exercises = action.errors;
            return newState;
        case CLEAR_ERRORS:
            newState = {...initialState}
            return newState;
        default:
            return state;
    }
}