import React from 'react';
import { connect } from 'react-redux';
import { 
    Typography, 
    Container, 
    Box,
    Grid,
    Link,
    Avatar,
} from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';

import { auth, authStart } from '../../store/actions';
import { Form } from '../../components';
import { signinForm } from './signinForm';


const Signin = (props) => {

    let navigate = useNavigate();

    const submitHandler = (state) => {
        props.onAuth(state.email.value, state.password.value);
        if(props.token) navigate("../", { replace: 'true'})
    }

    const handleSignup = () => {
        navigate("../signup", { replace: 'true'})
    }

    
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                    <AssignmentTurnedInIcon />
                </Avatar>  
                
                <Typography component="h1" variant="h4" color="primary" sx={{mb: 2}}>MACRO TRACKER</Typography>
                <Typography variant="subtitle" sx={{ mb: 1}}>Hello, welcome to Macro Tracker, Sign in and start tracking your macros!</Typography>

                <Form
                    formState={signinForm}
                    onSubmit={submitHandler}
                    onAuthStart={props.onAuthStart}
                    buttonTitle='SIGN IN'
                    loginFailed={props.error}
                />

                <Grid container direction="column" sx={{mt: -1}}>
                    <Grid item xs={12} sx={{alignSelf: 'flex-end'}}>
                        <Link sx={{ cursor: 'pointer' }} onClick={handleSignup} variant="body">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>

                    <Grid item container direction="row" justifyContent="space-between" xs={12} sx={{ mt: 4 }}>

                        <Grid item>
                            <Link href="#" variant="body2" underline="hover" color="text.primary">Forgot password?</Link>
                        </Grid>

                        <Grid item>
                            <Link href="#" variant="body2" underline="hover" color="text.primary">Terms and Conditions</Link>
                        </Grid>

                    </Grid>
                </Grid>

            </Box>
        </Container>
    )

};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch( auth(email, pass) ),
        onAuthStart: () => dispatch( authStart() ),
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Signin);