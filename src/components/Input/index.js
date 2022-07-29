import React from 'react';
import TextField from '@mui/material/TextField';

const Input = (props) => {

    let input;
    const inputClasses = ["input-element"];
    if (!props.isValid) inputClasses.push("input-invalid");

    switch (props.inputType) {
        case('input'):
            input = <TextField 
                {...props.config}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onClick={props.onClick}
                ref={props.isActive ? props.inputRef : null}
                id={props.errorMessage ? "filled-error-helper-text": props.id}
                label={props.errorMessage ? "Error" : props.config.label}
                helperText={props.errorMessage ? props.errorMessage : ''}
                error={props.errorMessage ? true : false}
                name={props.name}
                fullWidth={props.fullWidth}
                margin={props.margin}
            />
            break;
        case ('select'):
            input = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {
                        props.config.options && props.config.options.map( option => (
                            <option value={option.value} key={option.value}>
                                {option.display}
                            </option>
                        ))
                    }
                </select>
            )
            break;
        default:
            input = <input 
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onClick={props.onClick}
                ref={props.isActive ? props.inputRef : null}
            />;
    }

    return input;

    /*return (
        <div className="input">
            <label className="input-label">{props.label}</label>
            <div className="input-error">{props.errorMessage}</div>
            {input}
        </div>
    )*/

}

export default Input;