import React from 'react';
import { Box, Grid, Button as MuiButton, styled, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Dropdown, Macros } from '../../components';

const Button = styled(MuiButton, {})({

});

const CategoryHead = styled('div', {
    shouldFordwardProp: props => props !== "active"
})(({ active }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: active && '#ffe'
}))

const CategoryBody = styled('div', {
    shouldForwardProp: props => props !== "show"

})(({ show }) => ({
    display: show ? 'block' : 'none',
    position: show && 'absolute',
    backgroundColor: '#fff',
    padding: '10px',
    width: '400px',
}))


const categoriesData = ['breakfast', 'snacks', 'lunch', 'dinner'];

const Categories = (props) => {
    return (
        <Box sx={{ display: 'flex' }}>

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
                    if (foods) optionsForDropdown = Object.entries(foods).map(
                        ([foodId, foodInfo]) => ({
                            ...optionsForDropdown,
                            id: foodId, name: foodInfo.name, qty: foodInfo.qty
                        })
                    );

                    return (
                        <Grid item xs={12} md={6} lg={3} key={category}>

                            <CategoryHead active={isActiveOption}>
                                <Button onClick={props.clicked.bind(this, category)} sx={{ flex: 1 }}>{category.toUpperCase()} - Items: {optionsForDropdown.length}</Button>
                                <Button disabled={!isActiveOption} onClick={props.dropdownClicked}>{label}</Button>
                            </CategoryHead>

                            <CategoryBody show={props.showDropdown && isActiveOption}>

                                <div className="none">
                                    <Macros foods={foods} macros={props.macros} />
                                </div>

                                {optionsForDropdown.length > 0 ? optionsForDropdown.map(option => (
                                    <div key={option.id} style={{ display: 'flex' }}>
                                        <Typography variant="body1">{option.name} - ({option.qty})</Typography>
                                        <Button size="small" onClick={props.onRemoveItem.bind(this, option.id)}>Remove</Button>
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