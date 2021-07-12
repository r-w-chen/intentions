import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Stack, Text } from '@chakra-ui/react';

export default function CompletedSessions() {
    const completed = useSelector(state => Object.values(state.todoSessions).filter(todo => todo.completed))

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(completed.length){
            setIsLoaded(true);
        }
    }, [completed])
    return (
        <Stack w='50%' overflow='scroll' spacing={0}>
            <Accordion bg='#9FD3C7' allowToggle  allowMultiple={false}>
            <Text p={3} bg='#ECECEC'>Completed Sessions</Text>
            {completed?.map(todo => (

                <AccordionItem bg='#9FD3C7' borderBottom='1px solid white'>
                    <h2>
                        <AccordionButton>
                            {todo.session.name}
                        </AccordionButton>
                    </h2>

                </AccordionItem>
            ))}
            </Accordion>
        </Stack>
    )
}
