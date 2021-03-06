import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Flex, Input, FormLabel, FormControl, UnorderedList, ListItem, Button, IconButton, Text } from '@chakra-ui/react';
import { AiOutlineMinus } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { getExercisesBySkill } from '../../store/create-session';
import { addSession } from '../../store/dashboard-sessions';
import UnaddedSessions from './UnaddedSessions';
import styles from '../../css.modules/Dashboard.module.css';

export default function CreateSession() {
    // Hooks
    const history = useHistory();
    const skills = useSelector(state => Object.values(state.skills))
    const exercises = useSelector(state => state.createSessionExercises);
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    // State variables
    const [searchString, setSearchString] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [sessionExercises, setSessionExercises] = useState([]);
    const [removedExerciseId, setRemovedExerciseId] = useState(null);

    // Load exercises based on skill clicked
    const loadSkillExercises = (skillId) => {
        setSelectedSkill(skillId);
        setSearchString('');
        dispatch(getExercisesBySkill(skillId))
    }
    
    const removeExercise = (exercise) => {
        setSessionExercises(prev => prev.filter(e => e.id !== exercise.id));
        setRemovedExerciseId(exercise.id);
    }

    const createSession = () => { // name, user_id, skill_id, session_exercises
        const session = {
            name: sessionName,
            skill_id: selectedSkill,
            user_id: user.id,
            exercises: sessionExercises
        }
        // console.log("CREATE", session);
        dispatch(addSession(session));
        // redirect to sessions after create?
        history.push('/dashboard/sessions');

    }
    // TODO: add validation for when session name is empty
    // possible TODO: implement auto-complete functionality
    return (
        <>
        <Flex direction='column' boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <Box w='50%' m={5} pos='relative'>
            <Input bg='white'
             value={searchString}
             onChange={e => setSearchString(e.target.value)}
             placeholder='Search for skill' />
             {searchString && (
                 <UnorderedList bg='white' border='1px' pos='absolute' zIndex={2}>
                 {
                 skills.filter(({name}) => name.toLowerCase().startsWith(searchString.toLowerCase()))
                 .map(skill => <ListItem p={3} onClick={() => loadSkillExercises(skill.id)}>{skill.name}</ListItem>)
                 }
                 </UnorderedList>
             )}
            </Box>
            {selectedSkill && 
            <Flex justify='space-around'>
                <Box w='45%' h='80vh' border='1px' m={5} bg='white'>
                    <FormControl p={5}>
                        <FormLabel>Session Name</FormLabel>
                        <Input value={sessionName} onChange={e => setSessionName(e.target.value)}/>
                    </FormControl>
                    <UnorderedList border='1px' h='65%' m={5} overflow='scroll'>
                        {sessionExercises?.map(exercise => (
                        <ListItem p={2} display='flex' justifyContent='space-between'>
                            <Text alignSelf='center'>{exercise.name}</Text>
                            <IconButton borderRadius='full' icon={<AiOutlineMinus />} onClick={() => removeExercise(exercise)}/>
                        </ListItem>
                        ))}
                    </UnorderedList>
                    <Button onClick={createSession}>Add</Button>
                </Box>
                <Box w='45%' h='80vh' border='1px' m={5} bg='white'>
                    <UnorderedList p={5}>
                    {exercises?.map(exercise => (
                            <UnaddedSessions exercise={exercise} setSessionExercises={setSessionExercises} removedExerciseId={removedExerciseId}/>
                        ))}
                    </UnorderedList>
                </Box>
            </Flex>
            }
        </Flex>
        
        </>
    )
}
