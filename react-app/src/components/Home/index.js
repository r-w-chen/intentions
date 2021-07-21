import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import styles from '../../css.modules/Dashboard.module.css';
import TodaysTodos from './TodaysTodos';
import CompletedSessions from './CompletedSessions';
import VerticalBar from './VerticalBar';
import MatrixChart from './MatrixChart';
import { getTodos } from '../../store/todo-sessions';
export default function Home({ user }) {
    const dispatch = useDispatch();
    // const date = Date().split(' ').slice(1, 4).join(' ');
    // console.log(date);
    // const todos = useSelector(state => Object.values(state.todoSessions))
    const [currentTime, setCurrentTime] = useState('')
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        dispatch(getTodos(user.id));
    }, [dispatch, user.id])

    useEffect(() => {
        // const int = setInterval(() => {
        //     setCurrentTime(moment().format('hh:mm:ss a'))
        // }, 1000)
        // return () => clearInterval(int)
    }, [])
    // const mappedTodos = todos.map(todo => {
    //     return {
    //         completed: todo.completed,
    //         date_scheduled: todo.date_scheduled
    //     }
    // })
    console.log('rerendered from home index')
    return (
        <Box boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <Flex p={3} m={5} boxShadow='lg' borderRadius='lg' bg='#ECECEC'>
                <Flex flex={2} mh='100%' justify='center'>
                    {/* <Box h='90%' m={6}>
                        <Text fontSize={64}>Welcome back</Text>
                        <Text fontSize={32}>{moment().format('dddd, MMMM Do YYYY')}</Text>
                        <Text><Icon boxSize={5} m={2} as={AiOutlineClockCircle}/>{currentTime}</Text>
                    </Box> */}
                    {/* <Box h='10%' bg='#385170'>Habit Tracker Placeholder</Box> */}
                    <VerticalBar />
                </Flex>
                <Box w='30%' flex={1}>
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType='US'
                />
                <MatrixChart />
                </Box>
            </Flex>
            <Flex h='45%' p={3} m={5} boxShadow='lg' borderRadius='lg' bg='#ECECEC'>
                <TodaysTodos />
                <CompletedSessions />
            </Flex>
        </Box>
    )
}
