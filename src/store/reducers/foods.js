import * as actions from '../actions/types';
import { convertQtysToMacros, getFoodKey, getCategory, updateItemInCategory, updateItemInWeek } from '../../shared/utility';

const initialState = {
    foodLists: {},
    foodBaseValues: {},
    foodCategories: {},
    foodWeekLists: {},
    error: false,
    loading: false,
    activeFood: '',
    activeDate: '',
    activePage: '',
    qtyOldValue: '',
}

const addQty = (state, foodId) => {
    console.log(foodId);
    const foodKey = getFoodKey(foodId), category = getCategory(foodId);
    const selectedFood = { ...state.foodCategories[category][foodKey] };

    selectedFood.qty +=  1;
    return {
        ...state,
        foodCategories: updateItemInCategory(state, category, foodKey, selectedFood),
        foodWeekLists: state.activePage === 'overview' ? 
            updateItemInWeek(state, category, foodKey, selectedFood) : state.foodWeekLists,
    }
};

const subQty = (state, foodId) => {
    const foodKey = getFoodKey(foodId), category = getCategory(foodId),
        selectedFood = { ...state.foodCategories[category][foodKey] };
    
    if (selectedFood.qty <= 1) return state;
    selectedFood.qty -= 1;
    return {
        ...state,
        foodCategories: updateItemInCategory(state, category, foodKey, selectedFood),
        foodWeekLists: state.activePage === 'overview' ? 
            updateItemInWeek(state, category, foodKey, selectedFood) : state.foodWeekLists,
    }
};

const changeQty = (state, foodId, newValue) => {
    const foodKey = getFoodKey(foodId), category = getCategory(foodId),
        selectedFood = { ...state.foodCategories[category][foodKey] };

    selectedFood.qty = newValue;
    return {
        ...state,
        foodCategories: {
            ...state.foodCategories,
            [category]: {
                ...state.foodCategories[category],
                [foodKey]: selectedFood
            }
        }
    };
};

const editQty = (state, foodId) => {
    const foodKey = getFoodKey(foodId), category = getCategory(foodId);
    let selectedFood = { ...state.foodCategories[category][foodKey] }, activeId = foodId; 

    if (foodId === state.activeFood) { //If saved and theres a value, * MUTATE QTY * 
        let inputToFloat = parseFloat(selectedFood.qty);
        if (!isNaN(inputToFloat) && parseFloat(selectedFood.qty) > 0) selectedFood.qty = inputToFloat;
        else selectedFood.qty = 1;
        activeId = '';
    }

    return {
        ...state,
        activeFood: activeId,
        foodCategories: updateItemInCategory(state, category, foodKey, selectedFood),
        foodWeekLists: state.activePage === 'overview' ? 
            updateItemInWeek(state, category, foodKey, selectedFood) : state.foodWeekLists,
    };
};

const setFoodCategories = (state, foodCategories, activeDate) => {

    let updatedCategories = null;
    if (foodCategories) updatedCategories = convertQtysToMacros(state.foodBaseValues, foodCategories);
    return {
        ...state,
        foodCategories: updatedCategories,
        activeDate,
    };
};

const setFoods = (state, foodCategories, activeCategory) => {
    let updatedCategories = {};
    if (foodCategories) updatedCategories = convertQtysToMacros(state.foodBaseValues, foodCategories);
    return {
        ...state,
        activePage: 'search',
        activeFood: '',
        foodLists: updatedCategories,
        foodCategories: {
            ...state.foodCategories,
            [activeCategory]: {
                ...state.foodBaseValues,
                ...updatedCategories[activeCategory],
            }
        },

    };
};

const updateFoods = (state, newList, category) => {

    let updatedList = newList, list = Object.keys(newList), foodsAdded = [];
    // get the added food to the searchList (foodCategories[category])
    if (state.foodLists[category]) foodsAdded = Object.keys(state.foodLists[category]);

    list.forEach( id => {
        if(foodsAdded.length > 0 && foodsAdded.indexOf(id) !== -1) 
            updatedList = { ...newList, [id]: state.foodLists[category][id]};
    });
    //console.log(updatedList[`-MAazf7AupcV_5oZmEaS`]);
    if (list.length < 1) updatedList = {};

    return {
        ...state,
        activeFood: '',
        foodCategories: {
            ...state.foodLists,
            [category]: updatedList,
        }
    };
};

const setFoodsWeek = (state, foodWeekLists) => {
    let updatedFoodWeekLists = {...foodWeekLists};
    Object.entries(foodWeekLists).forEach( ([date, category]) => {
        if(category) updatedFoodWeekLists = {
            ...updatedFoodWeekLists,
            [date]: convertQtysToMacros(state.foodBaseValues, foodWeekLists[date])
        };
    });

    return {
        ...state,
        foodWeekLists: updatedFoodWeekLists,
        activePage: 'overview',
    }
};


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SET_FOOD_BASEVALUES: return {...state, foodBaseValues: action.foodBaseValues};
        case actions.FETCH_BASEVALUES_FAILED: return {...state, error: action.error};
        case actions.SET_FOODS: return setFoods(state, action.foodCategories, action.activeCategory);
        case actions.FETCH_FOODS_FAILED: return { ...state, error: action.error };
        case actions.UPDATE_FOODS: return updateFoods(state, action.newList, action.category);
        case actions.SET_FOOD_CATEGORIES: return setFoodCategories(state, action.foodCategories, action.date);
        case actions.ADD_QTY: return addQty(state, action.foodId);
        case actions.SUB_QTY: return subQty(state, action.foodId);
        case actions.CHANGE_QTY: return changeQty(state, action.foodId, action.newValue);
        case actions.EDIT_QTY: return editQty(state, action.foodId);
        case actions.SET_FOODS_WEEK: return setFoodsWeek(state, action.foodWeekLists);
        default: return state;
    }

}

export default reducer;