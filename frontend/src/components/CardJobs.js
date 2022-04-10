import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyForJob } from '../slices/userAuth';
import { useNavigate } from 'react-router-dom';


//material ui
import {
    Card, CardHeader, IconButton, Box, CardContent,
    Typography, CardActions, Button
} from '@mui/material';

//material icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ImageIcon from '@mui/icons-material/Image';
import UserMoreMenu from './UserMoreMenu';


export default function CardJobs({ job,  ...rest }) {
    const { user } = useSelector((state) => state.auth);
    const role = user.userRole;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title, description, location, images, updatedAt } = job;

    const updateDate = new Date(updatedAt);
    const currDate = new Date();
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24 * 1000));

        var dDisplay = d > 0 ? d + (d == 1 ? "d ago" : "ds ago") : "< 1d ago";
        return dDisplay;
    }

    function applyForJob() {
        dispatch(applyForJob(job));
        
    }

    return (
        <Card sx={{ maxWidth: 350, height: 352 }}>
            <CardHeader
                action={
                    (role === "admin" || role === 'employer')
                        ? (
                            <UserMoreMenu job={job} />
                        )
                        : (<Button variant='contained' sx={{ borderRadius: 6, p: 1 }}
                            onClick={applyForJob}
                        >
                            Apply
                        </Button>)
                }
                title={title}
                subheader={
                    <Box sx={{ display: 'flex' }}>
                        <LocationOnIcon />
                        <Typography>
                            {location}
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="body1" >
                    {`${description.substring(0, 200)}...`}
                </Typography>
            </CardContent>
            <CardActions>
                <ImageIcon color="disabled" />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1, ml: 1 }}>
                    {`N. of images ${images}`}
                </Typography>
                <WatchLaterIcon fontSize="small" color="disabled" />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1, ml: 1 }}>
                    {secondsToDhms(currDate - updateDate)}
                </Typography>
            </CardActions>
        </Card>
    )
}
