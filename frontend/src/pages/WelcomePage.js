import React from 'react';

import ProductHero from '../components/ProductHero';
import Header from '../components/Header';
import ProductHowItWorks from '../components/ProductHowItWorks';
import AppFooter from '../components/Footer';

import { Box } from '@mui/material';

export default function WelcomePage() {
  return (
    <Box>
        <Header />
        <ProductHero />
        <ProductHowItWorks />
        <AppFooter />
    </Box>
  )
}
