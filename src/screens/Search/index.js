import React, { Component } from 'react';
import axios from '../../axios/axios-foods';
import { connect } from 'react-redux';
import { Box, Button, Grid, Typography, Paper, Divider } from '@mui/material';

import { initFoods, updateFoods, updateMacros, addAlertMessage } from '../../store/actions';
import { ItemFields, SearchField, DatePicker } from '../../components'

import { formatDate, capitalize } from '../../shared/utility';
import Header from './Header.js';
import Categories from './Categories.js';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';

class Search extends Component {

    constructor(props) {
        super(props);
        this.qtyInputRef = React.createRef();
        this.state = {
            activeCategory: 'breakfast',
            selectedDate: formatDate(new Date()),
            showDropdown: false,
            showDate: false,
            search: '',
            filteredFoods: {},
            showModal: false,
            showFavs: false,
        }
    };

    componentDidMount() {
        //if (this.props.foodBaseValues) this.initFoodsHandler();
    };

    componentDidUpdate() {
        // codes for qty edit
        let selectedInput = null;
        if (this.qtyInputRef) selectedInput = this.qtyInputRef.current;
        if (selectedInput) { selectedInput.focus(); selectedInput.value = ''; }; 
    };

    // initialises the food list mostly for dates, or when search field is cleared.
    initFoodsHandler = (date = '') => {
        const { selectedDate, activeCategory, filteredFoods } = this.state;
        const { userId, token } = this.props;
        if (!date) date = selectedDate;

        this.props.initFoods(userId, token, date, activeCategory);
        if (this.state.showFavs || this.state.search) this.props.updateFoods(filteredFoods, activeCategory);
    };

    /* Categories */
    categoriesHandler = (category) => {
        let foods = this.state.filteredFoods;
        if (this.props.foodCategories[category] && !this.state.showFavs && !this.state.search) {
            foods = { ...foods, ...this.props.foodCategories[category] };
        }

        this.props.updateFoods(foods, category);

        this.setState({
            ...this.state,
            activeCategory: category,
            showDropdown: false,
            showDate: false
        });
    };

    categoriesToggle = () => this.setState({ ...this.state, showDropdown: !this.state.showDropdown, showDate: false });

    /* Database */
    onAddItem = (foodId) => {
        const { selectedDate, activeCategory } = this.state, 
            { userId, token, foodCategories } = this.props;
        
        let url = `users/${userId}/dates/${selectedDate}/${activeCategory}/${foodId}.json?auth=${token}`,
            qty = foodCategories[activeCategory][foodId].qty;

        axios.put(url, qty)
            .then(response => {
                this.initFoodsHandler(); //updates
                this.props.addAlertMessage({
                    id: `${foodId}-alert`,
                    title: "Success",
                    message: `Successfully added ${capitalize(this.props.foodBaseValues[foodId].name)}!`,
                    severity: 'success',
                    expiryTime: 2000
                })
            })
            .catch(error => {
                console.log(error)
            });

        this.setState({ ...this.state, showDropdown: false });
    };

    onRemoveItem = (foodId) => {
        const { selectedDate, activeCategory } = this.state, { userId, token } = this.props;
        axios.delete(`users/${userId}/dates/${selectedDate}/${activeCategory}/${foodId}.json?auth=${token}`)
            .then( response => {
                // update category
                this.initFoodsHandler();
                
                this.props.addAlertMessage({
                    id: `${foodId}-alert`,
                    title: "Success",
                    message: `Successfully deleted ${capitalize(this.props.foodBaseValues[foodId].name)}!`,
                    severity: 'success',
                    expiryTime: 2000
                })
            })
            .catch( error => {
                console.log(error);
            });

        this.setState({ ...this.state, showDropdown: false, showModal: false, showDate: false, search: '' });
    };  

    /* Date Component */
    dateSelected = selectedDate => {

        this.initFoodsHandler(selectedDate)
        this.setState({ ...this.state, selectedDate, showDropdown: false, 
            showDate: !this.state.showDate });
    };

    dateNextPrev = selectedDate => {
        
        this.initFoodsHandler(selectedDate)
        this.setState({ ...this.state, selectedDate, showDropdown: false });
    };

    dateToggled = () => this.setState({ ...this.state, showDate: !this.state.showDate});

    /* Search */
    searchHandler = (list) => {
        if (!this.state.showFavs) {
            !this.state.search ? this.initFoodsHandler() : this.props.updateFoods(list, this.state.activeCategory);
            this.setState({ ...this.state, filteredFoods: list, showFavs: false });
        }
    };

    searchChanged = (event) => {
        this.setState({ ...this.state, search: event.target.value, showFavs: false });
    };

    // Dashboard
    macrosSubmitted = (newEntry) => {
        this.props.updateMacros(this.props.userId, this.props.token, newEntry);
        this.setState({ ...this.state, showDate: false});
    };

