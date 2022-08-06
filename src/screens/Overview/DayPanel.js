import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ItemFields, Macros } from '../../components';
import * as actions from '../../store/actions';
import { styled, Typography, Button, Card, Avatar, CardHeader, CardContent, CardActions, Collapse, IconButton, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { capitalize } from '../../shared/utility';

const CardTitle = styled('div')({
    display: "flex", 
    cursor: 'pointer', 
    alignItems: 'center', 
    marginBottom: '10px',
    '&:hover': {
        color: 'purple'
    }
})

const ExpandMore = styled((props) => {
    const { expand, ...other} = props;
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    })
}));

const CategoryTitle = styled('div')(({theme}) => ({
    display: 'flex',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    padding: '10px',
    alignContent: 'center',

}))

//const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DayPanel = (props) => {
    /*let calories = 0, protein = 0, carbs = 0, fat = 0;

    props.foods && Object.values(props.foods).map(foods => {
        Object.values(foods).map(food => {
            calories += food.calories;
            protein += food.protein;
            carbs += food.carbs;
            fat += food.fat;
        });
    });*/

    return (
        <Card variant="outlined">
            
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[300]}}>
                        <CalendarTodayIcon />
                    </Avatar>
                }

                title={ 
                    <CardTitle onClick={props.openModal}>
                        <Typography component="h4" variant="h5">{new Date(props.date).toDateString().slice(0, 10) }</Typography>
                    </CardTitle>
                }
                subheader='Total Macros:'

                action={ 
                    props.activeModal && <Button onClick={props.editMode}>
                        <EditIcon />
                        {props.inEditMode ? 'SAVE CHANGES' : 'EDIT MODE'}
                    </Button>
                }
            />

            <CardContent>
                <Macros
                    macros={props.macros}
                    foods={props.foods}
                    showTotal
                    style={{ maxWidth: '250px' }}
                />
            </CardContent>

            <CardActions>
                <ExpandMore
                    expand={props.activeModal}
                    onClick={props.openModal}
                    aria-expanded={props.activeModal}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={props.activeModal} timeout="auto" unmountOnExit>
                <CardContent sx={{p: 0}}> 
                    {
                        (props.foodCategories && props.activeModal ) ? Object.entries(props.foodCategories).map(([category, foods]) => {
                            return (
                                <Box key={`${category}`} sx={{ mb: 3}}>
                                    <CategoryTitle>
                                        <Typography variant="h6" component="h5" sx={{mr: 2}}>{capitalize(category)}</Typography>
                                        <Macros
                                            macros={props.macros}
                                            foods={foods}
                                            flex
                                        />
                                    </CategoryTitle>

                                    <ItemFields
                                        items={foods}
                                        inputRef={props.qtyInputRef}
                                        onAddItem={() => { }}
                                        onRemoveItem={props.onRemoveItem}
                                        category={category}
                                        showQtyControls={props.inEditMode}
                                        showRemove
                                    />

                                </Box>
                            )
                        }) : (
                            <Typography variant="subtitle2">It is empty. Start adding food now.</Typography>
                        )
                    }
                </CardContent>
            </Collapse>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        foodLists: state.foods.foodLists,
        foodBaseValues: state.foods.foodBaseValues,
        foodCategories: state.foods.foodCategories,
        loading: state.foods.loading,
        activeFood: state.foods.activeFood,
        macros: state.macros.macros,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddQty: (foodId) => dispatch(actions.addQty(foodId)),
        onSubQty: (foodId) => dispatch(actions.subQty(foodId)),
        onChangeQty: (foodId, event) => dispatch(actions.changeQty(foodId, event.target.value)),
        onEditQty: (foodId, inputRef) => dispatch(actions.editQty(foodId, inputRef)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayPanel);