import React from "react";
import Avatar from '@mui/material/Avatar';
import { useApp } from '../../contexts/App'

const FlagImage = (params) => {
    const { appState } = useApp();

    const flagColumn = params.field === 'home' ? "TeamA" : "TeamB";
    const suffix = appState.countryCodes.find(c => c.country === params.row[flagColumn])
    if (suffix) {
        const imgUrl = `https://cloudinary.fifa.com/api/v3/picture/flags-sq-4/${suffix.code}?tx=c_fill,g_auto,q_auto,w_32`;
        return <Avatar key={params.id} variant='square'
            alt="Remy Sharp"
            src={imgUrl}
            sx={{ width: 32, height: 21 }}
        />
    }
    return '';
}

export default FlagImage;