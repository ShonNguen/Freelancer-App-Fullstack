import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';


//redux
import { useDispatch, useSelector } from 'react-redux';
import { reset, createNewProject } from '../slices/projectsSlice';

//form
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//material ui
import { Container, CssBaseline, Avatar, Box, Typography, Grid, TextField, Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
//icons
import FileCopyIcon from '@mui/icons-material/FileCopy';


const SUPPORTED_FORMAT = ['image/jpg', 'image/jpeg', 'image/png']

const schema = yup.object({
    title: yup.string().required('No title provided!'),
    description: yup.string().required('No description provided!'),
    location: yup.string().required('No location provided!'),
    // images: yup
    //     .mixed()
    //     .required('Please provide images!')
    // .test("fileFormat",
    //     "Unsupported Format",
    //     value => value && SUPPORTED_FORMAT.includes(value.type)),
}).required();

const Input = styled('input')({
    display: 'none',
});

export default function TabPanelsFreelancer() {
    const [files, setFiles] = useState([]);
    //img
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    const images = files.map((file) => (
        <Grid item xs={4} key={file.name}>
            <div >
                <div>
                    <img src={file.preview} style={{ height: "100px", maxWidth: '165px' }} alt="preview" />
                </div>
            </div>
        </Grid>
    ))
    //form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const {
        isLoading, isError, isSuccess, message
    } = useSelector((state) => state.projects)

    // useEffect(() => {
    //     dispatch(reset());
    // }, [isError, isSuccess, message, dispatch]);

    function onProjectFormSubmit(data) {
        const {title, description, location} = data; 
        const fd = new FormData() ; 
        console.log(title);
        fd.append('title', title);
        fd.append('description', 'description');
        fd.append('location', location);
        files.map(file => {
            fd.append('files', file);
        });
        console.log(fd.get('files'));
        dispatch(createNewProject(fd));
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
                        Create a new Project
                    </Typography>

                    <Box
                        component='form' encType='multipart/form-data' sx={{ mt: 3 }}
                        onSubmit={handleSubmit(onProjectFormSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12}
                                sx={{
                                    border: 0.5,
                                    borderColor: '#bdbdbd', borderStyle: 'dashed', borderRadius: 3,
                                    ml: 2, mt: 2
                                }}>
                                <Box component='div' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Typography variant='h6'>
                                        Drop your images here or click on the filed
                                    </Typography>
                                    <Grid container>
                                        {images}
                                    </Grid>
                                </Box>
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
