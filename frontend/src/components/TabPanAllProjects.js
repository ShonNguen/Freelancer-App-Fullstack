import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import ProjectCard from './CardProject';

//redux
import { useDispatch, useSelector } from 'react-redux'
import {getAllProjects} from '../slices/projectsSlice'

export default function TabPanAllProjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { user } = useSelector(
    (state) => state.auth
  );
  const { allProjects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {

    if (!user) {
        navigate('/login');
    }

    dispatch(getAllProjects());

}, [dispatch, user, isError, navigate]);

console.log(allProjects);
console.log(message);

  return (
    <ProjectCard project={allProjects[5]}/>
  )
}
