import React, { useState, useEffect }from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Flex, Checkbox, Box, UnorderedList, ListItem, 
         AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import SingleTodo from './SingleTodo';
import styles from '../../css.modules/Home.module.css';
import { updateTodoSessionComplete } from '../../store/todo-sessions';

const checkFullCompletion = (todos) => {
    return todos.every(todo => todo.completed);
}

export default function TodoSession({ session, date, todo_exercises, todo_id }) {
    const dispatch = useDispatch();
    const todoExercises = Object.values(todo_exercises);
    const convertedToLocal = moment(date).format('h:mm a');
    const [isChecked, setIsChecked] = useState(checkFullCompletion(todoExercises));
    // console.log("LOCAL", convertedToLocal)
    // const [revealExercise, setRevealExercises] = useState(false);

    useEffect(() => {
        // Frontend check, see if session.completed is already true before dispatching
        // Is complete when it previously was not completed
        // Is complete when it previously was completed
        // Is not complete when it previously was completed
        // Is not complete when it previously was not complete
        if(checkFullCompletion(todoExercises) && !isChecked){
            setIsChecked(true);
            // console.log("AFTER SETTING TO TRUE", isChecked)
            const todo = {
                id: todo_id,
                completed: true,
                date_completed:  moment().utc().format()
            }
            dispatch(updateTodoSessionComplete(todo))
        } else if(!checkFullCompletion(todoExercises) && isChecked){
            setIsChecked(false);
            const todo = {
                id: todo_id,
                completed: false,
                date_completed: null
            }
            dispatch(updateTodoSessionComplete(todo))
        }
    }, [todoExercises, dispatch, isChecked, todo_id])
    
    return (
        <AccordionItem >
            <h2>
                <AccordionButton p={0} _expanded={{ bg: "#8bbbb0" }}>
                    <Box flex="1" textAlign="left">
                        <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked}>
                        {session.name}   {convertedToLocal}
                        </Checkbox >
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <UnorderedList>
                 {todoExercises?.map(td_e => (
                    <SingleTodo td_e={td_e}/>
                 ))}
                </UnorderedList>
            </AccordionPanel>
        </AccordionItem>
        // <Flex w='100%' flexDir='column' transition='1s' className={revealExercise ? styles.expand : styles.collapse}>
        //     <Flex justify='space-between' w='100%' zIndex={2} bg='#9FD3C7'>
        //         <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked} onChange={e => setIsChecked(prev => !prev)}>
        //             {session.name}
        //         </Checkbox >
        //         <Icon as={AiOutlinePlus} alignSelf='center' m={2}
        //         _hover={{ color: '#ECECEC'}}
        //         onClick={() => setRevealExercises(prev => !prev)}
        //         />
        //     </Flex>
        //     <Flex className={revealExercise ? styles.revealedExercise : styles.hiddenExercises}>
        //         <UnorderedList>
        //         {sessionExercises?.map(ex => (
        //             <ListItem>{ex.exercise.name}</ListItem>
        //         ))}
        //         </UnorderedList>
        //     </Flex>
        // </Flex>
    )
}
