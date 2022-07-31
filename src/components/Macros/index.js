import React from 'react';
import { Typography, Box as MuiBox, styled } from '@mui/material'
import { getTotalMacrosDay, getTotalMacrosCategory } from '../../shared/utility';

const Box = styled(MuiBox)({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    textAlign: 'center',
});

const Div = styled('div', {
    shouldForwardProp: props => props !== 'flex'
})(({ flex }) => ({
    marginRight: '20px',
    display: flex && 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const Macros = (props) => {

    let macros = [], 
        totalMacros = {};

    if (props.macros) {
        macros = Object.keys(props.macros);
        if (props.showTotal) totalMacros = getTotalMacrosDay(props.foods, macros);
        else totalMacros = getTotalMacrosCategory(props.foods, macros);
    };

    return (
        <Box style={props.style}>
            {props.macros && ['calories', 'protein', 'carbs', 'fat'].map(item => (
                <Div key={item} flex={props.flex}>
                    
                    { props.flex ? 
                        <Typography variant="subtitle2" sx={{mr: 0.5}}>{`${item}:`}</Typography> 
                        : 
                        <Typography variant="subtitle2">{item}</Typography>
                    }

                    <Typography variant="h6">
                        { props.showTotal ? 
                            Math.round(props.showCalories ? totalMacros[item] : totalMacros[item] - props.macros[item])
                            :
                            Math.round(totalMacros[item])
                        }
                    </Typography>
                </Div>
            ))}
        </Box>
    )
};

export default Macros;