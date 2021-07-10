import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Checkbox, ListItem } from '@chakra-ui/react'
import { updateTodoExercise } from '../../store/todo-sessions'; 
export default function SingleTodo({td_e}) {
    // hooks
    const dispatch = useDispatch();
    // state variables
    const [isChecked, setIsChecked] = useState(td_e.completed);

    // console.log(`rerendered ${td_e.s_exercise.exercise.name} ${isChecked}`)
    /*
        When I hit a check on a todo_session_exercise:
        - A PATCH gets sent to flask ⇒ query for the checked t_s_e id ⇒ update completed status to the appropriate boolean 
     */

    const updateChecked = () => {
        // dispatch
        setIsChecked(prev => !prev);
        // console.log("BEFORE dispatch", isChecked)
        dispatch(updateTodoExercise(td_e.id, !isChecked))
    }
    return (
        <ListItem>
            <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked} onChange={updateChecked}>
            {td_e.s_exercise.exercise.name}
            </Checkbox >
        </ListItem>
    )
}
