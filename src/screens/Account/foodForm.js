export const foodForm = {
    name: {
        index: 1,
        id: 'name',
        name: 'name',
        inputType: 'input',
        config: {
            label: 'name',
            type: 'text',
            placeholder: 'Food Name',
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
        index: 2,
        id: 'unitValue',
        name: 'unitValue',
        inputType: 'input',
        config: {
            label: 'unit value',
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
        index: 3,
        id: 'unit',
        name: 'unit',
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
            ],
        },
        value: 'g',
        validation: {},
        valid: true,
    },
    calories: {
        index: 4,
        id: 'calories',
        name: 'calories',
        inputType: 'input',
        config: {
            label: 'calories',
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
        index: 5,
        id: 'protein',
        name: 'protein',
        inputType: 'input',
        config: {
            label: 'protein',
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
        index: 6,
        id: 'carbs',
        name: 'carbs',
        inputType: 'input',
        config: {
            label: 'carbs',
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
        index: 7,
        id: 'sugar',
        name: 'sugar',
        inputType: 'input',
        config: {
            label: 'sugar',
            type: 'text',
            placeholder: 'sugar'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    fat: {
        index: 8,
        id: 'fat',
        name: 'fat',
        inputType: 'input',
        config: {
            label: 'fat',
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
        index: 9,
        id: 'saturates',
        name: 'saturates',
        inputType: 'input',
        config: {
            label: 'saturates',
            type: 'text',
            placeholder: 'saturates'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    unsaturated: {
        index: 10,
        id: 'unsaturated',
        name: 'unsaturated',
        inputType: 'input',
        config: {
            label: 'unsaturated',
            type: 'text',
            placeholder: 'unsaturated'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    fibre: {
        index: 11,
        id: 'fibre',
        name: 'fibre',
        inputType: 'input',
        config: {
            label: 'fibre',
            type: 'text',
            placeholder: 'fibre'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    salt: {
        index: 12,
        id: 'salt',
        name: 'salt',
        inputType: 'input',
        config: {
            label: 'salt',
            type: 'text',
            placeholder: 'salt'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    cholesterol: {
        index: 13,
        id: 'cholesterol',
        name: 'cholesterol',
        inputType: 'input',
        config: {
            label: 'cholesterol',
            type: 'text',
            placeholder: 'cholesterol'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
    potassium: {
        index: 14,
        id: 'potassium',
        name: 'potassium',
        inputType: 'input',
        config: {
            label: 'potassium',
            type: 'text',
            placeholder: 'potassium'
        },
        value: '',
        validation: {},
        valid: true,
        isEditing: false,
    },
}