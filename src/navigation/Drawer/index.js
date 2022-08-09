import React, { useState } from 'react';
import { Drawer as MuiDrawer, Toolbar, IconButton, styled, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Links from '../Links';


const drawerWidth = 250;

const DrawerNav = styled(MuiDrawer, {
    shouldForwardProp: prop => prop!== 'open'
})(({ theme, open }) => ({
    display: !open && "none",
    '& .MuiDrawer-paper': {
        display: 'inline-block',
        position: 'fixed',
        whiteSpace: 'noWrap',
        width: drawerWidth,
        boxSizing: 'border-box',
        height: '100vh',
        zIndex: '100'
    }

}))

const Drawer = () => {
    const [open, setOpen] = useState(true);

    return (
        <DrawerNav variant="permanent" open={open}>
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