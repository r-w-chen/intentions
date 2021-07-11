import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text, VStack, Button, Icon, FormControl, FormLabel, Input,
         Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react';
import { AiOutlineSchedule} from 'react-icons/ai';
import { getTodos, deleteTodo, updateTodoSessionReschedule } from '../../store/todo-sessions';
import styles from '../../css.modules/Dashboard.module.css';

const DateInput = () => {
    return (
        <FormControl>
            <FormLabel></FormLabel>
            <Input type='datetime' />
        </FormControl>
    )
}

export default function Scheduled({user}) {
    // Hooks
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    let todos = useSelector(state => Object.values(state.todoSessions));

    // State variables
    const [isLoaded, setIsLoaded] = useState(false);
    const [rescheduledDate, setRescheduledDate] = useState('');

    useEffect(() => {
        dispatch(getTodos(user.id));
    }, [dispatch, user.id])

    useEffect(() => {
        if(todos.length > 0){
            setIsLoaded(true);
        }
    }, [todos])

    const handleDeleteTodo = todoId => {
        dispatch(deleteTodo(todoId))
    }

    const handleRescheduleTodo = todoId => {
        const date_scheduled = moment(rescheduledDate).utc().format();
        const todo = {
            id: todoId,
            date_scheduled
        }
        dispatch(updateTodoSessionReschedule(todo))

    }

    return isLoaded && (
        <Flex boxShadow='lg' borderRadius='lg' justify='center' align='center' m={3} className={styles.dashboardContent}>
            <VStack w='70%' h='90%' overflow='auto' bg='#385170' boxShadow='lg' borderRadius='lg'>
                <Text color='#ECECEC' fontSize={24} textAlign='center' p={3}>
                    Scheduled Sessions
                </Text>
                {/* <Flex p={3} w='90%' justify='space-between' align='center' color='#ECECEC'>
                    <Text flex={1}>Session Name</Text>
                    <Text flex={2}>Date Scheduled</Text>
                    <Flex flex={1}></Flex>
                </Flex> */}
                {todos.map(todo => (
                    <Flex p={3} w='90%' justify='space-between' align='center' color='#ECECEC'>
                        <Icon as={AiOutlineSchedule} boxSize={5} mr={3}/>
                        <Text flex={1}>{todo.session.name}</Text>
                        <Text flex={2}>{moment(todo.date_scheduled).format('dddd, MMMM Do YYYY, h:mm a')}</Text>
                        <Flex flex={1}>
                            <Popover initialFocusRef={inputRef} placement='right'>
                                <PopoverTrigger>
                                    <Button m={3}>Reschedule</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>Reschedule</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                    <FormControl>
                                        <FormLabel></FormLabel>
                                        <Input ref={inputRef} type='datetime-local' value={rescheduledDate} onChange={e => setRescheduledDate(e.target.value)}/>
                                    </FormControl>
                                    <PopoverFooter display='flex' justifyContent='flex-end'>
                                        <Button onClick={() => handleRescheduleTodo(todo.id)}>Confirm</Button>
                                    </PopoverFooter>
                                    </PopoverBody>        
                                </PopoverContent>       
                            </Popover>
                            <Button m={3} onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                        </Flex>
                    </Flex>
                ))}
            </VStack>

        </Flex>
    )
}
