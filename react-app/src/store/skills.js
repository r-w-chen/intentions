import { setSkillsErrors, clearErrors } from './errors';

// ACTIONS

const ADD_SKILL = "skills/ADD_SKILL";
const SET_SKILLS = "skills/SET_SKILLS";
const REMOVE_SKILL = "skills/REMOVE_SKILL";
const UPDATE_SKILL = "skills/UPDATE_SKILL";
const ADD_EXERCISE_TO_SKILL = "skills/ADD_EXERCISE_TO_SKILL";
const CHANGE_EXERCISE_IN_SKILL = "skills/CHANGE_EXERCISE_IN_SKILL";
const REMOVE_EXERCISE_FROM_SKILL = "skills/REMOVE_EXERCISE_FROM_SKILL";

// ACTION CREATORS
const setAddSkill = skill => {
    return {
        type: ADD_SKILL,
        skill
    }
}

const setGetSkills = skills => {
    return {
        type: SET_SKILLS,
        skills
    }
}

const removeSkill = skillId => {
    return {
        type: REMOVE_SKILL,
        skillId
    }
}

const setUpdatedSkill = updatedSkill => {
    return {
        type: UPDATE_SKILL,
        updatedSkill
    }
}

export const addExerciseToSkill = exercise => {
    return {
        type: ADD_EXERCISE_TO_SKILL,
        exercise
    }
}

// THUNKS
export const getSkills = (userId) => async (dispatch) => {
    const res = await fetch(`/api/skills/${userId}`)
    const data = await res.json();
    // console.log(data);
    dispatch(setGetSkills(data));
}
export const addSkill = skill => async dispatch => {
    const res = await fetch('/api/skills/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(skill)
    })
    const data = await res.json();
    if(data.errors){
        dispatch(setSkillsErrors(data.errors));
    } else {
        dispatch(setAddSkill(data));
        dispatch(clearErrors());
    }
}

export const deleteSkill = skillId => async dispatch => {
    const res = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(removeSkill(skillId))
    }
}

export const updateSkill = skill => async dispatch => {
    const res = await fetch(`/api/skills/`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(skill)
    })
    const data = await res.json();
    dispatch(setUpdatedSkill(data));
}

// REDUCER
const skills = (state = {} , action) => {
    const newState = {...state}
    switch(action.type){
        case SET_SKILLS:
            return {...newState, ...action.skills}
        case ADD_SKILL:
            const skill = action.skill
            return {...newState, [skill.id]: skill}
        case REMOVE_SKILL:
            delete newState[action.skillId]
            return newState;
        case UPDATE_SKILL:
            const {updatedSkill} = action;
            newState[updatedSkill.id] = updatedSkill;
            return newState;
        case ADD_EXERCISE_TO_SKILL:
            newState[action.exercise.skill_id].exercises.push(action.exercise);
            return newState;
        default:
            return state;
    }
}

export default skills