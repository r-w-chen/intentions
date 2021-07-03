import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Flex, IconButton } from "@chakra-ui/react"

export default function EditDeleteMenu({ setOpenDelete, setEditName }) {

    const openDelete = () => setOpenDelete(true);
    const toggleEditName = () => setEditName(prev => !prev);
    return (
        <Flex boxShadow='md'>
            <IconButton aria-label="edit exercise" icon={<BiEdit />} onClick={toggleEditName}/>
            <IconButton aria-label="delete exercise" icon={<BiTrash />} onClick={openDelete}/>
        </Flex>
    )
}
