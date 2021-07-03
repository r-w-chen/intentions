import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
         Flex, Text, Button, Input} from '@chakra-ui/react';
import EditDeleteMenu from './EditDeleteMenu';
import { deleteExercise, updateExerciseName } from '../../store/exercises';

export default function SingleExercise({exercise, setCurrentExercise}) {
    const [isHovered, setIsHovered] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState(exercise.name);

    const dispatch = useDispatch();

    const closeDelete = () => setOpenDelete(false); // close popover

    const handleDelete = () => {
        dispatch(deleteExercise(exercise.id, exercise.skill_id));
    }
    // TODO: save edits on blur as well
    const saveEditsOnEnter = (e) => {
        if (e.key === 'Enter'){
            console.log(name);
            const updatedExercise = {
                id: exercise.id,
                name,
            }
            dispatch(updateExerciseName(updatedExercise))
            e.target.blur();
            setEditName(false);
        }
    }

    return (
        <Popover 
        placement='right'
        isOpen={openDelete}
        onClose={closeDelete}
        >
            <PopoverTrigger>
            <Flex h={75} p={5} border='1px' justify='space-between' 
            onClick={() => setCurrentExercise(exercise)}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {editName ?
                 <Input 
                 value={name} onChange={e => setName(e.target.value)} onKeyUp={saveEditsOnEnter}
                 /> 
                 : 
                 <Text>{exercise.name}</Text>}
                {isHovered && <EditDeleteMenu setOpenDelete={setOpenDelete} setEditName={setEditName}/>}
            </Flex>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation</PopoverHeader>
                <PopoverBody>Delete this exercise?</PopoverBody>
                <PopoverFooter>
                    <Button bg='crimson' onClick={handleDelete}>Yes</Button>
                </PopoverFooter>
            </PopoverContent>
            </Popover>
        
    )
}
