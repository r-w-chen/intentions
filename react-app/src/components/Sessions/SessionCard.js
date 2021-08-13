import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, Box, Flex, Text, UnorderedList, ListItem, Icon, Input, Button, IconButton } from '@chakra-ui/react';
import { TiArrowBackOutline, TiEdit } from 'react-icons/ti';
import { AiOutlineMinus } from 'react-icons/ai';
import { FaRegCalendarCheck } from 'react-icons/fa';
import DeleteSession from './DeleteSession';
import styles from '../../css.modules/Dashboard.module.css';
import { deleteSessionExercise, updateSession } from '../../store/dashboard-sessions';
import { addTodo } from '../../store/todo-sessions';

export default function SessionCard({ session ,setSelectedCard, selectedCard}) {
    // Hooks
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const input = useRef();
    // State variables
    const [revealDate, setRevealDate] = useState(false);
    const [date, setDate] = useState(''); // 2021-07-12 , comes as string
    const [editName, setEditName] = useState(session.name);
    const [editSessionMode, setEditSessionMode] = useState(false);
    const [sessionIsScheduled, setSessionIsScheduled] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if(editSessionMode){
            input.current.focus(); 
        }
    }, [editSessionMode])

    useEffect(() => {
        if(selectedCard){
            setErrorMsg('');
        }
    }, [selectedCard])

    // Handlers
    const changeCard = (sessionId) => {
        if(selectedCard === sessionId){ //If the same card is selected, flip it back over
            setSelectedCard(null);
        } else {
            setSelectedCard(session.id);
        }
    }
    const revealScheduler = () => {
        if(Object.values(session.exercises).length){
            setRevealDate(prev => !prev)
            setErrorMsg('');
        } else {
            setErrorMsg('Please add exercises to this session before scheduling')
        }
    }
    const handleDeleteExercise = (sessionExerciseId) => {
        dispatch(deleteSessionExercise(sessionExerciseId, session.id))
    }

    const handleScheduleSession = () => {
        const date_scheduled = moment(date).utc().format();
        // const convertedToLocal = moment(date_scheduled).format();
        // console.log('now', moment())
        // console.log('input', date, '\nUTC', date_scheduled, '\nconertedback', convertedToLocal);
        const todo = {
            session_id: session.id,
            user_id: user.id,
            date: date_scheduled,
            s_exercises: Object.keys(session.exercises)
        }
        dispatch(addTodo(todo));
        setRevealDate(false);
        setSessionIsScheduled(true);
        setTimeout(() => setSessionIsScheduled(false), 5000);
    }

    const handleSessionEditOnEnter = (e) => {
        if (e.key === "Enter"){
            // console.log("new name", editName)
            dispatch(updateSession(session.id, editName))
            setEditSessionMode(false);
        }
    }

    const handleSessionEditOnBlur = () => {
        // dispatch
        dispatch(updateSession(session.id, editName))
        setEditSessionMode(false)
    }


    return (
        <Tooltip label={`Scheduled for ${moment(date).format('dddd, MMMM Do YYYY, h:mm a')}`} isOpen={sessionIsScheduled}>
        <Box w='100%' h={275} borderRadius='md' boxShadow='lg' bg='#ECECEC' border='1px solid lightgray' transition='300ms'
         position='relative' className={selectedCard === session.id ? styles.back: styles.front}
        >   
            <Flex flexDir='column' className={selectedCard === session.id ? styles.frontSideFlipped : styles.frontSide} >
                <Flex justify='space-between'  m={5}>
                    {editSessionMode ? 
                    <Input w='80%' value={editName} ref={input}
                     onChange={e => setEditName(e.target.value)}
                     onKeyUp={handleSessionEditOnEnter}
                     onBlur={handleSessionEditOnBlur}
                    />
                    :
                    <Text>{session.name}</Text>
                    }
                    <Flex className={styles.sessionIconMenu}>
                            <Tooltip label='View exercises' placement='right' hasArrow>
                                <span>
                                    <IconButton icon={<TiArrowBackOutline/>} boxSize={6} m={1} className={styles.sessionIcons}
                                    onClick={changeCard}
                                    />
                                </span>
                            </Tooltip>
                        <Tooltip label='Schedule session' placement='right' hasArrow>
                            <span>
                                <IconButton icon={<FaRegCalendarCheck/>} boxSize={5} m={1} className={styles.sessionIcons}  
                                onClick={revealScheduler}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip label='Edit session name' placement='right' hasArrow>
                            <span>
                                <IconButton icon={<TiEdit/>} boxSize={6} m={1} className={styles.sessionIcons}
                                 onClick={() => setEditSessionMode(prev => !prev)}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip label='Delete session' placement='right' hasArrow isDisabled={openDelete}>
                            <span>
                                <DeleteSession session={session} openDelete={openDelete} setOpenDelete={setOpenDelete}/>
                            </span>
                        </Tooltip>
                    </Flex>
                </Flex>
                {errorMsg && <Text color='red.300'>{errorMsg}</Text>}
                {revealDate &&
                <Flex flexDir='column'>
                    <Input type='datetime-local' min={`${moment().format('YYYY-MM-DD')}T00:00`} value={date} onChange={e => setDate(e.target.value)} />
                    <Button onClick={handleScheduleSession}>Schedule</Button>
                </Flex>
                }
            </Flex>

            {/* BACKSIDE */}
            <Flex flexDir='column' justify='start' className={selectedCard === session.id ? styles.backSide : styles.backSideFlipped}>
                <Flex justify='space-between' w='100%' p={5}>
                        <Text>Exercises</Text>
                        <Flex className={styles.sessionIconMenu}>
                            <IconButton icon={<TiArrowBackOutline/>} boxSize={6} m={1} className={styles.sessionIcons}
                            onClick={() => changeCard(session.id)}
                            />
                        </Flex>
                </Flex>
            <UnorderedList className={styles.sessionExercises} p={5} >
                {Object.values(session.exercises)?.map(( exercise ) => (
                    <ListItem display='flex' justifyContent='space-between'>{exercise.exercise.name}
                        <Tooltip label='Remove exercise' placement='right-start' hasArrow>
                            <span>
                                <IconButton icon={<AiOutlineMinus/>} boxSize={4} m={1} borderRadius='md' 
                                _hover={{ color: '#9FD3C7', bg:'#8517060'}}
                                onClick={() => handleDeleteExercise(exercise.id)}
                                ></IconButton>
                            </span>
                        </Tooltip>
                    </ListItem>
                ))}
            </UnorderedList>
            </Flex>
        </Box>
        </Tooltip>
    )
}
