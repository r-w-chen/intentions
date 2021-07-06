import React from 'react';
import { useSelector } from 'react-redux';
import { TabPanels, TabPanel, Box, SimpleGrid, Text } from '@chakra-ui/react';
import SessionCard from './SessionCard';

export default function SessionPanels({ skills }) {
    const sessions = useSelector(state => Object.values(state.dashboardSessions));
    console.log('SKILLS', skills)
    console.log("SESSIONS", sessions)
    return (
        <TabPanels>
            {skills.map(skill => (
                <TabPanel>
                    <SimpleGrid columns={[1, null, 2, 3, 4]} spacing={10}>
                    {sessions.length ? sessions.filter(session => skill.id === session.skill_id)?.map(session => (
                        <SessionCard session={session} />
                    )) : null}
                    </SimpleGrid>
                </TabPanel>
            ))}
        </TabPanels>
    )
}
