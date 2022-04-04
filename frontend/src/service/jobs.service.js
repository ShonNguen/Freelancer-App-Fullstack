import axios from 'axios';

const API_URL = 'jobs/';

const getAllJobs = async () => {
    const response = await axios.get(API_URL + 'getAll');
    return response.data;
}

const getUserJobs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}

const postNewJob = async (jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, jobData, config);
    return response.data;
}



const updateJob = async (jobId, jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + jobId, jobData, config);

    return response.data;
}

const deleteJob = async (jobId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + jobId, config)

    return response.data
}

const jobService = {
    getAllJobs,
    getUserJobs,
    postNewJob,
    updateJob,
    deleteJob
}

export default jobService; 