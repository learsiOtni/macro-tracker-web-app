import * as actions from './types';
import axios from '../../axios/axios-foods';
import { convertDatasToFloat } from '../../shared/utility';

export const setFoodBaseValues = (foodBaseValues) => ({ type: actions.SET_FOOD_BASEVALUES, foodBaseValues });
export const fetchBaseValuesFailed = (error) => ({ type: actions.FETCH_BASEVALUES_FAILED, error });

export const setFoods = (foodCategories, activeCategory) => 
    ({ type: actions.SET_FOODS, foodCategories, activeCategory});
export const fetchFoodsFailed = (error) => ({ type: actions.FETCH_FOODS_FAILED, error});
export const updateFoods = (newList, category) => ({ type: actions.UPDATE_FOODS, newList, category}); 

export const setFoodCategories = (foodCategories, date) => 
    ({ type: actions.SET_FOOD_CATEGORIES, foodCategories, date});
export const fetchCategoriesFailed = (error) => 
    ({type: actions.FETCH_CATEGORIES_FAILED, error});

// QTY CONTROLS
export const addQty = (foodId) => ({ type: actions.ADD_QTY, foodId});
export const subQty = (foodId) => ({ type: actions.SUB_QTY, foodId });
export const changeQty = (foodId, newValue) => ({ type: actions.CHANGE_QTY, foodId, newValue});
export const editQty  = (foodId) => ({ type: actions.EDIT_QTY, foodId});
// END OF QTY CONTROLS
    
export const addFood = (date, category, foodId, qty) =>
    ({ type: actions.ADD_FOOD, date, category, foodId, qty });

export const removeFood = (date, category, foodId) =>
    ({ type: actions.REMOVE_FOOD, date, category, foodId });

//FOOD WEEK LISTS
export const setFoodsWeek = (foodWeekLists) =>
    ({ type: actions.SET_FOODS_WEEK, foodWeekLists })

export const fetchWeekFailed = (error) => ({type: actions.FETCH_WEEK_FAILED, error })

//export const UPDATE_FOODS_WEEK = 'UPDATE_FOODS_WEEK';

//INITS
export const initFoodBaseValues = () => {
    return dispatch => {
        axios.get('foods.json')
            .then(response => {
                let foodBaseValues = convertDatasToFloat(response.data);
                dispatch(setFoodBaseValues(foodBaseValues));
            })
            .catch(error => {
                dispatch(fetchBaseValuesFailed(error));
            });
    };
};

export const initFoods = (userId, token, date, category) => {
    //Initialize foods for search page 
    return dispatch => {
        axios.get(`/users/${userId}/dates/${date}.json?auth=${token}`)
            .then(response => {
                dispatch(setFoods(response.data, category));
            })
            .catch(error => {
                dispatch(fetchFoodsFailed(error));
            });
    };
};

export const initFoodCategories = (userId, token, date) => {
    //Mostly used for overview page
    return dispatch => {
        axios.get(`/users/${userId}/dates/${date}.json?auth=${token}`)
            .then(response => {
                dispatch(setFoodCategories(response.data, date));
            })
            .catch(error => {
                dispatch(fetchCategoriesFailed(error));
            });
    };
};

export const initFoodsWeek = (userId, token, week = []) => {
    return dispatch => {
        let foodWeekLists = {}, weekPromises = [];
        for (let i = 0; i < week.length; i++) {
            weekPromises.push(
                axios.get(`/users/${userId}/dates/${week[i]}.json?auth=${token}`)
                    .then( response => {
                        foodWeekLists = {
                            ...foodWeekLists, 
                            [week[i]]: response.data
                        }
                    })
            );
        };

        Promise.all(weekPromises).then(() => {
            dispatch(setFoodsWeek(foodWeekLists));
        });
    };
};