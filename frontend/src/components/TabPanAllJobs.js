import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../slices/jobsSlice';

//component
import CardJobs from './CardJobs';

//material ui
import { Container, CssBaseline, Grid } from '@mui/material';

export default function TabPanAllJobs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.auth
    );

    const { allJobs, isLoading, isError, message } = useSelector(
        (state) => state.jobs
    );

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        dispatch(getAllJobs());

    }, [dispatch, user, isError, navigate]);

    return (
        <Container sx={{mt:4 , mb: 4}}>
            <CssBaseline />
            <Grid container spacing={2}>
                {allJobs.map(job => (
                    <Grid item md={4} xs={6} key={job._id}>
                        <CardJobs job={job} key={job._id}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
