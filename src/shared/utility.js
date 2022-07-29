export const checkValidity = (name, value, rules, secondValue = '') => {

    if (!rules) return false;
    const { required, minLength, maxLength, confirmPass } = rules;
    if (required && value.trim() === '') return {[name]: `${name} is Required!`};
    if (minLength && value.length < minLength) return {[name]: `should be at least ${minLength} characters!`};
    if (maxLength && value.length > maxLength) return {[name]: `should be ${maxLength} characters max!`};
    if (confirmPass && value !== secondValue) return {[name]: `password should match!`}
    if (rules.isString && !isString(value)) return {[name]: `must be a String!`};
    if (rules.isNumeric && !isNumeric(value)) return {[name]: `must be a Number!`};
    if (rules.isEmail && !isEmail(value)) return {[name]: `must be an Email!`};
    if (rules.isName && !isName(value)) return {[name]: `must be a Name!`};
    if (rules.isFloat && !isFloat(value)) return {[name]: `must be a Decimal Number!`};  
    return false;
};

export const isEmail = value => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(value);
}
export const isFloat = value => /^-?\d*[.,]?\d*$/.test(value);
export const isString = value => /^[a-zA-Z_]+( [a-zA-Z_]+)*$/.test(value);
export const isNumeric = value => /^\d+$/.test(value);
export const isName = value => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);


export const convertToTwoDigits = date => ('0' + date).slice(-2);

export const formatDate = date => `${date.getFullYear()}-${
    convertToTwoDigits(date.getMonth() + 1)}-${
    convertToTwoDigits(date.getDate())}`;


/* QTY */
export const updateItemByQty = (foodId, selectedFood, qty, baseFoodItem) => {

    if(isNaN(qty)) return selectedFood;
    const foodKeys = Object.keys(baseFoodItem[foodId]), updatedFood = { ...selectedFood };

    foodKeys.forEach( foodKey => {
        if (isNaN(selectedFood[foodKey]) || foodKey === 'id') return;
        updatedFood[foodKey] = baseFoodItem[foodId][foodKey] * qty;
    });

    return updatedFood;
}

export const convertDatasToFloat = datas => {
    Object.entries(datas).forEach( ([foodId, foodInfo]) => datas[foodId] = convertItemToFloat(foodInfo));
    return datas;
};

export const convertItemToFloat = foodInfo => {
    Object.entries(foodInfo).forEach(([key, value]) => { //calories: 200
        if (key === 'name' || key === 'isQtyEdit' || key === 'unit') return;
        else foodInfo[key] = parseFloat(value);
    });
    return foodInfo;
};

export const convertQtysToMacros = (foodBaseValues, foodCategories) => {
    // Convert Qty to real Macro values foodId: 3 => foodId: {calories: 20, protein: 10, ...}
    let updatedFoodCategories = {};
    Object.entries(foodCategories).forEach( ([category, foods]) => {
        Object.entries(foods).forEach( ([foodId, qty]) => {
            let food = { ...foodBaseValues[foodId] };

            updatedFoodCategories = {
                ...updatedFoodCategories,
                [category]: {
                    ...updatedFoodCategories[category],
                    [foodId]: updateItemByQty(foodId, food, qty, foodBaseValues)
                }
            };
        });
    });
    return updatedFoodCategories;
};

export const convertMacrosToQtys = (foodCategories) => {
    let updatedFoodCategories = {};
    // transform foodCategory to just have qty: number
    Object.entries(foodCategories).forEach(([category, foods]) => {
        Object.entries(foods).forEach(([foodId, foodInfo]) => {
            updatedFoodCategories = {
                ...updatedFoodCategories,
                [category]: {
                    ...updatedFoodCategories[category],
                    [foodId]: foodInfo.qty
                }
            };
        });
    });
    return updatedFoodCategories;
}

export const updateItemInCategory = (state, category, foodKey, selectedFood) => {
    return {
        ...state.foodCategories,
        [category]: {
            ...state.foodCategories[category],
            [foodKey]: updateItemByQty(foodKey, selectedFood, selectedFood.qty, state.foodBaseValues)
        }
    };
};

export const updateItemInWeek = (state, category, foodKey, selectedFood) => {
    return {
        ...state.foodWeekLists,
        [state.activeDate]: {
            ...state.foodWeekLists[state.activeDate],
            [category]: {
                ...state.foodWeekLists[state.activeDate][category],
                [foodKey]: updateItemByQty(foodKey, selectedFood, selectedFood.qty, state.foodBaseValues) 
            }
        }
    }
}

export const getFoodKey = id => id.split(' ')[1]; // lunch food1 => [lunch, food1]
export const getCategory = id => id.split(' ')[0]; // lunch food1 => [lunch, food1]

export const getTotalMacrosDay = (foodLists, macros) => {
    let totalMacros = {}, categories = []; 
    if (foodLists) categories = Object.keys(foodLists);
    if (categories.length <= 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    categories.forEach( category => {
        let totalCategory = getTotalMacrosCategory(foodLists[category], macros);

        macros.forEach( macro => {
            if (!totalMacros[macro]) totalMacros[macro] = 0;
            totalMacros = { ...totalMacros, [macro]: totalMacros[macro] += totalCategory[macro] };
        });
    });
    return totalMacros;
};

export const getTotalMacrosCategory = (foods, macros) => {
    let totalMacros = {}, foodsArray = [];
    if (foods) foodsArray = Object.values(foods);
    if (foodsArray.length <= 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    foodsArray.forEach(food => {
        macros.forEach(macro => {
            if (!totalMacros[macro]) totalMacros[macro] = 0;
            totalMacros = { ...totalMacros, [macro]: totalMacros[macro] += food[macro] };
        });
    });
    return totalMacros;
}


