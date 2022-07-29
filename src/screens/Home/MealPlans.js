import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const mealsData = {
    breakfast: {
        title: "Breakfast",
        items: [
            {item: "Bread", qty: 2},
            {item: "Egg", qty: 3},
        ]
    },
    lunch: {
        title: "Lunch",
        items: [
            {item: "Bread", qty: 2},
            {item: "Egg", qty: 3},
        ]
    },
    dinner: {
        title: "Dinner",
        items: [
            {item: "Bread", qty: 2},
            {item: "Egg", qty: 3},
        ]
    },
    snacks: {
        title: "Snacks",
        items: [
            {item: "Bread", qty: 2},
            {item: "Egg", qty: 3},
        ]
    },
};

const MealItem = styled('div')({
    display: 'flex',
    alignItems: 'center'
})

const MealPlans = () => {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h4" gutterBottom>Your Meal Plan</Typography>

            <Box sx={{
                    display: 'flex',
                }}
            >
                { Object.values(mealsData).map( meal => (
                    <Card variant="outlined" key={meal.title} sx={{width: 300, height: 380, ml: 2}}>
                        <CardContent>
                            <Typography component="h4" variant="h5" gutterBottom sx={{borderBottom: '0.5px solid grey'}}>{meal.title}</Typography>

                            { meal.items.map( ({item, qty}) => (
                                <MealItem key={item} sx={{mb: 2}}>
                                    <Typography variant="subtitle" sx={{mr: 2}}>{item}</Typography>
                                    <Typography variant="subtitle2">x{qty}</Typography>
                                </MealItem>
                            ))}
                        </CardContent>
                    </Card>
                )) }
            </Box>

        </React.Fragment>
    )
}

export default MealPlans