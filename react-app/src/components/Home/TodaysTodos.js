import React from 'react'
import { useSelector } from 'react-redux';
import { Stack, Text } from '@chakra-ui/react';
import TodoSession from './TodoSession';
export default function TodaysTodos() {
    const todos = useSelector(state => Object.values(state.todoSessions));

    return (
        <Stack w='50%' overflow='auto' spacing={0}>
            <Text zIndex={2} p={3} bg='#ECECEC'>Today's Sessions</Text>
            {todos.map(todo => (
                <TodoSession key={todo.id} session={todo.session}/>
            ))}
        </Stack>
    )
}
