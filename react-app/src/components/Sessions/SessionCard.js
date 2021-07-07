import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Flex, Text, UnorderedList, ListItem, Icon } from '@chakra-ui/react';
import { TiArrowBackOutline, TiEdit } from 'react-icons/ti';
import { AiOutlineMinus } from 'react-icons/ai';
import DeleteSession from './DeleteSession';
import styles from '../../css.modules/Dashboard.module.css';
import { deleteSessionExercise } from '../../store/dashboard-sessions';
export default function SessionCard({ session ,setSelectedCard, selectedCard}) {
    const dispatch = useDispatch();
    // const [isHovered, setIsHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    /*
        If I want to be able to add sessions from here, I need a state that identifies the 
        currently selected session 
        Only one card should be flipped at any given time
        TODO: start by getting it so session_exercises can be removed 
    */

    const flipCard = () => setIsFlipped(prev => !prev);
    const changeCard = () => {
        setSelectedCard(session.id);
    }
    const handleDeleteExercise = (sessionExerciseId) => {
        dispatch(deleteSessionExercise(sessionExerciseId, session.id))
    }
    return (
        <Box w='100%' h={250} borderRadius='md' boxShadow='lg' bg='#ECECEC' border='1px solid lightgray' transition='300ms'
         position='relative' className={selectedCard === session.id ? styles.back: styles.front}
        >   
            <Flex className={selectedCard === session.id ? styles.frontSideFlipped : styles.frontSide} >
                <Flex justify='space-between' w='100%' m={5}>
                    <Text>{session.name}</Text>
                    <Flex className={styles.sessionIconMenu}>
                        <Icon as={TiArrowBackOutline} boxSize={6} m={1} className={styles.sessionIcons}
                        onClick={changeCard}
                        />
                        <DeleteSession session={session}/>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir='column' justify='start' className={selectedCard === session.id ? styles.backSide : styles.backSideFlipped}>
                <Flex justify='space-between' w='100%' p={5}>
                        <Text>Exercises</Text>
                        <Flex className={styles.sessionIconMenu}>
                            <Icon as={TiArrowBackOutline} boxSize={6} m={1} className={styles.sessionIcons}
                            onClick={changeCard}
                            />
                            <Icon as={TiEdit} boxSize={6} m={1} className={styles.sessionIcons}
                            />
                        </Flex>
                </Flex>
            <UnorderedList className={styles.sessionExercises} p={5} >
                {Object.values(session.exercises)?.map(( exercise ) => (
                    <ListItem display='flex' justifyContent='space-between'>{exercise.exercise.name}
                        <Icon as={AiOutlineMinus} boxSize={4} m={1}
                        _hover={{ color: '#9FD3C7'}}
                        onClick={() => handleDeleteExercise(exercise.id)}
                        ></Icon>
                    </ListItem>
                ))}
            </UnorderedList>
            </Flex>
        </Box>
    )
}
