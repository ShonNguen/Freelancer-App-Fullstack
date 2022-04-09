import React, { useEffect } from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux';
import { postNewJob, reset } from '../slices/jobsSlice'

//form
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//material ui
import {
    Container, CssBaseline, Avatar, Box, Typography,
    Grid, TextField, Button, Card
} from '@mui/material';
import { styled } from '@mui/material/styles';
//icons
import FileCopyIcon from '@mui/icons-material/FileCopy';



const schema = yup.object({
    title: yup.string().required('No title provided!'),
    description: yup.string().required('No description provided!'),
    location: yup.string().required('No location provided!'),
    images: yup.number().required('Please specify N. of images'),
}).required();



export default function TabPanNewJob() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const {
        isLoading, isError, isSuccess, message
    } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(reset()); 
    },[]); 

    function onJobSubmit(data) {
        const { title, description, location, images } = data;
        const newJob = {
            title,
            description,
            location,
            images
        }
        dispatch(postNewJob(newJob));
    }

    return (
        <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <Card sx={{ mt: 5, mb: 5, p: 2 }}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <FileCopyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Create a new Job
                    </Typography>
                    {isSuccess && (
                        <Typography component="h2" variant="h5" color='secondary.main'>
                            Job Created Successfully
                        </Typography>
                    )}
                    {/* {isSuccess && dispatch(reset())} */}

                    <Box
                        component='form' encType='multipart/form-data' sx={{ mt: 3 }}
                        onSubmit={handleSubmit(onJobSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='title'
                                    name='title'
                                    fullWidth
                                    id='title'
                                    label='Title'
                                    autoFocus
                                    {...register('title')}
                                    error={!!errors?.title}
                                    helperText={errors?.title ? errors.title.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='location'
                                    name='location'
                                    fullWidth
                                    id='location'
                                    label='Location'
                                    autoFocus
                                    {...register('location')}
                                    error={!!errors?.location}
                                    helperText={errors?.location ? errors.location.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='images'
                                    name='images'
                                    fullWidth
                                    id='images'
                                    label='N. of images'
                                    autoFocus
                                    {...register('images')}
                                    error={!!errors?.images}
                                    helperText={errors?.images ? errors.images.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='description'
                                    name='description'
                                    fullWidth
                                    multiline
                                    id='description'
                                    label='Description'
                                    autoFocus
                                    {...register('description')}
                                    error={!!errors?.description}
                                    helperText={errors?.description ? errors.description.message : null}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" type='submit'>
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Card>
        </Container>
    )
}
