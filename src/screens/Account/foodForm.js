export const foodForm = {
    name: {
        id: 1,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Food Name',
            name: 'name'
        },
        value: '',
        validation: {
            required: true,
            isString: true,
        },
        valid: true,
        isEditing: false,
    },
    unitValue: {
        id: 2,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'value'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
        isEditing: false,
    },
    unit: {
        id: 3,
        inputType: 'select',
        config: {
            options: [
                {value: 'g', display: 'grams'},
                {value: 'cup', display: 'cup'},
                {value: 'oz', display: 'ounce'},
                {value: 'piece', display: 'piece'},
                {value: 'slice', display: 'slice'},
                {value: 'tbsp', display: 'tablespoons'},
                {value: 'ml', display: 'milliliters'},
                {value: 'pack', display: 'pack'},
                {value: 'can', display: 'can'},
            ]
        },
        value: 'g',
        validation: {},
        valid: true,
    },
    calories: {
        id: 4,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'calories'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
        isEditing: false,
    },
    protein: {
        id: 5,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'protein'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
        isEditing: false,
    },
    carbs: {
        id: 6,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'carbs'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
        isEditing: false,
    },
    sugar: {
        id: 7,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'sugar'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    fat: {
        id: 8,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'fat'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
        isEditing: false,
    },
    saturates: {
        id: 9,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'saturates'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    unsaturated: {
        id: 10,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'unsaturated'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    fibre: {
        id: 11,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'fibre'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    salt: {
        id: 12,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'salt'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    cholesterol: {
        id: 13,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'cholesterol'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    potassium: {
        id: 14,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'potassium'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
}