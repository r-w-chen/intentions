import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@chakra-ui/react';
import SkillTabs from '../SkillTabs';
import SessionPanels from './SessionPanels';
import { getSessions } from '../../store/dashboard-sessions';
export default function Sessions() {    
    // Hooks
    const user = useSelector(state => state.session.user);
    const skills = useSelector(state => Object.values(state.skills));
    const dispatch = useDispatch();

    // State Variables  
    const [selectedTab, setSelectedTab] = useState('');

    useEffect(() => {
        if(user){
            dispatch(getSessions(user.id))
        }
    }, [dispatch])

    return (
        <Tabs w='80%' bg='red.100'>
            <SkillTabs skills={skills} setSelectedTab={setSelectedTab}/>
            <SessionPanels skills={skills}/>
        </Tabs>
    )
}
