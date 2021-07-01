import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { getSkills } from '../../store/skills';
import SkillsGrid from './SkillsGrid';
import Skill_Input from './Skill_Input';
export default function Skills() {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSkills(user.id));
    }, [dispatch])

    return (
        <Box w='100vw' bg='red.100' overflow='scroll'>
            <Skill_Input />
            <SkillsGrid />
        </Box>
    )
}
