import React, { useState,useEffect,useContext } from "react";

import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const Piechart=({data})=> {
      useEffect(() => {
        console.log('Props Data: ',data);
    },[]);

  return (
    <>
    <div>  
        {
            data?
            <Pie
            data={data}
            options={{
                title: {
                display: true,
                text: 'Class Strength',
                fontSize: 20,
                },
                legend: {
                display: true,
                position: 'right',
                },
            }}
            />:''
        }
      </div>      
    </>
  )
}

export default Piechart