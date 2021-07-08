import React, { useState }from 'react'
import moment from 'moment';
import { Flex, Checkbox, Box, UnorderedList, ListItem, 
         AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styles from '../../css.modules/Home.module.css';

export default function TodoSession({ session, date }) {
    const sessionExercises = Object.values(session.exercises);
    const convertedToLocal = moment(date).format('h:mm a');
    const [isChecked, setIsChecked] = useState(false);
    // console.log("LOCAL", convertedToLocal)
    // const [revealExercise, setRevealExercises] = useState(false);
    // console.log(isChecked);

    return (
        <AccordionItem >
            <h2>
                <AccordionButton p={0} _expanded={{ bg: "#8bbbb0" }}>
                    <Box flex="1" textAlign="left">
                        <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked} onChange={e => setIsChecked(prev => !prev)}>
                        {session.name}   {convertedToLocal}
                        </Checkbox >
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <UnorderedList>
                 {sessionExercises?.map(ex => (
                     <ListItem>
                         <Checkbox colorScheme='whatsapp' m={2}>
                            {ex.exercise.name}
                         </Checkbox >
                     </ListItem>
                 ))}
                </UnorderedList>
            </AccordionPanel>
        </AccordionItem>
        // <Flex w='100%' flexDir='column' transition='1s' className={revealExercise ? styles.expand : styles.collapse}>
        //     <Flex justify='space-between' w='100%' zIndex={2} bg='#9FD3C7'>
        //         <Checkbox colorScheme='whatsapp' m={2} isChecked={isChecked} onChange={e => setIsChecked(prev => !prev)}>
        //             {session.name}
        //         </Checkbox >
        //         <Icon as={AiOutlinePlus} alignSelf='center' m={2}
        //         _hover={{ color: '#ECECEC'}}
        //         onClick={() => setRevealExercises(prev => !prev)}
        //         />
        //     </Flex>
        //     <Flex className={revealExercise ? styles.revealedExercise : styles.hiddenExercises}>
        //         <UnorderedList>
        //         {sessionExercises?.map(ex => (
        //             <ListItem>{ex.exercise.name}</ListItem>
        //         ))}
        //         </UnorderedList>
        //     </Flex>
        // </Flex>
    )
}
