import axios from 'axios';

const API_URL = 'projects/';

const getAllProjects = async () => {

    const response = await axios.get(API_URL + 'all');
    return response.data;
}

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

export const getImage = async (filename) => {
    // try {
    //     const image = await fetch(`http://localhost:8080/api/projects/file/${filename}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'image/*',
    //             'Content-Disposition': 'inline'
    //         }
    //     }); 
    //     const result = await image.json(); 
    //     return result; 
    // } catch (error) {
    //     console.log(error); 
    //     return error; 
    // }
    const config = {
        headers: {
            'Content-Type': 'image/*', 
            'Content-Disposition': 'inline'
        }
    }

    const response = await axios.get(`${API_URL}file/${filename}`, config);
    return response.data; 
}

const projectService = {
    postNewProject,
    getAllProjects,
}

export default projectService; 