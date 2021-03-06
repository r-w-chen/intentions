import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';
import ExercisePanels from './ExercisePanels';
import AddExerciseMenu from './AddExerciseMenu';
import { getExercises } from '../../store/exercises';
import styles from '../../css.modules/Dashboard.module.css';
export default function Exercises() {
    // Hooks
    const skills = useSelector(state => Object.values(state.skills));
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // State variables
    const [selectedTab, setSelectedTab] = useState('');

    // Fetch exercises on mount
    useEffect(() => {
        dispatch(getExercises(user.id))
    }, [dispatch, user.id])

    return (
        <Tabs boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            <AddExerciseMenu skills={skills} selectedTab={selectedTab}/>
            <ExercisePanels skills={skills}/>
        </Tabs>
    )
}
