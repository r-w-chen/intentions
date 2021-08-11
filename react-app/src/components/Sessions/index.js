import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Box, Text, Button, useDisclosure, Flex, SlideFade, Input } from '@chakra-ui/react';
import SessionSkillTabs from '../SkillTabs/SessionSkillTabs';
import SessionPanels from './SessionPanels';
import { getSessions, addSession } from '../../store/dashboard-sessions';
import { getSkills } from '../../store/skills';
import styles from '../../css.modules/Dashboard.module.css';
export default function Sessions({ skills }) {    
    // Hooks
    const { skillId } = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { isOpen, onToggle } = useDisclosure();
    const input = useRef(null); // Create ref for input so it can be focused upon button press
    const skillsArr = Object.values(skills)

    const [sessionName, setSessionName] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);


    // useEffect(() => {
    //     if(showInput){
    //         input.current.focus();
    //     } else {
    //         input.current.blur();
    //     }
    // }, [showInput])
    
    useEffect(() => {
        dispatch(getSessions(user.id))
        dispatch(getSkills(user.id))
    }, [dispatch, user])

    const enterSession = e => {
        if (e.key === "Enter"){
            const newSession = {
                name: sessionName.trim(),
                skill_id: +skillId,
                user_id: user.id
            }
            dispatch(addSession(newSession));
            setSessionName('');
            e.target.blur();
            
        }
    }

    // const toggleInput = (e) =>{
    //     onToggle();
    //     e.target.blur();
    //     // dispatch(clearErrors());
    //     setShowInput(prev => !prev);
    //     if(showInput){
    //         input.current.focus();
    //     } else {
    //         input.current.blur();
    //     }
    //     setSessionName(''); // Clear input after every toggle
    // }

    const handleAddSession = e => {
        const newSession = {
            name: sessionName.trim(),
            skill_id: +skillId,
            user_id: user.id
        }
        dispatch(addSession(newSession));
        setSessionName('');
        e.target.blur();
    }
    return (
        <Box boxShadow='lg' borderRadius='lg' m={3} className={styles.dashboardContent}>
            <SessionSkillTabs skills={Object.values(skills)} />
           
            {skills[skillId] ? (
            <>
             <Flex m={1}>
                <Button m={2} transition='100ms' borderRadius='full' bg='#385170' color='#ECECEC'
                _hover={{bg:'#142D4C'}} onClick={handleAddSession}>Add Session</Button>
                <SlideFade in={true}>
                    <Input m={2}w={'300px'} bg='gray.100' errorBorderColor='crimson' isInvalid={invalidInput}
                    value={sessionName}
                    onChange={e => setSessionName(e.target.value)}
                    onKeyUp={enterSession}
                    placeholder="Press 'Enter' to save"
                    ref={input}
                />
                </SlideFade>
            </Flex>
            <SessionPanels skill={skills[skillId]}/>
            </>
            )
            :
            <Box m={10}>
                {skillsArr.length ? 
                <Text fontSize={24}>Select a Skill to view Sessions!</Text>
                :
                <Link to="/dashboard/skills"><Text fontSize={24} _hover={{color: '#385170'}}>Create a Skill to add Sessions and Exercises!</Text></Link>
                }
            </Box>
            }
        </Box>
    )
}
