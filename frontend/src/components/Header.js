import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userAuth';

import { Typography, AppBar, Box, Toolbar, Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

const buttons = {
    fontSize: 16,
    ml: 0,
    mr: 0,
    borderRadius: 6
}


export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <div>
            <AppBar position="fixed" sx={{ bgcolor: '#212121' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {user
                        ? <Box sx={{ flex: 1, display: 'flex' }} >
                            <Button variant='contained' sx={{ ...buttons, bgcolor: 'secondary.main', ml: 1, mr: 1 }}>
                                Dashboard
                            </Button>
                            <Button variant='contained' sx={{ ...buttons, bgcolor: 'white', color: '#212121', ml: 1, mr: 1 }}>
                                Jobs
                            </Button>
                        </Box>
                        : <Box sx={{ flex: 1 }} />
                    }
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            color="common.white"
                            sx={{ fontSize: 24 }}
                        >
                            Freelance ArchViz
                        </Typography>
                    </Link>
                    {user
                        ? <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button >
                                <AccountCircleIcon sx={{ fontSize: 30, color: 'white' }} />
                            </Button>
                            <Button>
                                <CircleNotificationsIcon sx={{ fontSize: 30, color: 'white' }} />
                            </Button>
                            <Link to='/' style={{ textDecoration: 'none' }} onClick={handleLogout}>
                                <Button variant="contained" sx={{ ...buttons, bgcolor: 'secondary.main' }}>
                                    Logout
                                </Button>
                            </Link>
                        </Box>

                        : <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
                                    sx={rightLink}
                                >
                                    Sign In
                                </Typography>
                            </Link>
                            <Link to='/register' style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="h6"
                                    sx={{ ...rightLink, color: 'secondary.main' }}
                                >
                                    Sign up
                                </Typography>
                            </Link>
                        </Box>

                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

