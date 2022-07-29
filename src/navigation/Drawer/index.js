import React from 'react';
import { Drawer as MuiDrawer, Toolbar, IconButton, styled, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Links from '../Links';


const drawerWidth = 250;

const DrawerNav = styled(MuiDrawer, {

})(({ theme }) => ({
    '& .MuiDrawer-paper': {
        position: 'fixed',
        whiteSpace: 'noWrap',
        width: drawerWidth,
        boxSizing: 'border-box',
        height: '100vh',
        zIndex: '100'
    }

}))

const Drawer = () => {
    return (
        <DrawerNav variant="permanent" open>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1]
                }}
            >
                <IconButton onClick={() => { }}>
                    <ChevronLeftIcon />
                    <Typography variant="subtitle2">Close</Typography>
                </IconButton>
            </Toolbar>

            <Links />
        </DrawerNav>
    )
}

export default Drawer;