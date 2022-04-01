import * as React from 'react';
import Find from '../img/FindJob.png';
import Hire from '../img/Hire.png';
import Register from '../img/Register.png';


import { Box, Grid, Container, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
};

const image = {
    height: 55,
    my: 4,
};

function ProductHowItWorks() {
    return (
        <Box
            component="section"
            sx={{ display: 'flex', bgcolor: '#d1c4e9', overflow: 'hidden' }}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Box
                                    component="img"
                                    src={Register}
                                    alt="register"
                                    sx={image}
                                />
                                <Typography variant="h6" align="center">
                                    Register on the site.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component="img"
                                    src={Find}
                                    alt="find"
                                    sx={image}
                                />
                                <Typography variant="h6" align="center">
                                    {'Find a suitable job/freelancer.'}
                                    {'Apply for the job/Contact the freelancer.'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component="img"
                                    src={Hire}
                                    alt="hire"
                                    sx={image}
                                />
                                <Typography variant="h6" align="center">
                                    {'Take your next dream project./Hire your freelancer.'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Link to='/register' style={{ textDecoration: 'none' }} >
                    <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        sx={{ mt: 8 }}
                    >
                        Get started
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;