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
        navigate("../")
        props.onAuth(state.email.value, state.password.value);
    }

    const handleSignup = () => {
        navigate("../signup")
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

                <Typography component="h1" variant="h3" sx={{ mb: 2}}>SIGN IN</Typography>
                <Typography variant="subtitle" sx={{ mb: 2}}>Hello, welcome to Macro Tracker, Sign in and start tracking your macros!</Typography>

                <Form
                    formState={signinForm}
                    onSubmit={submitHandler}
                    onAuthStart={props.onAuthStart}
                    buttonTitle='SIGN IN'
                    loginFailed={props.error}
                />

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link sx={{ cursor: 'pointer' }} onClick={handleSignup} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

                <Link sx={{ mt: 4}} href="#" variant="body" underline="hover" color="black">
                    Terms and Conditions
                </Link>
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