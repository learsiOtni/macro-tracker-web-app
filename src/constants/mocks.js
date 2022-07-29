export const foods = {
    food1: {
        id: 1,
        name: 'Peanut Butter',
        unit: 'g',
        unitValue: 20,
        calories: 119,
        protein: 5.3,
        carbs: 2.9,
        sugar: 1.2,
        fat: 9.6,
        saturates: 1.3,
        fibre: 1.5,
        salt: .10,
        qty: 1,
        isQtyEdit: false,
    },
    food2: {
        id: 2,
        name: 'Peas Frozen',
        unit: 'g',
        unitValue: 80,
        calories: 55,
        protein: 3.9,
        carbs: 6,
        sugar: 3.9,
        fat: 0.6,
        saturates: 0,
        fibre: 4.8,
        salt: 0,
        qty: 1,
        isQtyEdit: false,
    },
};

export const macroTarget = {
    calories: 2500,
    carbs: 300,
    protein: 150,
    fat: 60,
};

export const macroCurrent = {
    calories: 1200,
    carbs: 200,
    protein: 120,
    fat: 50,
};

export const mealCategories = {
    breakfast: [],
    snacks: [],
    lunch: [],
    dinner: [],
};

export const templateStorage = {
    breakfast: {
        peanut: {
            id: 1,
            calories: 200,
        }
    }
}

export const templateStorage2 = {
    breakfast: [
        {
            id: 1,
            name: "peanut butter",
            calories: 200,
        },
        {
            id: 2,
            name: "corgette",
            calories: 20,
        },
    ]
};

const user = {

    week1: {
        day1: {
            breakfast: [1, 2, 3, 10],
            lunch: {
    
            }
        },
        day2: {
    
        }
    }
};


export const mealsInitialState = {
    monday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    tuesday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    wednesday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    thursday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    friday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    saturday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    },
    sunday: {
        lunch: [],
        snack: [],
        breakfast: [],
        dinner: [],
    }
}