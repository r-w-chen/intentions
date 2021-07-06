import React from 'react';
import { Box } from '@chakra-ui/react';
import SkillsGrid from './SkillsGrid';
import SkillInput from './SkillInput';
import styles from '../../css.modules/Dashboard.module.css';

export default function Skills() {

   
    return (
        <Box boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
          <SkillInput />
          <SkillsGrid />
        </Box>
    )
}
