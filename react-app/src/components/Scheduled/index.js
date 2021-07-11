import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import styles from '../../css.modules/Dashboard.module.css';
export default function Scheduled() {
    return (
        <Box boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <Text>Scheduled Sessions</Text>
        </Box>
    )
}
