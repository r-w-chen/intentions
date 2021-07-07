import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';
import SessionPanels from './SessionPanels';
import { getSessions } from '../../store/dashboard-sessions';
import styles from '../../css.modules/Dashboard.module.css';
export default function Sessions() {    
    // Hooks
    const user = useSelector(state => state.session.user);
    const skills = useSelector(state => Object.values(state.skills));
    const dispatch = useDispatch();
    // console.log("SKILLS", skills)
    // State Variables  
    const [selectedTab, setSelectedTab] = useState('');
    console.log('CURRENT TAB', selectedTab);
    
    useEffect(() => {
        if(user){
            dispatch(getSessions(user.id))
        }
    }, [dispatch])

    useEffect(() => {
        if(skills.length){
            setSelectedTab(skills[0].id)
        }
    }, [skills])

    return (
        <Tabs boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            <SessionPanels skills={skills}/>
        </Tabs>
    )
}
