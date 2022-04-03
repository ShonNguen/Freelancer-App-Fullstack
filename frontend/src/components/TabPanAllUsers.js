import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../slices/userAuth';

//material ui
import { Checkbox, Stack, TableCell, TableRow, Typography } from '@mui/material';



export default function TabPanAllUsers() {
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const [allUsers, setAllUsers] = useState([]); 

    useEffect(() => {
        const fetchedUsers = dispatch(getAllUsers()); 
        console.log(fetchedUsers);
    }, []);

    console.log(allUsers);

    return (
        <div>TabPanAllUsers</div>
    )
}
