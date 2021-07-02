import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';
import ExercisePanels from './ExercisePanels';
import AddExerciseMenu from './AddExerciseMenu';
export default function Exercises() {
    const skills = useSelector(state => Object.values(state.skills));
    const [selectedTab, setSelectedTab] = useState('');

    return (
        <Tabs w='100%' bg='red.100'>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            <AddExerciseMenu skills={skills} selectedTab={selectedTab}/>
            <ExercisePanels skills={skills}/>
        </Tabs>
    )
}
