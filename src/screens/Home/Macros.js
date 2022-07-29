import React from 'react';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import IcecreamIcon from '@mui/icons-material/Icecream';

const macrosData = {
    calories: {
        title: 'Calories',
        value: 3000,
        icon: <ElectricBoltIcon />
    }, 
    protein: {
        title: 'Protein',
        value: 180,
        icon: <KebabDiningIcon />
    },
    carbs: {
        title: 'Carbs',
        value: 400,
        icon: <BreakfastDiningIcon />
    }, 
    fat: {
        title: 'Fat',
        value: 90,
        icon: <IcecreamIcon />
    }, 
}

const MacroInfo = styled('div')({
    padding: 20,
    textAlign: 'center',
    flexGrow: 1,
})


const Macros = () => {
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 3 }}>Your Macro</Typography>

            <Container sx={{ display: 'flex', alignItems: "center" }}>

                { Object.values(macrosData).map( macro => (
                    <MacroInfo key={macro.title}>
                        {macro.icon}
                        <Typography variant="subtitle2">{macro.title}</Typography>
                        <Typography variant="h6">{macro.value}</Typography>
                    </MacroInfo>
                ))}

            </Container>
        </React.Fragment>
    )
}

export default Macros