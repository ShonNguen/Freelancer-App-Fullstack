import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

export default function Main() {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ProjectCard />
                </Grid>
            </Grid>
        </Container>

    )
}
