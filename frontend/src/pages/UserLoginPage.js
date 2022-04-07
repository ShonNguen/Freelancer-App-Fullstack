import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../components/Footer';
import Header from '../components/Header';
import TabPanelsAdmin from '../components/TabPanelsAdmin';
import TabPanelsEmployer from '../components/TabPanelsEmployer';

export default function UserLoginPage() {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const dispatch = useDispatch();

    function switchRender(userRole) {
        switch (userRole) {
            case 'admin':
                return <TabPanelsAdmin />;
            case 'employer':
                return <TabPanelsEmployer />;
                
        }
    }

    return (
        <Box>
            <Header />
            {switchRender(user.userRole)}
            <AppFooter />
        </Box>
    )
}
