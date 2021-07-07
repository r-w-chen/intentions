import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlinePlus } from "react-icons/ai";
import { TabPanels, TabPanel, Box, SimpleGrid, Stack, Text, Flex, Icon } from '@chakra-ui/react';
import SessionCard from './SessionCard';
import { addSessionExercise } from '../../store/dashboard-sessions';
export default function SessionPanels({ skills }) {
    const dispatch = useDispatch();
    const sessions = useSelector(state => state.dashboardSessions);
    const sessionsList = Object.values(sessions);
    const [revealExercise, setRevealExercises] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null); // holds session_id of currently selected session

    const addExerciseToCurrentCard = (exerciseId) => {
        // dispatch

        const currentSession = sessions[selectedCard];  //grab the session obj
        const sessionExercises = Object.values(currentSession.exercises); // grab the associated session_exercises as a list
        const includesExercise = sessionExercises.some(ex => ex.exercise.id === exerciseId) // check if any of the session_exercises have the same id as the exercise I'm adding
        console.log('SESSION ALREADY HAS THIS EX', includesExercise);
    
        // If there is a session card currently selected AND it does not already include the exercise I'm adding...
        if(selectedCard && !includesExercise){
            dispatch(addSessionExercise(selectedCard, exerciseId))
        }

    }
    return (
        <TabPanels h='100%' w='100%'>
            {skills.map(skill => (
                <TabPanel h='100%' w='100%' display='flex'>
                    <SimpleGrid columns={[1, null, 2, 3]} spacing={10} w='70%' mr={5}>
                    {sessionsList.length ? sessionsList.filter(session => skill.id === session.skill_id)?.map(session => (
                        <SessionCard session={session} setSelectedCard={setSelectedCard} selectedCard={selectedCard}/>
                    )) : null}
                    </SimpleGrid>
                    <Box h='90%' w='30%' bg='#8bbbb0' borderRadius='lg' boxShadow='lg'>
                        {revealExercise && 
                        <Stack m={3}>
                            {skill.exercises.map(ex => (
                                <Flex bg='#ECECEC' boxShadow='md' borderRadius='lg' p={2} justify='space-between'>
                                    <Text>{ex.name}</Text>
                                    <Icon as={AiOutlinePlus} boxSize={4} m={1}
                                     _hover={{ color: '#9FD3C7'}}
                                     onClick={() => addExerciseToCurrentCard(ex.id)}
                                    ></Icon>
                                </Flex>
                            ))}    
                        </Stack>}
                    </Box>
                </TabPanel>
            ))}
        </TabPanels>
    )
}
