import React from 'react';
import { Snackbar, Alert } from "@mui/material";

function PopMsg({ open, message, setPopMsg}) {

    const handleClose = () => {
        setPopMsg({open: false, message: ''})
    }

    return <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
}

export default PopMsg;