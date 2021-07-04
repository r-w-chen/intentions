// ACTIONS
const GET_EXERCISES_BY_SKILL = 'create-session/GET_EXERCISES_BY_SKILL';

// ACTION CREATORS
const setExercisesBySkill = (exercises) => {
    return {
        type: GET_EXERCISES_BY_SKILL,
        exercises
    }
}

// THUNKS
export const getExercisesBySkill = skillId => async dispatch => {
	const res = await fetch(`/api/exercises/skill/${skillId}`);
    const data = await res.json();
    // console.log(data);
    if(res.ok){
        dispatch(setExercisesBySkill(data));
    }
}
// REDUCER

export default function createSessionExercises(state = [], action){
    
    switch(action.type){
        case GET_EXERCISES_BY_SKILL:
            return action.exercises;
        default:
            return state; 
    }
}