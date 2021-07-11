import React from 'react'
import { NavLink } from 'react-router-dom';
import { TabList, Tab, Flex, Box } from '@chakra-ui/react';

export default function SessionSkillTabs({ skills }) {

    return (
        <Flex borderBottom='2px solid #ECECEC'> 
              {skills.map(skill => (
                  <Box p={3} _hover={{color: '#385170'}} _active={{bg: '#ECECEC60'}} transition='200ms'>
                        <NavLink to={`/dashboard/sessions/${skill.id}`} key={skill.id} activeClassName="skill-tab-active">
                            {skill.name}
                        </NavLink>
                 </Box>
            ))}
        </Flex>
    )
}
