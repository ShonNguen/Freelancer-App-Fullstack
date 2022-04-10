import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { getAllUsers } from '../slices/userAuth';

//component
import UserMoreMenu from './UserMoreMenu';

//material ui
import { Card, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';



export default function TabPanAllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAllUsers());

  }, [user, navigate, isError, message, dispatch])
  console.log(users);

  return (
    <Box>
      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row" padding="none" >
                  <Typography variant="subtitle1" noWrap >
                    Name
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" >
                  <Typography variant="subtitle1" noWrap >
                    Username
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" >
                  <Typography variant="subtitle1" noWrap >
                    Email
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" >
                  <Typography variant="subtitle1" noWrap >
                    User role
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" >
                  <Typography variant="subtitle1" noWrap >
                    Gender
                  </Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                .map((curUser) => {
                  const { _id, firstName, lastName, username, email, userGender, userRole } = curUser;
                  return (
                    <TableRow hover key={_id} tabIndex={-1} role='checkbox' >
                      <TableCell component="th" scope="row" padding="none">
                        <Typography variant="subtitle2" noWrap>
                          {`${firstName} ${lastName}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{username}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{userRole}</TableCell>
                      <TableCell align="left">{userGender}</TableCell>
                      {/* <TableCell align="right"><UserMoreMenu /></TableCell> */}
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
