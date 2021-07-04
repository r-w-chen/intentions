import { setExercisesErrors, clearErrors } from "./errors";

// ACTIONS
const SET_EXERCISES = 'exercises/SET_EXERCISES';
const ADD_EXERCISE = 'exercises/ADD_EXERCISE';
const EDIT_EXERCISE = 'exercises/EDIT_EXERCISE';

const DELETE_EXERCISE = 'exercises/DELETE_EXERCISE';

// ACTION CREATORS
const setExercises = exercises => {
	return {
			type: SET_EXERCISES,
			exercises
	}
}

const setAddExercise = exercise => {
	return {
			type: ADD_EXERCISE,
			exercise
	}
}

const setEditExercise = exercise => {
	return {
			type: EDIT_EXERCISE,
			exercise
	}
}

const setDeleteExercise = (exerciseId, skillId) => {
	return {
			type: DELETE_EXERCISE,
			exerciseId,
			skillId
	}
}


// THUNKS
export const addExercise = exercise => async dispatch => {
	const res = await fetch('/api/exercises/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(exercise)
	})
	const data = await res.json();
	if (data.errors) {
		// TODO: Add validation for when input is empty\n
		dispatch(setExercisesErrors(data.errors))
	} else {
		dispatch(setAddExercise(data))
		dispatch(clearErrors())
	}
}

export const getExercises = userId => async dispatch => {
	const res = await fetch(`/api/exercises/${userId}`);
	const data = await res.json();
	// Nested object
	const exercisesBySkllId = data.reduce((obj, e) => {
		const skill_id = e.skill_id;
		if(skill_id in obj){
			obj[skill_id][e.id] = e;
		} else {
			obj[skill_id] = {[e.id]: e};
		}
		return obj;
	}, {})
	// Object + array
	// const exercisesBySkllId = data.reduce((obj, e) => {
	// 	const skill_id = e.skill_id;
	// 	if(skill_id in obj){
	// 		obj[skill_id].push(e);
	// 	} else {
	// 		obj[skill_id] = [e];
	// 	}
	// 	return obj;
	// }, [])
	dispatch(setExercises(exercisesBySkllId))
}



export const updateExerciseName = exercise => async dispatch => {
	const res = await fetch(`/api/exercises/${exercise.id}/name`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(exercise)
	})
	const data = await res.json();
	console.log(data);
	if(res.ok){
		dispatch(setEditExercise(data))
	}

}

export const updateExerciseNotes = exercise => async dispatch => {
	const res = await fetch(`/api/exercises/${exercise.id}/notes`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(exercise)
	});
	const data = await res.json();
	console.log(data);
	if(res.ok){
		dispatch(setEditExercise(data));
	}
}

export const deleteExercise = (exerciseId, skillId) => async dispatch => {
	const res = await fetch(`/api/exercises/${exerciseId}`, {
		method: 'DELETE'
	})
	if(res.ok){
		dispatch(setDeleteExercise(exerciseId, skillId))
	}
}


// REDUCER

export default function exercises(state = {}, action) {
	let newState = {...state};
	switch(action.type){
		case ADD_EXERCISE:
			const { exercise } = action;
			const skill = newState[exercise.skill_id];
			if(skill){
				skill[exercise.id] = exercise;
			} else {
				newState[exercise.skill_id] = {[exercise.id] : exercise}
			}
			return newState;
		case SET_EXERCISES:
			return action.exercises;
		case EDIT_EXERCISE:
			const skillId = action.exercise.skill_id;
			const exerciseId = action.exercise.id;
			newState[skillId][exerciseId] = action.exercise;
			return newState;
		case DELETE_EXERCISE:
			const exercisesForSkill = newState[action.skillId];
			delete exercisesForSkill[action.exerciseId];
			return newState;
		default:
			return newState;
	}
}