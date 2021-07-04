import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { getSkills } from '../../store/skills';
import Skills from '../Skills';
import Exercises from '../Exercises';
import Sessions from '../Sessions';
import CreateSession from '../CreateSession';

function Dashboard() {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSkills(user.id));
    }, [dispatch, user.id])

    return (
        <>
        <Flex h={'95vh'}>
                <Flex direction='column' p={5} h={'100%'} w={'20vw'}>
                    <NavLink to="/dashboard">Home</NavLink>
                    <NavLink to="/dashboard/skills">Skills</NavLink>
                    <NavLink to="/dashboard/sessions">Sessions</NavLink>
                    <NavLink to="/dashboard/exercises">Exercises</NavLink>
                    <NavLink to="/dashboard/create-session">Create Session</NavLink>
                </Flex>
                
            <Switch>

                {/* DASHBOARD ROUTES */}
                <Route exact path="/dashboard">
                    <h1>Home Page</h1>
                </Route>
                <Route path="/dashboard/skills">
                    <Skills />
                </Route>
                <Route path="/dashboard/sessions">
                    <Sessions />
                </Route>
                <Route path="/dashboard/create-session">
                    <CreateSession />
                </Route>
                <Route path="/dashboard/exercises">
                    <Exercises />
                </Route>
          
            </Switch>
        </Flex>
        </>
        )
}

export default Dashboard
