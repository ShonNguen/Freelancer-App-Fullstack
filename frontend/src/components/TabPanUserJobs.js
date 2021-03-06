import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../slices/jobsSlice';

//component
import CardJobs from './CardJobs';

//material ui
import { Container, CssBaseline, Grid } from '@mui/material';

export default function TabPanUserJobs() {
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

    }, [ dispatch, user, isError, navigate ]);

    return (
        <Container>
            <CssBaseline />
            <Grid container spacing={2}>
                {allJobs
                .filter(job => job.user === user._id)
                .map(job => (
                    <Grid item md={4} xs={6} key={job.id}>
                        <CardJobs job={job} key={job.id}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
