import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import styles from '../../css.modules/Dashboard.module.css';
import TodaysTodos from './TodaysTodos';
import CompletedSessions from './CompletedSessions';
import { getTodos } from '../../store/todo-sessions';
export default function Home({ user }) {
    const dispatch = useDispatch();
    // const date = Date().split(' ').slice(1, 4).join(' ');
    // console.log(date);

    useEffect(() => {
        dispatch(getTodos(user.id));
    }, [dispatch, user.id])

    return (
        <Box boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <Flex h='45%' p={3} m={5} boxShadow='lg' borderRadius='lg' bg='#ECECEC'>
                <Box w='70%' h='100%' border='1px'>
                    <Box h='90%'>Content</Box>
                    <Box h='10%' bg='#385170'>Habit Tracker Placeholder</Box>
                </Box>
                <Box w='30%' border='1px'>Calendar Placeholder</Box>
            </Flex>
            <Flex h='45%' p={3} m={5} boxShadow='lg' borderRadius='lg' bg='#ECECEC'>
                <TodaysTodos />
                <CompletedSessions />
            </Flex>
        </Box>
    )
}
