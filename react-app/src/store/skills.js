
// ACTIONS

const ADD_SKILL = "skills/ADD_SKILL";

// ACTION CREATORS
const setAddSkill = skill => {
    return {
        type: ADD_SKILL,
        skill
    }
}

// THUNKS
export const getSkills = (userId) => async (dispatch) => {
    const res = await fetch(`/api/skills/${userId}`)
    const data = await res.json();

    dispatch(data);
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
    dispatch(setAddSkill(data));
}

// REDUCER
const skills = (state = {} , action) => {

    switch(action.type){
        case ADD_SKILL:
            const skill = action.skill
            return {...state, [skill.id]: skill}
        default:
            return state;
    }
}

export default skills