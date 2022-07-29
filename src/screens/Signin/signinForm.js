export const signinForm = {
              
    email: {
        index: 1,
        id: "email",
        name: "email",
        inputType: 'input',
        config: {
            label: "Email Address",
            type: 'text',
            autoComplete: "email",
            autoFocus: true
        },
        value: '',
        validation: {
            required: true,
            isEmail: true,
        },
        valid: true,
    },
    password: {
        index: 2,
        id: "password",
        name: "password",
        inputType: 'input',
        config: {
            label: "Password",
            type: 'password',
            autoComplete: "current-password"
        },
        value: '',
        validation: {
            required: true,
            minLength: 8,
        },
        valid: true,
    }
};