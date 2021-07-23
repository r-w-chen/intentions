import React from 'react'
import moment from 'moment';

export default function Calendar() {
    const date = moment();
    const startDay = date.clone().startOf("month"); //first day of THIS month
    const startOfWeek = date.clone().startOf("month").startOf('week'); //first day of the week from first day of this month
    console.log(startDay);
    console.log(startOfWeek)
    return (
        <div>
            
        </div>
    )
}
