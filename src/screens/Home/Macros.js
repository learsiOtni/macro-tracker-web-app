import React from 'react';
import { connect } from 'react-redux';
import { updateMacros } from '../../store/actions';

import { Typography, Container, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import EditIcon from '@mui/icons-material/Edit';

import { MacrosModal } from '../../components'

const macrosData = {
    calories: {
        title: 'Calories',
        icon: <ElectricBoltIcon />
    }, 
    protein: {
        title: 'Protein',
        icon: <KebabDiningIcon />
    },
    carbs: {
        title: 'Carbs',
        icon: <BreakfastDiningIcon />
    }, 
    fat: {
        title: 'Fat',
        icon: <IcecreamIcon />
    }, 
}

const MacroInfo = styled('div')({
    textAlign: 'center',
    flexGrow: 1,
})


const Macros = (props) => {
    const macrosSubmitHandler = (newEntry) => {
        props.updateMacros(props.userId, props.token, newEntry);
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mt: 3, mb: 4 }}>
                <Typography variant="h4">Your Macro</Typography>
                
                <MacrosModal macros={props.macros} onSubmit={macrosSubmitHandler}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </MacrosModal>
            </Box>
            

            <Box sx={{ display: 'flex', alignItems: "center"}}>

                { props.macros && Object.values(macrosData).map( macro => (
                    <MacroInfo key={macro.title}>
                        <div style={{opacity: "0.8"}}>{macro.icon}</div>
                        <Typography variant="subtitle2">{macro.title}</Typography>
                        <Typography variant="h6">{props.macros[macro.title.toLowerCase()]}</Typography>
                    </MacroInfo>
                ))}
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        macros: state.macros.macros,
        userId: state.auth.userId,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateMacros: (userId, token, macros) => dispatch( updateMacros(userId, token, macros))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Macros);