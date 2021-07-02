import React from 'react'
import { TabList, Tab } from '@chakra-ui/react';

export default function SkillTabs({ skills, setSelectedTab }) {

    return (
        <TabList>
            {skills.map(skill => (
                <Tab key={skill.id} onClick={() => setSelectedTab(skill.id)}>{skill.name}</Tab>
            ))}
        </TabList>
    )
}
