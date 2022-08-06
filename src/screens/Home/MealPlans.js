import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from '../../components';
import { initFoodCategories } from '../../store/actions';
import { formatDate, capitalize } from '../../shared/utility';

import { Card, CardContent, CardMedia, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

import BREAKFAST1 from '../../assets/img/breakfast1.jpg';



const MealItem = styled('div')({
    display: 'flex',
    alignItems: 'center'
})

const MEALS_TITLE = ['breakfast', 'lunch', 'dinner', 'snacks'];

const MealPlans = (props) => {

    const [selectedDate, setSelectedDate] = useState( formatDate(new Date()) );

    useEffect( () => {
        props.initFoodCategories(props.userId, props.token, selectedDate);
    }, []);

    const dateHandler = selectedDate => {
        //initialise food with selected date
        props.initFoodCategories(props.userId, props.token, selectedDate);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5, p: 3}}>
                <div>
                    <Typography component="h2" variant="h4" gutterBottom>Your Meal Plan</Typography>
                    <Typography component="p" variant="body2">Here are your meal plans for today. Have a productive day!</Typography>
                </div>
                
                <DatePicker 
                    onNextPrev={dateHandler}
                />
            </Box>

            <Box sx={{
                    display: 'flex',
                    p: 4,
                    mb: 2
                }}
            >
                { MEALS_TITLE.map( title => (
                    <Card key={title} sx={{width: 300, minHeight: 200}} elevation={0}>
                        <CardContent>
                            <Typography component="h4" variant="h6">{capitalize(title)}</Typography>

                            <Divider sx={{ mb: 2}}/>

                            { props.foodCategories && props.foodCategories[title] ? Object.values(props.foodCategories[title]).map( (item) => (
                                <MealItem key={item.name} sx={{mb: 2}}>
                                    <NoteAltIcon sx={{fontSize: '12px', mr: 1}}/>
                                    <Typography variant="subtitle" sx={{mr: 1}}>{capitalize(item.name)}</Typography>
                                    <Typography variant="subtitle2">x{item.qty}</Typography>
                                </MealItem>
                            )) : <Typography>No items available!</Typography> }
                        </CardContent>
                    </Card>
                )) }
            </Box>

            <img src={BREAKFAST1} alt="breakfst image" height="350px" style={{ alignSelf: 'flex-end'}}/>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        foodCategories: state.foods.foodCategories,
        userId: state.auth.userId,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initFoodCategories: (userId, token, date) => dispatch( initFoodCategories(userId, token, date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealPlans);