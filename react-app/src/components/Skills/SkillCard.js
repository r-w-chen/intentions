import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Flex, Text, Input, Icon, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import { BsThreeDotsVertical } from "react-icons/bs"
import DeleteConfirm from './DeleteConfirm';
import { updateSkill } from '../../store/skills';
export default function SkillCard({skill}) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState(skill.name);
    const [alertOpen, setAlertOpen] = useState(false);

    const saveEditsOnBlur = () => {
        setEditMode(false);
        const updatedSkill = {
                id: skill.id,
                name: editText
            }
        dispatch(updateSkill(updatedSkill))

    }

    const saveEditsOnEnter = (e) => {
        if(e.key === 'Enter'){
            const updatedSkill = {
                id: skill.id,
                name: editText
            }
            setEditMode(false);
            dispatch(updateSkill(updatedSkill))
        }
    }

    return (
        <>
            <Flex borderRadius='md' boxShadow='md' h={200} m={5} bg='gray.200' key={skill.id}
            justify='space-between'
            >
                {editMode ? 
                <Input m={5} value={editText} bg='white'
                onBlur={saveEditsOnBlur}
                onKeyUp={saveEditsOnEnter}
                onChange={e => setEditText(e.target.value)}
                    /> 
                : 
                <Text m={5}>{skill.name}</Text>}
                
                <Menu>
                    <MenuButton height={5} m={5}>
                        <Icon as={BsThreeDotsVertical} boxSize={5}/>
                    </MenuButton>
                    <MenuList minW='100px'>
                        <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
                        <MenuItem onClick={() => setAlertOpen(true)}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <DeleteConfirm skill={skill} isOpen={alertOpen} setAlertOpen={setAlertOpen}/>
        </>
    )
}
