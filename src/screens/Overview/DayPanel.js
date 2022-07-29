import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ItemFields, Macros } from '../../components';
import * as actions from '../../store/actions';
import { styled, Typography, Button, Card, Avatar, CardHeader, CardContent, CardActions, Collapse, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CardTitle = styled('div')({
    display: "flex", 
    cursor: 'pointer', 
    alignItems: 'center', 
    marginBottom: '10px',
    '&:hover': {
        color: 'purple'
    }
})

const PanelBody = styled('div', {
    shouldForwardProp: props => props !== 'active'
})(({active}) => ({
    display: active ? 'block' : 'none',
}));

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

    console.log('DayPanel' + props.inEditMode);
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
                <CardContent>
                    {
                        props.foodCategories ? Object.entries(props.foodCategories).map(([category, foods]) => {
                            return (
                                <div key={`${category}`}>
                                    
                                    
                                    <div style={{ display: 'flex', backgroundColor: '#e5e5e5'}}>
                                        <Typography variant="h6" component="h5" sx={{mr: 2}}>{category.toUpperCase()}</Typography>
                                        <Macros
                                            macros={props.macros}
                                            foods={foods}
                                            flex
                                        />
                                    </div>

                                    <ItemFields
                                        items={foods}
                                        inputRef={props.qtyInputRef}
                                        onAddItem={() => { }}
                                        onRemoveItem={props.onRemoveItem}
                                        category={category}
                                        showQtyControls={props.inEditMode}
                                        showRemove
                                    />

                                    {props.inEditMode && <p>InEditMode {props.inEditMode}</p>}
                                </div>
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