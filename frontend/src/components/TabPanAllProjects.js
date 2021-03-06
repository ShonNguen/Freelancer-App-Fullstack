import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectCard from './CardProject';

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../slices/projectsSlice'

//material ui
import { Container, CssBaseline, Grid } from '@mui/material';

export default function TabPanAllProjects() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(
        (state) => state.auth
    );
    const { allProjects, isLoading, isError, message } = useSelector(
        (state) => state.projects
    );

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        dispatch(getAllProjects());

    }, [dispatch, user, isError, navigate]);

    return (
        <Container sx={{mt:4 , mb: 4}}>
            <CssBaseline />
            <Grid container spacing={2}>
                {allProjects.map(project => (
                    <Grid Grid item md={4} xs={6} key={project._id} >
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
