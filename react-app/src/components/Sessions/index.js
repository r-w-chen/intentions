import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';

export default function Sessions() {    
    const skills = useSelector(state => Object.values(state.skills));

    // State Variables
    const [selectedTab, setSelectedTab] = useState('');

    return (
        <Tabs w='80%' bg='red.100'>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            {/* <AddExerciseMenu skills={skills} selectedTab={selectedTab}/> */}
            {/* <ExercisePanels skills={skills}/> */}
        </Tabs>
    )
}
