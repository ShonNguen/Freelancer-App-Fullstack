import React from 'react';
import Header from '../components/Header';
import AppFooter from '../components/Footer';

import { Box } from '@mui/material';
import TabPanAllProjects from '../components/TabPanAllProjects';

export default function AllProjects() {
    return (
        <Box>
            <Header />
            <TabPanAllProjects />
            <AppFooter />
        </Box>
    )
}
