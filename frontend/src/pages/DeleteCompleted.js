import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Box, Avatar, Typography, Button } from '@mui/material';
//icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function DeleteCompleted() {
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
                Successfully Deleted Job!
            </Typography>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ width: 240, mt: 3, mb: 1 }}
                >
                    Back To Profile
                </Button>
            </Link>
        </Box>
    )
}
