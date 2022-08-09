import React, { Component } from 'react';
import axios from '../../axios/axios-foods';
import { Box, Typography, Container, Divider } from '@mui/material'
import { connect } from 'react-redux';
import { initFoodCategories, initFoodsWeek, updateMacros } from '../../store/actions';

import { formatDate, convertMacrosToQtys, getCategory, getFoodKey } from '../../shared/utility';
import { MacrosModal } from '../../components';
import DayPanels from './DayPanels';

class Overview extends Component {

    constructor(props) {
        super(props);
        this.qtyInputRef = React.createRef();
        this.state = {
            week: [],
            activeModal: '', //date
            inEditMode: false,
            openMacros: false,
        };
    }

    componentDidMount() {
        this.getStateFromFirebase();
    }

    componentDidUpdate() {
        const selectedInput = this.qtyInputRef.current;
        if (selectedInput) { selectedInput.focus(); selectedInput.value = ''; };
    };

    getStateFromFirebase = () => {
        const currentDate = new Date();
        //console.log(currentDate);
        let monday, week = [];
        for (let i = 1; i <= 7; i++) {
            if (currentDate.getDay() === 1) { monday = currentDate; break; }
            currentDate.setDate(currentDate.getDate() - 1);
            
        };
        // MAKE AN ARRAY OF WEEK starting with monday 
        for (let i = 0; i < 7; i++) {
            week = [...week, formatDate(monday)];
            monday.setDate(monday.getDate() + 1);
        }
        //console.log(week);

        week.length > 0 && this.initWeekHandler(week);
        // format : 2020-06-08 to match firebase db date ids
        this.setState({ ...this.state, week });
    }
    
    initWeekHandler = (week = []) => {
        const { userId, token } = this.props;
        if (week.length <= 0) week = this.state.week;

        this.props.initFoodsWeek(userId, token, week);
    };

    modalHandler = (date) => {
        this.props.initFoodCategories(this.props.userId, this.props.token, date);
        this.initWeekHandler();

        if (date === this.state.activeModal)
            this.setState({ ...this.state, activeModal: '', inEditMode: false, });
        else
            this.setState({ ...this.state, activeModal: date, inEditMode: false });
        
    }

    editModeHandler = () => {
        let activeModal = this.state.activeModal;
        if (this.state.inEditMode) { //If SAVED pressed
            //console.log(this.props.foodWeekLists[activeModal]);
            let url = `users/${this.props.userId}/dates/${activeModal}.json?auth=${this.props.token}`,
                foodCategories = this.props.foodWeekLists[activeModal],
                updatedData = {},
                currentCategories = this.props.foodCategories;
            
 /***********/ // IF in Edit Mode, but no changes has been made, dont put to DB 
            // 
            // Psuedo
            // Check old values with latest values
            //  If they are the same 
            /*
            data1 = {firstName: 'John', lastName: 'Smith'};
            data2 = {firstName: 'Jane', lastName: 'Smith'};
            JSON.stringify(data1) === JSON.stringify(data2)*/
            // Then dont run the axios request,
            // If they are not, then run and add changes to DB

            // transform foodCategory to just have qty: number
            if(foodCategories) {
                updatedData = convertMacrosToQtys(foodCategories);

                axios.put(url, updatedData)
                .then( response => {
                    this.initWeekHandler();
                    alert('Added to DB');
                })
                .catch( error => {
                    console.log(error)
                });
            } 
            activeModal = '';
        };

        this.setState({
            ...this.state,
            inEditMode: !this.state.inEditMode,
            activeModal: activeModal,
        });
    };


    onRemoveItem = (foodId) => {

        const selectedDate = this.state.activeModal, 
            category = getCategory(foodId), foodKey = getFoodKey(foodId);

        axios.delete(`users/${this.props.userId}/dates/${selectedDate}/${category}/${foodKey}.json?auth=${this.props.token}`)
            .then(response => {
                // update category
                this.props.initFoodCategories(this.props.userId, this.props.token, selectedDate);
                this.initWeekHandler();
                alert('DELETED');
            })
            .catch(error => {
                console.log(error);
            });
    };

    onSubmitMacros = (newEntry) => {
        this.props.updateMacros(this.props.userId, this.props.token, newEntry);
    };
    

    render() {
        return (
            <Box component="main" sx={{ marginLeft: '250px', p: 4, mt: 8 }}>

                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="h6" variant="h4">Weekly Overview</Typography>
                    <MacrosModal 
                        macros={this.props.macros} 
                        onSubmit={this.onSubmitMacros} 
                        variant="outlined" 
                        color="secondary"
                    />
                </Box>

                {this.props.foodWeekLists && <DayPanels
                    week={this.state.week}
                    foodWeekLists={this.props.foodWeekLists}
                    activeModal={this.state.activeModal}
                    openModal={this.modalHandler}
                    qtyInputRef={this.qtyInputRef}
                    editMode={this.editModeHandler}
                    inEditMode={this.state.inEditMode}
                    onRemoveItem={this.onRemoveItem}
                />}
            </Box>
        );
    };
};

const mapStateToProps = state => {
    return {
        foodWeekLists: state.foods.foodWeekLists,
        activeDate: state.foods.activeDate,
        foodCategories: state.foods.foodCategories,
        userId: state.auth.userId,
        token: state.auth.token,
        macros: state.macros.macros,
    };
};

const mapDispatchToProps = { initFoodCategories, initFoodsWeek, updateMacros };

export default connect(mapStateToProps, mapDispatchToProps)(Overview);