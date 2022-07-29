import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

//import Link from './Link.js';

const Links = (props) => {

    const handleSignout = () => {
        props.onAuthLogout();
    }

    

    /*return (
        <nav className="links">
            <ul>
                <Link to="/overview" icon="calendar-week" exact="true">Overview</Link>
                <Link to="/search" icon="search" exact="true">Search</Link>
                <Link to="/account" icon="user-circle" exact="true">Account</Link>

                <div className="links-divider" />

                <Link to="/settings" icon="cog" exact="true">Settings</Link>
                <Link to="signin" icon="sign-out-alt" exact="true" onClick={handleSignout}>Sign out</Link>
            </ul>
        </nav>
    )*/

    return (
        <List 
            component="nav"
            sx={{

            }}
        >
            <ListItemButton component="a" href="/overview">
                <ListItemIcon><CalendarViewWeekIcon/></ListItemIcon>
                <ListItemText primary="Overview" />
            </ListItemButton>

            <ListItemButton component="a" href="/search">
                <ListItemIcon><SearchIcon/></ListItemIcon>
                <ListItemText primary="Search" />
            </ListItemButton>

            <ListItemButton component="a" href="/account">
                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>

            <Divider sx={{mt: 10, mb: 2}}/>

            <ListItemButton component="a" href="/settings">
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton component="a" onClick={handleSignout} href="/signin">
                <ListItemIcon>
                    <PersonRemoveIcon/>
                </ListItemIcon>

                <ListItemText primary="Sign out" />
            </ListItemButton>
        </List>
    )
}

const mapDispatchToProps = dispatch => ({
    onAuthLogout: () => dispatch( authLogout() )
})

export default connect(null, mapDispatchToProps)(Links);