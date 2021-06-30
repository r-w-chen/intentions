import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Input, SlideFade, useDisclosure } from '@chakra-ui/react';
import { addSkill } from '../../store/skills';

export default function Skills() {
    const [skillName, setSkillName] = useState('');
    const { isOpen, onToggle } = useDisclosure();

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();



    const enterSkill = e => {
        if (e.key === "Enter"){
            const newSkill = {
                name: skillName,
                user_id: user.id
            }
            dispatch(addSkill(newSkill))
        }
    }

    return (
        <Box>
            <Flex>
                <Button onClick={onToggle}>Add Skill</Button>
                <SlideFade in={isOpen}>
                {/* {openSkillInput && <Input bg='gray.100'/>} */}
                    <Input w={'300px'} bg='gray.100'
                    onChange={e => setSkillName(e.target.value)}
                    onKeyUp={enterSkill}
                    />
                </SlideFade>
            </Flex>
        </Box>
    )
}
