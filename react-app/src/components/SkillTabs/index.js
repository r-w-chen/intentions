import React from 'react'
import { NavLink } from 'react-router-dom';
import { TabList, Tab, Flex, Box } from '@chakra-ui/react';

export default function SessionSkillTabs({ skills, setSelectedTab }) {

    return (
        <TabList overflowX='scroll' overflowY='hidden' className='skill-tabs'>
            {skills.map(skill => (
                <Tab key={skill.id} onClick={() => setSelectedTab(skill.id)}>{skill.name}</Tab>
            ))}
        </TabList>
    )
}
