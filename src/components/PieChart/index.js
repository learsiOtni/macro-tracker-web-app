import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {

    let size = "200px";
    if (props.size) size = props.size;
    console.log(props.macros);

    return (
        <div style={{width: size, height: size}}>
            { props.data ? 
                <Pie data={props.data} /> 
                :
                <p>Error: No Pie to show</p>
            }
        </div>
    )
}

export default PieChart;