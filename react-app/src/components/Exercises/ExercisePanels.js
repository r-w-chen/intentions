import React from 'react'
import { TabPanels, TabPanel, Box } from '@chakra-ui/react';

// Contains actual content for each tab
export default function ExercisePanels({ skills }) {
    /* 
        When I open the drawer to add an exercise, 
        I want the select option or the form to automatically select the option
        based on which tab is active
    */
    return (
        <>
        <TabPanels>
            {skills.map(skill => (
                <TabPanel key={skill.id}>
                    Stuff for {skill.name}

                </TabPanel>
            ))}
        </TabPanels>
        </>
    )
}
