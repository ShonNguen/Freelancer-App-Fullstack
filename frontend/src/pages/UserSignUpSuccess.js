import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Box, Avatar, Typography, Button } from '@mui/material';
//icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function UserSignUpSuccess({ setHasSignUp }) {
    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AssignmentTurnedInIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Successfully Sign Up!
            </Typography>
            <Link to='/log-in-form' style={{ textDecoration: 'none' }}>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ width: 240, mt: 3, mb: 1 }}
                    onClick={() => { setHasSignUp(false) }}
                >
                    Sign in
                </Button>
            </Link>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <Button
                    variant='contained'
                    sx={{ width: 240, mt: 1 }}
                    onClick={() => { setHasSignUp(false) }}
                >
                    Back to Home page
                </Button>
            </Link>
        </Box>
    )
}
