import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Button, Input, SlideFade, Text, useDisclosure } from '@chakra-ui/react';
import { addSkill } from '../../store/skills';
import { clearErrors } from '../../store/errors';

export default function SkillInput() {
    const [skillName, setSkillName] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const input = useRef(null); // Create ref for input so it can be focused upon button press
    // const { isOpen, onToggle } = useDisclosure();
    
    const errors = useSelector(state => state.errors.skills);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(showInput){
            input.current.focus();
        } else {
            input.current.blur();
        }
    }, [showInput])

    useEffect(() => {
        if(errors){
            setInvalidInput(true);
        } else {
            // onToggle();
            setInvalidInput(false);
        }
    }, [errors])
 
    const enterSkill = e => {
        if (e.key === "Enter"){
            const newSkill = {
                name: skillName.trim(),
                user_id: user.id
            }
            dispatch(addSkill(newSkill));
            setSkillName('');
            e.target.blur();
            
        }
    }

    // const toggleInput = (e) =>{
    //     // onToggle();
    //     e.target.blur();
    //     dispatch(clearErrors());
    //     setShowInput(prev => !prev);
    //     if(showInput){
    //         input.current.focus();
    //     } else {
    //         input.current.blur();
    //     }

    //     setSkillName(''); // Clear input after every toggle
    // }

    const handleAddSkill = e => {
        const newSkill = {
            name: skillName.trim(),
            user_id: user.id
        }
        dispatch(addSkill(newSkill));
        setSkillName('');
        e.target.blur();
    }
    return (
        <Flex>
            <Button m={3} mr='0px' transition='100ms' borderRadius='full' bg='#385170' color='#ECECEC'
             _hover={{bg:'#142D4C'}} onClick={handleAddSkill}
             >
                Add Skill
            </Button>
            <SlideFade in={true}>
                <Input m={3} w={'300px'} bg='gray.100' errorBorderColor='crimson' isInvalid={invalidInput}
                value={skillName}
                onChange={e => setSkillName(e.target.value)}
                onKeyUp={enterSkill}
                placeholder="Press 'Enter' to save"
                ref={input}
                />
            </SlideFade>
            {errors && <Text alignSelf='center' color='crimson'>{errors[0]}</Text>}
        </Flex>
    )
}
