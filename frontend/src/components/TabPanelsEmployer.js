import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

//material ui comp
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//components
import TabPanAllJobs from './TabPanAllJobs';
import TabPanUserJobs from './TabPanUserJobs';
import TabPanNewJob from './TabPanNewJob'; 


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabPanelsEmployer() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='fullWidth'>
                    <Tab label="Your jobs" {...a11yProps(0)} />
                    <Tab label="All Jobs" {...a11yProps(1)} />
                    <Tab label="Post new Job" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabPanUserJobs />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabPanAllJobs />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabPanNewJob />
            </TabPanel>
        </Box>
    );
}