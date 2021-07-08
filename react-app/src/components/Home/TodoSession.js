import React, { useState }from 'react'
import { Flex, Checkbox, Icon, UnorderedList, ListItem } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styles from '../../css.modules/Home.module.css';

export default function TodoSession({ session }) {
    const [isChecked, setIsChecked] = useState(false);
    const [revealExercise, setRevealExercises] = useState(false);
    const sessionExercises = Object.values(session.exercises);
    console.log(isChecked);
    return (
        <Flex w='100%' flexDir='column' transition='1s' className={revealExercise ? styles.expand : styles.collapse}>
            <Flex justify='space-between' w='100%' zIndex={2} bg='#9FD3C7'>
                <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked} onChange={e => setIsChecked(prev => !prev)}>
                    {session.name}
                </Checkbox >
                <Icon as={AiOutlinePlus} alignSelf='center' m={2}
                _hover={{ color: '#ECECEC'}}
                onClick={() => setRevealExercises(prev => !prev)}
                />
            </Flex>
            <Flex className={revealExercise ? styles.revealedExercise : styles.hiddenExercises}>
                <UnorderedList>
                {sessionExercises?.map(ex => (
                    <ListItem>{ex.exercise.name}</ListItem>
                ))}
                </UnorderedList>
            </Flex>
        </Flex>
    )
}
