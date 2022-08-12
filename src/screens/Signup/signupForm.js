export const signupForm = {
    name: {
        index: 1,
        id: "name",
        inputType: 'input',
        config: {
            label: "Name",
            type: "text",
            placeholder: 'Name',
            autoFocus: true,
        },
        value: '',
        validation: {
            required: true,
            isString: true,
        },
        valid: true,
    },
    email: {
        index: 2,
        id: "email",
        name: "email",
        inputType: 'input',
        config: {
            label: "Email Address",
            type: 'text',
            autoComplete: "email",
            placeholder: 'Email'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true,
        },
        valid: true,
    },
    password: {
        index: 3,
        id: "password",
        name: "password",
        inputType: 'input',
        config: {
            label: "Password",
            type: 'password',
            autoComplete: "current-password",
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 8,
        },
        valid: true,
    },
    confirmPass: {
        index: 4,
        id: "confirmPassword",
        name: "confirmPassword",
        inputType: 'input',
        config: {
            label: "Confirm Password",
            type: 'password',
            autoComplete: "current-password",
            placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 8,
            confirmPass: true,
        },
        valid: true,
    }
};