import React from 'react';
import { Box } from '@chakra-ui/react';
import SkillsGrid from './SkillsGrid';
import SkillInput from './SkillInput';
export default function Skills() {

   
    return (
        <Box w='100vw' bg='red.100' overflow='scroll'>
          <SkillInput />
          <SkillsGrid />
        </Box>
    )
}
