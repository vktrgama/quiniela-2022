import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

const UserAvatar = ({ handleSignOut, user }) => {
    const [open, setOpen] = React.useState(false);

    const handleToolTipOpen = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        handleSignOut();
        setOpen(!open);
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
        },
        }));

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
        },
        }));
    
    const LogOutButton = styled(Button)({
        textTransform: 'none',
    });

    const authorized = process.env.REACT_APP_WM && user.attributes && process.env.REACT_APP_WM.includes(`${user.attributes.sub}`)

    return Object.keys(user).length ? (
        <HtmlTooltip
            title={
            <React.Fragment>
                {  authorized && <Button component={Link} to='/admin'>
                    Admin
                </Button>
                }
                <LogOutButton variant="contained" onClick={handleLogout} endIcon={<LogoutIcon />}>
                    Logout {user ? user.username : ''}
                </LogOutButton>
            </React.Fragment>
            }
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                onClick={handleToolTipOpen}
            >
                <Avatar alt={user ? user.username : ''} src="avatar.jpeg" />
            </StyledBadge>
        </HtmlTooltip>
    ) : <Avatar alt="" src="avatar.jpeg" />
}

export default UserAvatar;