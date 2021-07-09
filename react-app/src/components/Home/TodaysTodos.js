import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Stack, Text, Accordion } from '@chakra-ui/react';
import TodoSession from './TodoSession';

const filterForToday = (todos) => {
    const start = moment().startOf('day').valueOf(); // Start of day in milliseconds
    const end = moment().endOf('day').valueOf(); // End of day in milliseconds
    
    return todos.filter(todo => {
        const date = moment(todo.date_scheduled).valueOf(); // todo's date_scheduled in milliseconds
        // console.log("START", start);
        // console.log("MIDDLE", date);
        // console.log('END', end);
        // console.log("HAPPENS TODAY?", date >= start && date < end)
        return (date >= start && date <= end) // filter for todos that are within start and end
    })
    
}
export default function TodaysTodos() {
    let todos = useSelector(state => filterForToday(Object.values(state.todoSessions)));

    // State variables
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(todos.length > 0){
            setIsLoaded(true);
        }
    }, [todos])


    return isLoaded && (
        <Stack w='50%' overflow='scroll' spacing={0}>
            <Text zIndex={2} p={3} bg='#ECECEC'>Today's Sessions</Text>
            <Accordion bg='#9FD3C7' allowToggle  allowMultiple={false}>
                {todos.map(todo => (
                    <TodoSession key={todo.id} session={todo.session} todo_exercises={todo.todo_exercises} date={todo.date_scheduled}/>
                ))}
            </Accordion>
        </Stack>
    )
}
