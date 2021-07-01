import React, { useRef }from 'react';
import {AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteSkill } from '../../store/skills';

export default function DeleteConfirm({isOpen, setAlertOpen, skill}) {
    const dispatch = useDispatch();
    const cancelRef = useRef();

    const handleDelete = () => {
        setAlertOpen(false);
        dispatch(deleteSkill(skill.id))
    }

    return (
        <>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setAlertOpen(false)}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Confirm Delete
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete <strong>{skill.name}</strong>?
                        This will also delete all related sessions and exercises
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}
