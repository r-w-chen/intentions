import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlinePlus } from "react-icons/ai";
import { Box, SimpleGrid, Stack, Text, Flex, Icon, Tooltip } from '@chakra-ui/react';
import SessionCard from './SessionCard';
import { addSessionExercise } from '../../store/dashboard-sessions';
export default function SessionPanels({ skill }) {
    const dispatch = useDispatch();
    const sessions = useSelector(state => state.dashboardSessions);
    const sessionsList = Object.values(sessions);
    const [revealExercise, setRevealExercises] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null); // holds session_id of currently selected session

    const addExerciseToCurrentCard = (exerciseId) => {
        if(selectedCard){
            const currentSession = sessions[selectedCard];  //grab the session obj
            const sessionExercises = Object.values(currentSession.exercises); // grab the associated session_exercises as a list
            const includesExercise = sessionExercises.some(ex => ex.exercise.id === exerciseId) // check if any of the session_exercises have the same id as the exercise I'm adding
            // console.log('SESSION ALREADY HAS THIS EX', includesExercise);
        
            // If there is a session card currently selected AND it does not already include the exercise I'm adding...
            if(selectedCard && !includesExercise){
                dispatch(addSessionExercise(selectedCard, exerciseId))
            }
        }
    }
    return (
        <Box h='100%' w='100%'>
                <Box h='100%' w='100%' display='flex'>
                    <SimpleGrid columns={[1, null, 2, 3]} spacing={8} w='70%' m={5} gridRowGap='0px'>
                    {sessionsList.length ? sessionsList.filter(session => skill.id === session.skill_id)?.map(session => (
                        <SessionCard session={session} setSelectedCard={setSelectedCard} selectedCard={selectedCard}/>
                    )) : null}
                    </SimpleGrid>
                    <Box h='90%' w='30%' bg='#8bbbb0' borderRadius='lg' boxShadow='lg'>
                        {revealExercise && 
                        <Stack m={3}>
                            <Flex>
                                <Icon as={TiArrowBackOutline} boxSize={5} alignSelf='center'/> 
                                <Text m={1}>Flip a card over to add exercises</Text>
                            </Flex>
                            {skill.exercises.map(ex => (
                                <Flex bg='#ECECEC' boxShadow='md' borderRadius='lg' p={2} justify='space-between'>
                                    <Text>{ex.name}</Text>
                                    <Tooltip label={`Add to current session`} placement='top' hasArrow>
                                        <span>
                                            <Icon as={AiOutlinePlus} boxSize={4} m={1}
                                            _hover={{ color: '#9FD3C7'}}
                                            onClick={() => addExerciseToCurrentCard(ex.id)}
                                            ></Icon>
                                        </span>
                                    </Tooltip>
                                </Flex>
                            ))}    
                        </Stack>}
                    </Box>
                </Box>
        </Box>
    )
}
