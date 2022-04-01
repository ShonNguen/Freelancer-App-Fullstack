import * as React from 'react';
import ProductHeroLayout from './ProductHeroLayout';
import { Link } from 'react-router-dom';

//material ui
import { Button, Typography } from '@mui/material';

const backgroundImage =
    'https://images.unsplash.com/photo-1646823705159-3d33f9ed1d34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80';

export default function ProductHero() {
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                Upgrade your Projects
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
            >
                Find the perfect freelancer or your next project here.
            </Typography>
            <Link to='/register' style={{ textDecoration: 'none' }}>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 200 }}
                >
                    Register
                </Button>
            </Link>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                Discover the experience
            </Typography>
        </ProductHeroLayout>
    );
}