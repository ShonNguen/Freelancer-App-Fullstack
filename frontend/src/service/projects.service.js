import axios from 'axios';

const API_URL = 'projects/';

const postNewProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, projectData, config);
    return response.data;
}

const projectService = {
    postNewProject,
}

export default projectService; 