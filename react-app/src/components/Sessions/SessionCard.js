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
        <Box w='90%' h={300} borderRadius='md' boxShadow='md' bg='gray.100'
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
