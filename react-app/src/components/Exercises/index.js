import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';
import ExercisePanels from './ExercisePanels';
import AddExerciseMenu from './AddExerciseMenu';
import { getExercises } from '../../store/exercises';

export default function Exercises() {
    const skills = useSelector(state => Object.values(state.skills));
    const user = useSelector(state => state.session.user);

    const [selectedTab, setSelectedTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExercises(user.id))
    }, [dispatch, user.id])

    return (
        <Tabs w='100%' bg='red.100'>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            <AddExerciseMenu skills={skills} selectedTab={selectedTab}/>
            <ExercisePanels skills={skills}/>
        </Tabs>
    )
}