    showFavsHandler = () => {
        let list = {};
        let showFavs = !this.state.showFavs;

        if (!this.state.showFavs && this.props.favs) {

            Object.entries(this.props.favs).forEach(([foodId, isFav]) => {
                if (isFav) {
                    list = { ...list, [foodId]: this.props.foodBaseValues[foodId] }
                }
            })

            // if theres a list in the database but all of them (thier isFav prop) are false
            if (!list) {
                list = this.props.foodBaseValues;
                showFavs = false;
            }
        } else {
            
            list = this.props.foodBaseValues;
        }

        this.props.updateFoods(list, this.state.activeCategory);

        this.setState({ ...this.state, search: '', filteredFoods: list, showFavs, showDate: false });
    }

    render() {

        /* FOODS for itemFields */
        let foods = {};

        // Re-load the previous fav or search
        // the state is stored in filteredFoods
        if (this.props.foodCategories) {
            foods = this.props.foodCategories[this.state.activeCategory]; //default data from database fetched from this.initFoodsHandler

            let tempFood = {};
            if (this.state.search || this.state.showFavs) {
                Object.keys(this.state.filteredFoods).forEach( (key) => {
                    tempFood = {
                        ...tempFood,
                        [key]: foods[key]
                    }
                });

                foods = tempFood;
            }
        }
        /* */

        return (
            <Box component="main" sx={{ marginLeft: '250px', p: 4, mt: 8 }}>

                <Grid container spacing={1}>

                    <Grid item xs={12} md={6} >
                        <Paper 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 3,
                            }}
                            elevation={1}
                        >
                            <Header
                                foodLists={this.props.foodLists}
                                macros={this.props.macros}
                                onSubmitMacros={this.macrosSubmitted}
                            />
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6} container>
                        <Paper 
                            sx={{ 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                p: 4,
                            }}
                            elevation={0}
                        >
                            <Grid item xs={12}>
                                <Typography component="p" variant="body2" gutterBottom>Select a date:</Typography>
                                <DatePicker
                                    showDate={this.state.showDate}
                                    onChange={this.dateSelected}
                                    onToggle={this.dateToggled}
                                    onNextPrev={this.dateNextPrev}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <Paper 
                                    sx={{ 
                                        mt: 16, 
                                        zIndex: 100, 
                                        backgroundColor: '#fff',
                                    }}
                                    elevation= {0}
                                >
                                    <Typography component="p" variant="body" gutterBottom>Choose a category and start adding:</Typography>
                                    <Categories
                                        categories={this.props.foodLists}
                                        clicked={this.categoriesHandler}
                                        activeCategory={this.state.activeCategory}
                                        showDropdown={this.state.showDropdown}
                                        dropdownClicked={this.categoriesToggle}
                                        onRemoveItem={this.onRemoveItem}
                                        macros={this.props.macros}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sx={{mt: 4}}>
                                <SearchField
                                    searchWord={this.state.search}
                                    data={this.props.foodBaseValues}
                                    returnList={this.searchHandler}
                                    onChange={this.searchChanged}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider light />

                <Box sx={{ display: 'flex', mt: 2, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{ my: 2, display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h5" >Current Category:</Typography>
                        <Typography color="secondary" variant="h4" sx={{ ml: 2}}>{capitalize(this.state.activeCategory)}</Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        startIcon={
                            this.state.showFavs ? <ClearIcon /> : <FavoriteIcon /> 
                        }
                        onClick={this.showFavsHandler}
                    >
                        { this.state.showFavs ? 'Clear Favorites' : 'Favorites' }
                    </Button>
                </Box>
                
                <ItemFields
                    items={foods}
                    inputRef={this.qtyInputRef}
                    onAddItem={this.onAddItem}
                    category={this.state.activeCategory}
                    showQtyControls
                />
            </Box>
        );
    };
};

const mapStateToProps = state => {
    const { auth, fav, foods, macros } = state;
    return {
        userId: auth.userId,
        token: auth.token,
        favs: fav.favs,
        foodBaseValues: foods.foodBaseValues,
        foodCategories: foods.foodCategories,
        foodLists: foods.foodLists,
        loading: foods.loading,
        macros: macros.macros,
    };
};

const mapDispatchToProps = { initFoods, updateFoods, updateMacros, addAlertMessage };
//dispatch => 
    /*return { /
        initFoods: (userId, token, date, catergory) => dispatch(actions.initFoods(userId, token, date, catergory)),
        //initCategories: (userId, token, date) => dispatch(actions.initFoodCategories(userId, token, date)),
        onUpdateFoods: (newFoods, category) => dispatch(actions.updateFoods(newFoods, category)),
        onAddQty: (foodId) => dispatch(actions.addQty(foodId)),
        onSubQty: (foodId) => dispatch(actions.subQty(foodId)),
        onChangeQty: (foodId, event) => dispatch(actions.changeQty(foodId, event.target.value)),
        onEditQty: (foodId, inputRef) => dispatch(actions.editQty(foodId, inputRef)),
        //onBlurQty: (foodId, inputRef) => dispatch(actions.blurQty(foodId, inputRef)),
        onAddRemoveFav: (userId, token, favId) => dispatch(actions.addRemoveFav(userId, token, favId)),
        onUpdateMacros: (userId, token, macros) => dispatch(actions.updateMacros(userId, token, macros)),
    };
};*/

export default connect(mapStateToProps, mapDispatchToProps)(Search);