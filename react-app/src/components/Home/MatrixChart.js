import React from 'react'


const data = {
    datasets: [{
      label: 'My Matrix',
      data: [
        {x: 1, y: 1, v: 11},
        {x: 2, y: 2, v: 22},
        {x: 3, y: 3, v: 33}
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      width: function(ctx) {
        var a = ctx.chart.chartArea;
        return (a.right - a.left) / 3.5;
      },
      height: function(ctx) {
        var a = ctx.chart.chartArea;
        return (a.bottom - a.top) / 3.5;
      }
    }]
  }

export default function MatrixChart() {
    return (
        // <Chart type='matrix' data={data}/>
        null
    )
}
