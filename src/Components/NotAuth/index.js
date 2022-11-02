import React from "react";
import {
    Stack
  } from '@mui/material';
import './no-auth.css';

const NoAuth = () => {
    return (
    <div className='home'>
        <div className="no-auth-hero">
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <h1>You are not authorized to get in here.</h1>
            </Stack>
        </div>
    </div>
    )
}

export default NoAuth;