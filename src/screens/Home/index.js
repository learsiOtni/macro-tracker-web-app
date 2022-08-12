import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

import Hello from './Hello';
import Goals from './Goals';
import Macros from './Macros';
import MealPlans from './MealPlans';


class Home extends Component {

    render() {
        
        return (
            <Box component="main" sx={{ marginLeft: '250px', p: 4, mt: 8 }}>
                {!this.props.token && <Navigate to='/signin' />}

                <Grid container spacing={3}>

                    <Grid item xs={4}>
                        <Paper sx={{ p: 3, height: 250 }}>
                            <Hello />
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper sx={{ p: 3, height: 250 }}>
                            <Macros />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 2 }}>
                            <Goals />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <MealPlans />
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        );
    };
};

const mapStateToProps = state => ({ 
    token: state.auth.token,

});

const mapDispatchToProps = dispatch =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps) (Home);