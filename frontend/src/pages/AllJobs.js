import React from 'react';
import Header from '../components/Header';
import AppFooter from '../components/Footer';

import { Box } from '@mui/material';
import TabPanAllJobs from '../components/TabPanAllJobs';

export default function AllJobs() {
    return (
        <Box>
            <Header />
            <TabPanAllJobs />
            <AppFooter />
        </Box>
    )
}
