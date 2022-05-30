import AdminUtility from './AdminUsers';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function WhenLoading(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    if (isLoading)
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    else{
        return (
            <AdminUtility loading={setIsLoading} {...props}/>
        );
    }
    
}
