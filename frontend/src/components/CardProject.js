import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ProjectCard({ project }) {
    const date = new Date(project.createdAt);
    const dateOfRegistry = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    const image = `http://localhost:8080/api/projects/file/${project.images[0]}`; 
    console.log(image); 


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
            <CardMedia
                component="img"
                height="194"
                wide
                imageUrl = {image}
            />
            <CardContent>
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