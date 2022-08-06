export const macrosForm = {
    calories: {
        index: 1,
        id: "calories",
        inputType: 'input',
        config: {
            label: "Calories",
            type: 'number',
            placeholder: 'Calories',
            autoFocus: true,
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    protein: {
        index: 2,
        id: "protein",
        inputType: 'input',
        config: {
            label: "Protein",
            type: 'number',
            placeholder: 'Protein',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    carbs: {
        index: 3,
        id: "carbs",
        inputType: 'input',
        config: {
            label: "Carbs",
            type: 'number',
            placeholder: 'Carbs',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    fat: {
        index: 4,
        id: "fat",
        inputType: 'input',
        config: {
            label: "Fat",
            type: 'number',
            placeholder: 'Fat',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
};