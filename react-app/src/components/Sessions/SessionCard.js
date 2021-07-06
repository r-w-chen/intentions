import React, { useState } from 'react'
import { Box, Flex, Text, UnorderedList, ListItem, Icon } from '@chakra-ui/react';
import { TiArrowBackOutline, TiEdit, TiTrash } from 'react-icons/ti';
import styles from '../../css.modules/Dashboard.module.css';

export default function SessionCard({ session }) {
    // const [isHovered, setIsHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);


    const flipCard = () => setIsFlipped(prev => !prev);

    console.log(`SESSION`)
    return (
        <Box w='100%' h={250} borderRadius='md' boxShadow='lg' bg='#ECECEC' border='1px solid lightgray' transition='300ms'
         position='relative' className={isFlipped ? styles.back: styles.front}
        >   
            <Flex className={isFlipped ? styles.frontSideFlipped : styles.frontSide} >
                <Flex justify='space-between' w='100%' m={5}>
                    <Text>{session.name}</Text>
                    <Flex className={styles.sessionIconMenu}>
                        <Icon as={TiArrowBackOutline} boxSize={6} m={1} className={styles.sessionIcons}
                        onClick={flipCard}
                        />
                        <Icon as={TiEdit} boxSize={6} m={1} className={styles.sessionIcons}
                        />
                        <Icon as={TiTrash} boxSize={6} m={1}  className={styles.sessionIcons}
                        />
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir='column' justify='start' className={isFlipped ? styles.backSide : styles.backSideFlipped}>
                <Flex justify='space-between' w='100%' p={5}>
                        <Text>Exercises</Text>
                        <Flex className={styles.sessionIconMenu}>
                            <Icon as={TiArrowBackOutline} boxSize={6} m={1} className={styles.sessionIcons}
                            onClick={flipCard}
                            />
                            <Icon as={TiEdit} boxSize={6} m={1} className={styles.sessionIcons}
                            />
                            <Icon as={TiTrash} boxSize={6} m={1} className={styles.sessionIcons}
                            />
                        </Flex>
                </Flex>
            <UnorderedList className={styles.sessionExercises}>
                {session.exercises?.map(({ exercise }) => (
                    <ListItem>{exercise.name}</ListItem>
                ))}
            </UnorderedList>
            </Flex>
        </Box>
    )
}
