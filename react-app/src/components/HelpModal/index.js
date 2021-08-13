import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, Icon, Image, Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/hooks';
import { FiHelpCircle } from 'react-icons/fi';

let slides = [
    {header: 'Getting Started', src: "https://i.imgur.com/ZqLKpWY.png", txt: 'Welcome to your Intentions Dashboard! This app is meant to serve as your main tool for keeping up with any skills or hobbies you want to get better at through deliberate practice.'},
    {header: 'Add a Skill', src: "https://media.giphy.com/media/4dSvGduGacy5smzvef/giphy.gif", txt: 'Start by creating your Skill Deck. This is where all Exercises and Sessions you create branch off of.'},
    {header: 'Add Exercises', src: "https://media.giphy.com/media/T4HgMWUnlXRJgV2oWG/giphy.gif", txt: 'Add Exercises to any of your Skills. The more you add, the more you can mix-n-match your Exercises when creating Sessions!'},
    {header: 'Create Session Cards', src: "https://media.giphy.com/media/UJRK8AMITGywWaSOYg/giphy.gif", txt: 'This is where we can group our Exercises together into Sessions. Create a session and start adding some Exercises! We\'re essentially putting together a re-usable to-do list.'},
    {header: 'Schedule Your Session', src: "https://media.giphy.com/media/ZGr5DLF4n70dbH04kA/giphy.gif", txt: 'This is where we start committing to a practice time! Schedule a day and time for your session.'},
    {header: 'Check off To-Do\'s and Track Consistency', src: "https://media.giphy.com/media/dNiOx2wUxff1xcEKlY/giphy.gif", txt: 'On the Home page, you can start checking off any to-do items for the day and view how consistent your are week-to-week! Now time to get to practicing!'},
]

export default function HelpModal(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        // if(currentSlide === slides.length - 1) return;
        setCurrentSlide(prev => prev + 1)
    }

    const prevSlide = () => {
        // if(currentSlide === 0) return;
        setCurrentSlide(prev => prev - 1)
    }

    // Reset the slides from the beginning of the modal closes
    useEffect(() => {
        if(isOpen === false) setCurrentSlide(0)
    }, [isOpen])


    // If the user has never logged in on this machine, open the tutorial modal
    useEffect(() => {
        if(!localStorage.getItem('hasLoggedIn')){
            onOpen();
            localStorage.setItem('hasLoggedIn', true)
        }
    }, [onOpen])

    return (
        <>   
        <Button onClick={onOpen} bg='none' fontWeight='bold' _hover={{bg: '#9FD3C7'}} borderRadius='0'>
            <Icon as={FiHelpCircle} mr={1}/>
            Getting Started
        </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{slides[currentSlide].header}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Image src={slides[currentSlide].src} alt="adding skill"/>
                <Text mt={3}>{slides[currentSlide].txt}</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
                </Button>
                {currentSlide !== 0 && <Button variant="ghost" onClick={prevSlide}>Back</Button>}
                {currentSlide < slides.length - 1 && <Button variant="ghost" onClick={nextSlide}>Next</Button>}
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}