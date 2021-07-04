import React, { useState, useEffect } from 'react'
import { ListItem, Text, IconButton } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";

export default function UnaddedSessions({ exercise, setSessionExercises, removedExerciseId }) {
    const [hidden, setHidden] = useState(false);


    // Unhide exercise if '-' icon was hit
    useEffect(() => {
        if(removedExerciseId === exercise.id){
            setHidden(false);
        }
    }, [removedExerciseId, exercise.id])

    const addExercise = (exercise) => {
        setSessionExercises(prev => [...prev, exercise])
        setHidden(true);
    }

    return hidden ? null : (
        <ListItem p={2} display='flex' justifyContent='space-between'>
            <Text alignSelf='center'>{exercise.name}</Text>
            <IconButton borderRadius='full' icon={<AiOutlinePlus />} onClick={() => addExercise(exercise)}/>
        </ListItem>
    )
}
