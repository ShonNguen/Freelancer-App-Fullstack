import * as React from 'react';
import { Link } from 'react-router-dom';

import { Typography, AppBar, Box, Toolbar } from '@mui/material';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};


export default function Header() {
    return (
        <div>
            <AppBar position="fixed" sx={{ bgcolor: '#212121' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            color="common.white"
                            sx={{ fontSize: 24 }}
                        >
                            Freelance ArchViz
                        </Typography>
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

