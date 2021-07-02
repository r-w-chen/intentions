import React from 'react';
import { Box } from '@chakra-ui/react';
import SkillsGrid from './SkillsGrid';
import Skill_Input from './Skill_Input';
export default function Skills() {

   
    return (
        <Box w='100vw' bg='red.100' overflow='scroll'>
          <Skill_Input />
          <SkillsGrid />
        </Box>
    )
}
