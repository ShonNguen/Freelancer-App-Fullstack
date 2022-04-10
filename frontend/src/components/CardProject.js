import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getImage } from '../service/projects.service';

function ProjectCard({ project }) {
    const date = new Date(project.createdAt);
    const dateOfRegistry = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    const imgUrl = `http://localhost:8080/api/projects/file/${project.images[0]}`
    // const imageurl = getImage(project.images[0]);
    return (
        <Card sx={{
            maxWidth: 345
        }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={project.title}
                subheader={dateOfRegistry}
            />
            <CardContent>
                <img src={imgUrl} alt="image" width='345' height='240'/>
                <Typography variant="body2" color="text.secondary">
                    {project.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ProjectCard;