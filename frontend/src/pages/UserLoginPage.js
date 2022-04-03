import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../components/Footer';
import Header from '../components/Header';
import TabPanelsAdmin from '../components/TabPanelsAdmin';

export default function UserLoginPage() {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const dispatch = useDispatch();

    return (
        <Box>
            <Header />
            <TabPanelsAdmin /> 
            <AppFooter />
        </Box>
    )
}
