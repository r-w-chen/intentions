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

const setDeleteExercise = exerciseId => {
	return {
			type: DELETE_EXERCISE,
			exerciseId
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

export const getExercises = skillId => async dispatch => {
	const res = await fetch(`/api/exercises/${skillId}`);
}


export const updateExercise = exercise => async dispatch => {
	const res = await fetch(`/api/exercises/${exercise.id}`, {
		method: 'PUT',
		body: JSON.stringify(exercise)
	})
}

export const deleteExercise = exerciseId => async dispatch => {
	const res = await fetch(`/api/exercises/${exerciseId}`, {
		method: 'DELETE'
	})
}


// REDUCER

export default function exercises(state = {}, action) {
	let newState = {...state};
	switch(action.type){
		case ADD_EXERCISE:
			const { exercise } = action;
			newState[exercise.id] = exercise
			return newState;
		default:
			return newState;
	}
}