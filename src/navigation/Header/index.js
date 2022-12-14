import React from 'react';
//import { NavLink } from 'react-router-dom';
import { 
    Typography, Box, Link, 
    Toolbar, styled, AppBar as MuiAppBar  
} from '@mui/material'

import Links from '../Links';


const AppBar = styled(MuiAppBar, {
    //shouldForwardProp: (prop) => prop !== 'open',
})(({theme}) => ({
    
}));

const Header = (props) => {
    return (
        <Box>
            <header className="header">
                <AppBar>
                    <Toolbar color="secondary">
                        <Link sx={{ cursor: 'pointer' }} href="/"> {/** NavLink */}
                            <Typography variant="h6" color="white">MACRO TRACKER</Typography>
                        </Link>

                        <Typography variant="subtitle2" sx={{ ml: 2 }}>helping you track your macros!</Typography>
                    </Toolbar>
                </AppBar>
            </header>
        </Box>
    )
}

export default Header;