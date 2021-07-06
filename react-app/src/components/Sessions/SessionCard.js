import React, { useState } from 'react'
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
export default function SessionCard({ session }) {
    const [isHovered, setIsHovered] = useState(false);

    const revealExercises = () => {
        setIsHovered(true);
    }

    const hideExercises = () => {
        setIsHovered(false);
    }
    console.log(`SESSION`)
    return (
        <Box w='90%' h={300} borderRadius='md' boxShadow='lg' bg='#ECECEC' border='1px solid lightgray'
         onMouseOver={revealExercises}
         onMouseLeave={hideExercises}
        >  
            {isHovered ? 
            <UnorderedList m={5}>
                {session.exercises?.map(({ exercise }) => (
                    <ListItem>{exercise.name}</ListItem>
                ))}
            </UnorderedList>
            :
            <Text m={5}>{session.name}</Text>
            }
        </Box>
    )
}
