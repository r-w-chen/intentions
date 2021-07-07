import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text, UnorderedList, ListItem, Icon, Input, Button } from '@chakra-ui/react';
import { TiArrowBackOutline, TiEdit } from 'react-icons/ti';
import { AiOutlineMinus } from 'react-icons/ai';
import { FaRegCalendarCheck } from 'react-icons/fa';
import DeleteSession from './DeleteSession';
import styles from '../../css.modules/Dashboard.module.css';
import { deleteSessionExercise } from '../../store/dashboard-sessions';
import { addTodo } from '../../store/todo-sessions';
export default function SessionCard({ session ,setSelectedCard, selectedCard}) {
    // Hooks
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // State variables
    const [isFlipped, setIsFlipped] = useState(false);
    const [revealDate, setRevealDate] = useState(false);
    const [date, setDate] = useState(''); // 2021-07-12 , comes as string

    // Handlers
    const flipCard = () => setIsFlipped(prev => !prev);

    const changeCard = () => {
        setSelectedCard(session.id);
    }
    const handleDeleteExercise = (sessionExerciseId) => {
        dispatch(deleteSessionExercise(sessionExerciseId, session.id))
    }

    const handleScheduleSession = () => {
        const todo = {
            session_id: session.id,
            user_id: user.id,
            date
        }
        dispatch(addTodo(todo));
    }
    return (
        <Box w='100%' h={250} borderRadius='md' boxShadow='lg' bg='#ECECEC' border='1px solid lightgray' transition='300ms'
         position='relative' className={selectedCard === session.id ? styles.back: styles.front}
        >   
            <Flex flexDir='column' className={selectedCard === session.id ? styles.frontSideFlipped : styles.frontSide} >
                <Flex justify='space-between' w='100%' m={5}>
                    <Text>{session.name}</Text>
                    <Flex className={styles.sessionIconMenu}>
                        <Icon as={TiArrowBackOutline} boxSize={6} m={1} className={styles.sessionIcons}
                        onClick={changeCard}
                        />
                        <DeleteSession session={session}/>
                        <Icon as={FaRegCalendarCheck} boxSize={5} m={1} className={styles.sessionIcons}  
                        onClick={() => setRevealDate(prev => !prev)}
                        />
                    </Flex>
                </Flex>
                {revealDate &&
                <Flex flexDir='column'>
                    <Input type='datetime-local' value={date} onChange={e => setDate(e.target.value)} />
                    <Button onClick={handleScheduleSession}>Schedule</Button>
                </Flex>
                }
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
