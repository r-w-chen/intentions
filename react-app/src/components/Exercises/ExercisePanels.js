import React, { useState, useEffect } from 'react'
import { TabPanels, TabPanel, Stack, Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import SingleExercise from './SingleExercise';
import { updateExerciseNotes } from '../../store/exercises';


export default function ExercisePanels({ skills }) { // Contains actual content for each tab
    // Convert exercises into array 
    const exercisesBySkllId = useSelector(state => {
        const newObj = {}
        for(let skillId in state.exercises){
            newObj[skillId] = Object.values(state.exercises[skillId]);
        }
        return newObj;
    })
    const [currentExercise, setCurrentExercise] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();

    // change displayed notes when an exercise is selected
    useEffect(() => {
        if(currentExercise){
            setNotes(currentExercise.notes);
        }
    }, [currentExercise])
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

	// TODO: add validations for edits
    // TODO: allow save on CMD/CTRL S 

    const saveNotesOnBlur = () => {
        // console.log('blurrrrrr', notes)
        if(currentExercise && notes !== currentExercise.notes){
            const exercise = {
                id: currentExercise.id,
                notes
            }
            dispatch(updateExerciseNotes(exercise))
        }
    }

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
                    <Box bg='white' m={5} h='100%' onBlur={saveNotesOnBlur}>
                        <ReactQuill value={notes ? notes : 'Select an exercise to view notes'}
                        onChange={value => setNotes(value)}
                    />
                    </Box>
                </TabPanel>
            ))}
        </TabPanels>
        </>
    )
}
