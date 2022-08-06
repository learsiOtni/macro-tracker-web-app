import React from 'react';
import { Box, Grid, Button as MuiButton, styled, Typography, Card as MuiCard, Tooltip, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';

import { Dropdown, Macros } from '../../components';
import { capitalize } from '../../shared/utility';

const Button = styled(MuiButton, {})({

});

const CategoryHead = styled('div', {
    shouldFordwardProp: props => props !== "active"
})(({ theme, active }) => ({
    opacity: active && '0.8',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
    '&:hover': {
        opacity: '0.8'
    },
     
}))

const CategoryBody = styled(MuiCard, {
    shouldForwardProp: props => props !== "show"
})(({ show }) => ({
    display: show ? 'block' : 'none',
    position: show && 'absolute',
    backgroundColor: '#fff',
    zIndex: 50,
    padding: '20px',
    width: 'inherit'
}))


const categoriesData = ['breakfast', 'snacks', 'lunch', 'dinner'];

const Categories = (props) => {
    return (
        <Box sx={{ display: 'flex', width: '100%'}}>

            <Grid container>
                {categoriesData.map(category => {

                    let isActiveOption = false;
                    let label = <ArrowDropDownIcon />;
                    let optionsForDropdown = [];

                    if (props.activeCategory === category) {
                        //push active class
                        isActiveOption = true;
                        if (props.showDropdown) label = <ArrowDropUpIcon />;
                    }

                    const foods = props.categories[category];

                    /* Alter array to suit dropdown options*/
                    /*if (foods) optionsForDropdown = Object.entries(foods).map(
                        ([foodId, foodInfo]) => ({
                            ...optionsForDropdown,
                            id: foodId, name: foodInfo.name, qty: foodInfo.qty
                        })
                    );*/

                    if (foods) Object.entries(foods).forEach( 
                        ([foodId, foodInfo]) => (
                            optionsForDropdown.push({
                            id: foodId,
                            name: foodInfo.name,
                            qty: foodInfo.qty 
                        }))
                    );

                    return (
                        <Grid item xs={12} key={category} sx={{m:1, width: '100%', position: 'relative'}}>

                            <CategoryHead active={isActiveOption.toString()}>
                                <Button variant="text" onClick={props.clicked.bind(this, category)} sx={{ flex: 1}}>{capitalize(category)} - Items: {optionsForDropdown.length}</Button>
                                <Button variant="text" disabled={!isActiveOption} onClick={props.dropdownClicked}>{label}</Button>
                            </CategoryHead>

                            <CategoryBody show={props.showDropdown && isActiveOption}>
                                <div className="none" style={{ marginBottom: '20px'}}>
                                    <Macros foods={foods} macros={props.macros} />
                                </div>

                                <Divider sx={{mb: 2}}/>

                                {optionsForDropdown.length > 0 ? optionsForDropdown.map( (option, index) => (
                                    <div key={`${option.id}${index}`} style={{ display: 'flex', justifyContent: 'space-between'}}>
                                        <Typography variant="body1">{option.name} - ({option.qty})</Typography>
                                        <Tooltip title="Delete item" placement="left">
                                            <Button size="small" onClick={props.onRemoveItem.bind(this, option.id)}>
                                                <DeleteIcon />
                                            </Button>

                                        </Tooltip>
                                    </div>
                                )) :
                                    <Typography variant="subtitle2">It's empty, start adding your food now.</Typography>}
                            </CategoryBody>



                            {/*
                            <Dropdown
                                clicked={props.dropdownClicked}
                                show={props.showDropdown && isActiveOption}
                                disabled={!isActiveOption}
                                label={label}
                            >


                                <div className="none">
                                    <Macros foods={foods} macros={props.macros} />
                                </div>

                                {optionsForDropdown.length > 0 ? optionsForDropdown.map(option => (
                                    <div key={option.id} className="categ-item">
                                        <p>{option.name} - ({option.qty})</p>
                                        <button onClick={props.onRemoveItem.bind(this, option.id)}>Remove</button>
                                    </div>
                                )) :
                                    <p>Empty</p>}
                            </Dropdown>

                            <Button onClick={props.clicked.bind(this, category)}>
                                {category.toUpperCase()} - Items: {optionsForDropdown.length}
                            </Button>
                */}

                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Categories;