import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Flex, IconButton, Tooltip } from "@chakra-ui/react"

export default function EditDeleteMenu({ setOpenDelete, setEditName }) {

    const openDelete = () => setOpenDelete(true);
    const toggleEditName = () => setEditName(prev => !prev);
    return (
        <Flex boxShadow='md'>
            <Tooltip label='Edit exercise name' hasArrow>
                <IconButton aria-label="edit exercise" icon={<BiEdit />} onClick={toggleEditName}/>
            </Tooltip>
            <Tooltip label='Delete exercise' hasArrow>
                <IconButton aria-label="delete exercise" icon={<BiTrash />} onClick={openDelete}/>
            </Tooltip>
        </Flex>
    )
}
