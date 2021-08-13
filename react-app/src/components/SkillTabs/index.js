import React from 'react'
import { NavLink } from 'react-router-dom';
import { TabList, Tab, Flex, Box } from '@chakra-ui/react';

export default function SessionSkillTabs({ skills, setSelectedTab }) {

    return (
        <TabList overflowX='scroll' overflowY='hidden' className='skill-tabs'>
            {skills.map(skill => (
                <Tab key={skill.id} onClick={() => setSelectedTab(skill.id)} fontWeight='normal' p={3}>{skill.name}</Tab>
            ))}
        </TabList>
    )
}
