import React from 'react'
import { useSelector } from 'react-redux';
import { SimpleGrid} from '@chakra-ui/react';
import SkillCard from './SkillCard';

export default function SkillsGrid() {
    const skills = useSelector(state => Object.values(state.skills))
    
    return (
        <SimpleGrid w='100%' columns={[1, 2, null, 3]}>
                {skills.map(skill => (
                    <SkillCard skill={skill} key={skill.id}/>
                ))}
        </SimpleGrid>
    )
}
