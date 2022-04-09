import axios from 'axios';

const API_URL = 'projects/';

const postNewProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
        },
    }

    const response = await axios.post(API_URL, projectData, config);
    return response.data;
}

const projectService = {
    postNewProject,
}

export default projectService; 