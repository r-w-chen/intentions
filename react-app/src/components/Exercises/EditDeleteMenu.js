import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Flex, IconButton } from "@chakra-ui/react"

export default function EditDeleteMenu({ setOpenDelete }) {

    const openDelete = () => setOpenDelete(true);
    return (
        <Flex boxShadow='md'>
            <IconButton aria-label="edit exercise" icon={<BiEdit />} />
            <IconButton aria-label="delete exercise" icon={<BiTrash />} onClick={openDelete}/>
        </Flex>
    )
}
