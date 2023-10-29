import React, { useState,useEffect,useContext } from "react";

import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import axios from "axios";


import PieChart from './Piechart';

function AttendenceGraph() {
    const { schoolId,loginType,apiurl} = useContext(ContextData);
    
    const [chartData, setChartData] = useState({});
    const [isChart, setIsChart] = useState(false);
    const staticLabels = ["Check In", "Check Out", "Absent"]; // Static labels
    const [data, setData] = useState([]);
    const [chartState, setChartState] = useState({});

    useEffect(() => {
        console.log('sub Admin ID: ', schoolId);
        fetchData();
    }, [schoolId]);

     const fetchData = async () => {
        try {
            const response = await axios.get(`${apiurl}/api/Dashboard/attendenceData?schoolId=${schoolId}`);
            const apiData = response.data?.data;
            
            if (apiData.length > 0) {
                console.log('API Data---', apiData);
                setIsChart(true);

                const details = [
                    { label: 'Present Student', value: parseInt(apiData[0].totalStudent) },
                    { label: 'Check In Student', value: parseInt(apiData[1].presentCount) },
                    { label: 'Check Out Student', value: parseInt(apiData[1].checkoutCount) },
                ];

                setData(details);

                const chartData = {
                    labels: details.map(item => item.label),
                    datasets: [
                        {
                            label: 'Class Strength',
                            backgroundColor: [
                                'Indigo',
                                'Purple',
                                'Yellow',
                                'Teal',
                                'Red',
                                'Navy',
                                'Brown',
                            ],
                            data: details.map(item => item.value),
                        },
                    ],
                };
                setChartState(chartData);
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <>
        {
            isChart?<PieChart data={chartState} />:''
        }
        
    </>
  )
}

export default AttendenceGraph