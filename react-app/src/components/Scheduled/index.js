import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text, VStack, Button, Icon } from '@chakra-ui/react';
import { AiOutlineSchedule} from 'react-icons/ai';
import { BiEdit, BiTrash} from 'react-icons/bi'
import { getTodos, deleteTodo } from '../../store/todo-sessions';
import styles from '../../css.modules/Dashboard.module.css';
export default function Scheduled({user}) {
    // Hooks
    const dispatch = useDispatch();
    let todos = useSelector(state => Object.values(state.todoSessions));

    // State variables
    const [isLoaded, setIsLoaded] = useState(false);

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
                            <Button m={3}>Reschedule</Button>
                            <Button m={3} onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                        </Flex>
                    </Flex>
                ))}
            </VStack>

        </Flex>
    )
}
