import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
         Icon, Button } from '@chakra-ui/react';
import { TiTrash } from 'react-icons/ti';
import { deleteSessions } from '../../store/dashboard-sessions';
import styles from '../../css.modules/Dashboard.module.css';

export default function DeleteSession({session}) {
    // Hooks
    const dispatch = useDispatch();
    // State
    const [openDelete, setOpenDelete] = useState(false);

    const closeDelete = () => setOpenDelete(false); // close popover

    const handleDelete = () => {
        dispatch(deleteSessions(session.id))
    }
    return (
        <Popover 
        placement='left'
        isOpen={openDelete}
        onClose={closeDelete}
        >
            <PopoverTrigger>
                <Icon as={TiTrash} boxSize={6} m={1} className={styles.sessionIcons}
                onClick={() => setOpenDelete(true)}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation</PopoverHeader>
                <PopoverBody>Delete this session?</PopoverBody>
                <PopoverFooter>
                    <Button bg='crimson' onClick={handleDelete}>Yes</Button>
                </PopoverFooter>
            </PopoverContent>
            </Popover>
    )
}
