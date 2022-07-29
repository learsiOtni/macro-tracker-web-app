import React from 'react';
import { Typography, Box } from '@mui/material'
import { Macros, MacrosModal, PieChart } from '../../components';


const Header = (props) => {
    let hasMacros = true;
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let calories = 0;
    
    if (props.macros) {
        Object.values(props.macros).forEach(value => {
            if (value <= 0) hasMacros = false;
        });

        protein = props.macros.protein;
        fat = props.macros.fat;
        carbs = props.macros.carbs;
        calories = props.macros.calories;
    }

    const pieChartData = {
        labels: [`${protein} protein`, `${fat} fat`, `${carbs} carbs`],
        datasets: [{
            data: [protein, fat, carbs],
            backgroundColor: ["#003f5c", "#58508d", "#bc5090"],
        }]
    }

    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="h6">Macros needed:</Typography>
            <Typography variant="subtitle2">{calories} calories</Typography>

            <PieChart
                size="300px"
                data={pieChartData}
            />

            <Typography variant="h6" sx={{ mt: 2}} >Current:</Typography>
            <Macros
                macros={props.macros}
                foods={props.foodLists}
                showTotal
                showCalories
            />


            <MacrosModal macros={props.macros} onSubmit={props.onSubmitMacros} />

            <p>Choose a category and start adding!</p>
        </Box>
    )
}

export default Header