import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import styles from '../../css.modules/Dashboard.module.css';
import TodaysTodos from './TodaysTodos';
import CompletedSessions from './CompletedSessions';
export default function Home() {
    const date = Date().split(' ').slice(1, 4).join(' ');
    // console.log(date);
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
