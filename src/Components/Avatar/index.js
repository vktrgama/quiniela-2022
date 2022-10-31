import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useApp } from '../../contexts/App';

const UserAvatar = ({ signOut }) => {
    const { appState } = useApp();
    const [open, setOpen] = React.useState(false);

    const handleToolTipOpen = () => {
        setOpen(!open);
    };

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

    return (
        <HtmlTooltip
            title={
            <React.Fragment>
                <LogOutButton variant="contained" onClick={handleToolTipOpen} endIcon={<LogoutIcon />}>Logout {appState.user.username}</LogOutButton>
            </React.Fragment>
            }
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                onClick={handleToolTipOpen}
            >
                <Avatar alt={appState.user.username} src="avatar.jpeg" />
            </StyledBadge>
        </HtmlTooltip>
    )
}

export default UserAvatar;