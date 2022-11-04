import React from 'react';
import { Stack, Button, Divider, Snackbar, Alert } from "@mui/material";
import './footer.css';

function Footer() {
    const [state, setState] = React.useState({
        open: false,
        msg: '',
      });

      const {msg, open } = state;
    
      const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

    return <div className='footer'>
            <Stack direction='row' spacing={2} justifyContent='left' alignItems='left' divider={<Divider orientation='vertical' flexItem />}>
                <span>COPYRIGHT 2022</span>
                <Button variant="text" onClick={handleClick({msg: 'call me'})}>Contact</Button>
                <Button variant="text" onClick={handleClick({msg: 'trust me'})}>Privacy</Button>
            </Stack>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
}

export default Footer;