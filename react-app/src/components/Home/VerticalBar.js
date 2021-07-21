import React from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const fourWeeksAgo = `${moment().day(-28).format("MM-DD")} - ${moment().day(-22).format("MM-DD")}`
const threeWeeksAgo = `${moment().day(-21).format("MM-DD")} - ${moment().day(-15).format("MM-DD")}`
const twoWeeksAgo = `${moment().day(-14).format("MM-DD")} - ${moment().day(-8).format("MM-DD")}`
const oneWeeksAgo = `${moment().day(-7).format("MM-DD")} - ${moment().day(-1).format("MM-DD")}`
const thisWeek = `${moment().day(0).format("MM-DD")} - ${moment().day(6).format("MM-DD")}`


  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
/*
Grab all todo_sessions the start of the week and the end of the week for each week - will need to convert to milliseconds 
store all qualifying objects for each week in an array 
*/

const calculateWeeklyCompletions = (todos) => {
    const fourWeeksAgo = [];
    const range4w = [moment().day(-28).startOf('day').valueOf(), moment().day(-22).startOf('day').valueOf()]
    const threeWeeksAgo = [];
    const range3w = [moment().day(-21).startOf('day').valueOf(), moment().day(-15).startOf('day').valueOf()]
    const twoWeeksAgo = [];
    const range2w = [moment().day(-14).startOf('day').valueOf(), moment().day(-8).startOf('day').valueOf()]
    const oneWeekAgo = [];
    const range1w = [moment().day(-7).startOf('day').valueOf(), moment().day(-1).startOf('day').valueOf()]
    const thisWeek = [];
    const range0w = [moment().day(0).startOf('day').valueOf(), moment().day(6).startOf('day').valueOf()]
    const weeklyCompletion = []; // Holds completed ratio per week

    // Find which todos belong in which week
    for(let todo of todos){
        todo = JSON.parse(todo);
        const ms = moment(todo.date_scheduled).valueOf();
        if(ms >= range4w[0] && ms <= range4w[1]){
            fourWeeksAgo.push(todo);
        } else if (ms >= range3w[0] && ms <= range3w[1] ){
            threeWeeksAgo.push(todo);
        } else if (ms >= range2w[0] && ms <= range2w[1]){
            twoWeeksAgo.push(todo);
        } else if (ms >= range1w[0] && ms <= range1w[1]){
            oneWeekAgo.push(todo);
        } else if (ms >= range0w[0] && ms <= range0w[1]){
            thisWeek.push(todo);
        }
    }
    // See what proportion of todos in each week have been completed 
    for(let week of [fourWeeksAgo, threeWeeksAgo, twoWeeksAgo, oneWeekAgo, thisWeek]){
        /*
            Iterate through each week and count the number of completed todos are in that given week
            Calculate ratio of completed / total todos that week
            Add to weeklyCompletion array 
        */
        const ratio = week.reduce((completed, todo) => {
            if(todo.completed) return ++completed;
            else return completed;
        }, 0) / week.length
        weeklyCompletion.push(ratio);
    }

    return weeklyCompletion;
}

// [.99, .5, .4, .6, .7]
export default function VerticalBar() {

    // jsonifying the array so it can be checked for shallow equality - did this to prevent the graph from re-rendering more than needed
    const todos = useSelector(state => {
      let newTodos = []
      for(let id in state.todoSessions){
        let newObj = {}
        newObj['completed'] = state.todoSessions[id].completed;
        newObj['date_scheduled'] = state.todoSessions[id].date_scheduled;
        newTodos.push(JSON.stringify(newObj));
      }
      // console.log('new todos',newTodos);
      return newTodos;
    }, shallowEqual)

    
    const data = {
        labels:  [fourWeeksAgo, threeWeeksAgo, twoWeeksAgo, oneWeeksAgo, thisWeek], //represents each column
        datasets: [
          {
            label: 'Completion Rate By Week',
            data: todos.length ? calculateWeeklyCompletions(todos) : null,  
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return ( 
            <Bar  data={data} options={options}/>
    )
}
