import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//redux
import { signUp } from '../slices/userAuth';
import { clearMessage } from '../slices/message';
import { useDispatch, useSelector } from 'react-redux';

//components
import { User } from '../model/user-model';


//form
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


//material ui
import {
    Typography, Grid, CssBaseline, Box, Avatar, Paper, TextField, FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio, Button
} from '@mui/material';
//icons
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to='/' style={{ textDecoration: 'none' }}>
                Freelance ArchViz
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const schema = yup.object({
    firstName: yup.string().required('No first name provided!'),
    lastName: yup.string().required('No first name provided!'),
    email: yup.string().email('Not valid email'),
    username: yup.string()
        .required('No username provided!')
        .min(8, 'Username should be at least 8 chars'),
    password: yup.string()
        .required('No password provided!')
        .min(8, 'Password should be at least 8 chars!')
        .matches(/^(?=.*\d)/, 'Password should have at least one number!')

}).required();



export default function UserSignUpForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    function onSignUpFormSubmit(data) {
        const currentDate = new Date();
        const dateOfRegistry = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} - ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        const newUser = new User(
            data.firstName, data.lastName, data.email, data.username, data.password, gender, role, dateOfRegistry
        );

        setSuccessful(false);

        dispatch(signUp(newUser))
            .unwrap()
            .then(() => {
                props.history.push('/register/success');
                window.location.reload();
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            })
    }

    if (successful) {
        navigate('/register/success', { replace: true });
    }

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign Up
                    </Typography>

                    <Box component='form' sx={{ mt: 2 }} onSubmit={handleSubmit(onSignUpFormSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                    {...register('firstName')}
                                    error={!!errors?.firstName}
                                    helperText={errors?.firstName ? errors.firstName.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='family-name'
                                    name='lastName'
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    autoFocus
                                    {...register('lastName')}
                                    error={!!errors?.lastName}
                                    helperText={errors?.lastName ? errors.lastName.message : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='email'
                                    name='email'
                                    id='email'
                                    label='Email'
                                    type='email'
                                    fullWidth
                                    autoFocus
                                    {...register('email')}
                                    error={!!errors?.email}
                                    helperText={errors?.email ? errors.email.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='username'
                                    name='username'
                                    id='username'
                                    label='Username'
                                    fullWidth
                                    autoFocus
                                    {...register('username')}
                                    error={!!errors?.username}
                                    helperText={errors?.username ? errors.username.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='password'
                                    id='password'
                                    label='Password'
                                    fullWidth
                                    autoFocus
                                    type='password'
                                    {...register('password')}
                                    error={!!errors?.password}
                                    helperText={errors?.password ? errors.password.message : null}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup

                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => setGender(e.target.value)} />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) => setGender(e.target.value)} />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" onChange={(e) => setGender(e.target.value)} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <RadioGroup

                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="role"
                                    >
                                        <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" onChange={(e) => setRole(e.target.value)} />
                                        <FormControlLabel value="employer" control={<Radio />} label="Employer" onChange={(e) => setRole(e.target.value)} />
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" onChange={(e) => setRole(e.target.value)} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" type='submit'>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to='/' style={{ textDecoration: 'none' }} >
                                    <Button fullWidth variant="contained" type='submit'>
                                        Back to Home Page
                                    </Button>
                                </Link>
                            </Grid>

                            {message && (
                                <Grid item xs={12}>
                                    {message}
                                </Grid>
                            )}

                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Grid>
        </Grid>
    )
}
