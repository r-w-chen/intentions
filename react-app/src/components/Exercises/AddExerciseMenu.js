import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    		 Button, Input, Select, FormControl, FormLabel,
				 useDisclosure
  } from "@chakra-ui/react"
import { addExercise } from '../../store/exercises';


export default function AddExerciseMenu({ skills, selectedTab }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [name, setName] = useState('');
	const [skillType, setSkillType] = useState('');
	const [notes, setNotes] = useState('');

	// When skills are received from useSelector, set the default for skillType to the first skill in the array
	useEffect(() => {
		// console.log('FIRST', skills)
		if(skills.length){
			// console.log('length', skills.length, skills[0])
			setSkillType(skills[0].id)
			// console.log('skillTYpe', skillType)
		}
	}, [skills]) // changed from skills.length to skills

	// When selectedTab changes, change the select input's value to match the tab Id so it is shown at default
	useEffect(() => {
		setSkillType(selectedTab);
	}, [selectedTab])

	const user = useSelector(state => state.session.user)
	const errors = useSelector(state => state.errors.exercises);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const exercise = {
			name: name.trim(),
			user_id: user.id,
			skill_id: +skillType,
			notes
		}
		dispatch(addExercise(exercise));
		onClose();
		setNotes('');
		setName('');

	}
	// TODO: validations
	return (
			<>
				<Button onClick={onOpen}>
						Add Exercise
				</Button>
				<Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Add an Exercise</DrawerHeader>
						<DrawerBody>
							<FormControl>
								<FormLabel>Exercise Name</FormLabel>
								<Input mb={5} value={name} onChange={e => setName(e.target.value)}/>
								<FormLabel>What skill is this exercise for?</FormLabel>
								<Select 
								value={skillType}
								onChange={e => setSkillType(e.target.value)}
								>
									{skills.map(skill => (
										<option value={skill.id} key={skill.id}>{skill.name}</option>
									))}
								</Select>
								<label>Add Exercise Notes Here</label>
								<ReactQuill value={notes} onChange={value => setNotes(value)}/>
							</FormControl>
						</DrawerBody>
						<DrawerFooter>
							<Button onClick={handleSubmit}>Add</Button>	
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
	)
}
