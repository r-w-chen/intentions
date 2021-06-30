import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Skills from '../Skills';

function Dashboard() {
    return (
        <>
        <Flex h={'90vh'}>
                <Flex direction='column' p={5} h={'100%'} w={'20vw'}>
                    <NavLink to="/dashboard">Home</NavLink>
                    <NavLink to="/dashboard/skills">Skills</NavLink>
                    <NavLink to="/dashboard/sessions">Sessions</NavLink>
                    <NavLink to="/dashboard/exercises">Exercises</NavLink>
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
                    <h1>Sessions Page</h1>
                </Route>
                <Route path="/dashboard/exercises">
                    <h1>Exercises Page</h1>
                </Route>
          
            </Switch>
        </Flex>
        </>
        )
}

export default Dashboard
