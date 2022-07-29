import React from 'react';
import { Typography, Box, CardContent, styled,
    Avatar as MuiAvatar,
    Card as MuiCard
} from '@mui/material';

import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const goalsData = {
    water: {
        title: 'Water',
        value: 4,
        metric: 'Litres',
        desc: 'Ideal water intake',
        gradient: 'linear-gradient(#9EE7FB, #6975FF)',
        icon: <LocalDrinkIcon />
    },
    sleep: {
        title: 'Sleep',
        value: 7,
        metric: 'Hours',
        desc: 'Real sleep',
        gradient: 'linear-gradient(#98ED94, #00DA81)',
        icon: <HotelIcon />
    },
    steps: {
        title: 'Steps',
        value: 10000,
        metric: 'Steps',
        desc: 'Real step activity',
        gradient: 'linear-gradient(#C16AED, #7C56C9)',
        icon: <DirectionsWalkIcon />
    },
    workouts: {
        title: 'Workouts',
        value: 325,
        metric: 'Kcal',
        desc: 'Ideal activity',
        gradient: 'linear-gradient(#FFA776, #FF472E)',
        icon: <FitnessCenterIcon />
    }
};

const Card = styled(MuiCard, {})({
    width: 300,
    height: 380,
    marginRight: '20px',
    opacity: 0.9,
    border: 'none',
    color: '#FFFFFF'
});

const Avatar = styled(MuiAvatar, {})({
    backgroundColor: 'transparent',
    border: '1px solid white',
    marginTop: '40px',
    marginBottom: '24px',
    width: '60px',
    height: '60px'
});

const Goals = () => {
    return (

        <React.Fragment>
            <Typography variant="h4" gutterBottom>Your Goals</Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }} >

                { Object.values(goalsData).map(goal => (
                    <Card variant="outlined" sx={{backgroundImage: goal.gradient}} key={goal.title}>
                        <CardContent>
                            <Avatar>{goal.icon}</Avatar>

                            <Typography component="h4" variant="h6">{goal.title}</Typography>
                            <Typography variant="h3" sx={{mt: 2, mb: 2}}>{goal.value}</Typography>
                            <Typography variant="subtitle">{goal.metric}</Typography>
                            <Typography variant="subtitle2">{goal.desc}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </React.Fragment>
    )
}

export default Goals