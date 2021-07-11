import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex, Icon } from '@chakra-ui/react';
import { BsCardChecklist, BsBook, BsHouseDoor, BsPencil, BsFolderCheck, BsCalendar } from "react-icons/bs";
import { getSkills } from '../../store/skills';
import Home from '../Home';
import Skills from '../Skills';
import Exercises from '../Exercises';
import Sessions from '../Sessions';
import CreateSession from '../CreateSession';
import Scheduled from '../Scheduled';
import styles from '../../css.modules/SideNav.module.css';

function Dashboard() {

    const skills = useSelector(state => state.skills);
    const skillsArr = Object.values(skills)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSkills(user.id));
    }, [dispatch, user.id])

    useEffect(() => {
        if(skillsArr.length){
            setIsLoaded(true);
        }
    }, [skillsArr])

    return isLoaded && (
        <>
        <Flex className={styles.dashboardContainer}>
                <Flex direction='column' h={'100%'} w={'250px'} bg='#ECECEC85' >
                    <NavLink to="/dashboard/home" className={styles.navLink}><Icon as={BsHouseDoor} m={2}/> Home</NavLink>
                    <NavLink to="/dashboard/skills" className={styles.navLink}><Icon as={BsFolderCheck} m={2}/> Skills</NavLink>
                    <NavLink to={`/dashboard/sessions/${skillsArr[0].id}`} className={styles.navLink}><Icon as={BsCardChecklist} m={2}/> Sessions</NavLink>
                    <NavLink to="/dashboard/exercises" className={styles.navLink}><Icon as={BsBook} m={2}/> Exercises</NavLink>
                    {/* <NavLink to="/dashboard/create-session" className={styles.navLink}><Icon as={BsPencil} m={2}/> Create Session</NavLink> */}
                    <NavLink to="/dashboard/scheduled" className={styles.navLink}><Icon as={BsCalendar} m={2}/>Scheduled Sessions</NavLink>
                </Flex>
                
            <Switch>
                {/* DASHBOARD ROUTES */}
                <Route exact path="/dashboard/home">
                    <Home user={user}/>
                </Route>
                <Route path="/dashboard/skills">
                    <Skills />
                </Route>
                <Route path="/dashboard/sessions/:skillId">
                    <Sessions skills={skills}/>
                </Route>
                <Route path="/dashboard/create-session">
                    <CreateSession />
                </Route>
                <Route path="/dashboard/exercises">
                    <Exercises />
                </Route>
                <Route path="/dashboard/scheduled">
                    <Scheduled/>
                </Route>
                <Route>
                    <h1>Page cannot be found</h1>
                </Route>
            </Switch>
        </Flex>
        </>
        )
}

export default Dashboard
