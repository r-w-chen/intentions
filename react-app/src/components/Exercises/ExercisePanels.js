import React, { useState } from 'react'
import { TabPanels, TabPanel, Stack, Box, Text, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import SingleExercise from './SingleExercise';
// Contains actual content for each tab
export default function ExercisePanels({ skills }) {
    // Convert exercises into array
    const exercisesBySkllId = useSelector(state => {
        const newObj = {}
        for(let skillId in state.exercises){
            newObj[skillId] = Object.values(state.exercises[skillId]);
        }
        return newObj;
    })

    console.log(exercisesBySkllId);
    const [currentExercise, setCurrentExercise] = useState('');
    
    /* 
        When I open the drawer to add an exercise, 
        I want the select option or the form to automatically select the option
        based on which tab is active
    */
   /* Ways I could go about display exercises per skill tab
    * Query for all exercises on app load => render {exercises.filter(<filter by skill_id>).map(<render component>)} 
    * Lazy/Eagerload all exercises along with Skills on app load => render {skills.map({exercise} => <render exercise>)}
    * Split each TabPanel into a component => have a useEffect that makes a fetch each time 
    * Change how exercises are store in Redux {skill_id: { exercise_id: { exercise } }
    */
    

    return (
        <>
        <TabPanels h='80%'>
            {skills.map(skill => (
                <TabPanel key={skill.id} h='100%' display='flex'>
                    <Stack bg='blue.100' w='40%' h='100%' m={5} p={3} spacing={1} overflow='scroll'>
                        {exercisesBySkllId[skill.id]?.map(exercise => (
                            <SingleExercise exercise={exercise} setCurrentExercise={setCurrentExercise} key={exercise.id}/>
                        ))}
                    </Stack>
                    {/* <Box bg='blue.100' w='60%' h='100%' m={5} p={3}>
                        {currentExercise && ReactHtmlParser(currentExercise.notes)}
                    </Box> */}
                    {/* <ReactQuill value={currentExercise.notes}>
                    </ReactQuill> */}
                </TabPanel>
            ))}
        </TabPanels>
        </>
    )
}
