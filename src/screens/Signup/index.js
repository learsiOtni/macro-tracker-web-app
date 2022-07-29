import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Avatar, Link } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import { signupForm } from './signupForm';
import { Form } from '../../components';
import * as actions from '../../store/actions';

const Signup = (props) => {


    const submitHandler = (state) => {
        const signupData = {name: state.name.value};
        props.onAuth(state.email.value, state.password.value, signupData);

    }
    
    let navigate = useNavigate();
    const handleSignin = () => {
        navigate('../signin');
    }



    return (
        <Container component="main" maxWidth="xs">

            <Box sx={{
                mt: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Avatar sx={{bgcolor: deepPurple[500] }}>MT</Avatar>

                <Typography component="h1" variant="h3" sx={{ mb: 2, mt: 2 }}>SIGN UP</Typography>
                <Typography variant="subtitle" sx={{ mb: 2 }}>Hello, welcome to Macro Tracker, Sign up and start tracking your macros!</Typography>

                <Form
                    formState={signupForm}
                    onSubmit={submitHandler}
                    onAuthStart={props.onAuthStart}
                    buttonTitle='SIGN UP'
                    loginFailed={props.error}
                />

                <Link sx={{ cursor: 'pointer' }} onClick={handleSignin}>Already have an account? Sign in</Link>
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
        onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup)),
        onAuthStart: () => dispatch(actions.authStart()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Signup);