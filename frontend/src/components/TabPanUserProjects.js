import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectCard from './CardProject';

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../slices/projectsSlice'

//material ui
import { Container, CssBaseline, Grid } from '@mui/material';

export default function TabPanUserProjects() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(
        (state) => state.auth
    );
    const { userProjects, isLoading, isError, message } = useSelector(
        (state) => state.projects
    );

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        dispatch(getAllProjects());

    }, [dispatch, user, isError, navigate]);

    return (
        <Container>
            <CssBaseline />
            <Grid container spacing={2}>
                {userProjects.map(project => (
                    <Grid Grid item md={4} xs={6} key={project._id} >
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
