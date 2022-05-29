import PropTypes from 'prop-types';
// material-ui
import { Box, Button, Card, FormControl, FormHelperText, Snackbar, Alert, Grid, Input, InputLabel, Modal, Stack, Typography, TableCell} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import createUser from 'api/createUser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getUsers from 'api/getUsers';
import { green } from '@mui/material/colors';


// ===============================|| SHADOW BOX ||=============================== //

const ShadowBox = ({ shadow }) => (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4.5,
                bgcolor: 'primary.light',
                color: 'grey.800'
            }}
        >
            <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
        </Box>
    </Card>
);

ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
};

// ============================|| UTILITIES SHADOW ||============================ //

const UtilitiesShadow = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(res.data);
        })
    }, []);

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = () => {
        console.log(email, password);
        createUser(email, password).then(
            () => {
                getUsers().then(res => {
                    setUsers(res.data);
                });
                handleClose();
                handleOpenSucess();
            }
        );
    };
    const [openSucess, setOpenSucess] = useState(false);
    const handleOpenSucess = () => setOpenSucess(true);
    const handleCloseSucess = () => setOpenSucess(false);
    return (
        <MainCard title="Admin Users" secondary={<Button variant="contained" onClick={handleOpen}> Add Admin User </Button>}>
            <Snackbar open={openSucess} autoHideDuration={6000} onClose={handleCloseSucess} >
                <Alert onClose={handleCloseSucess} severity="success" sx={{ width: '100%', backgroundColor: green }}>
                    <Typography>User generated Sucessfully</Typography>
                </Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainCard title="Add Admin User" secondary={<Button variant="contained" onClick={handleClose}> Close </Button>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} alignContent="center" spacing={2}>
                                <form noValidate onSubmit={handleSubmit}>
                                    <Stack justifyContent="center"
                                        alignItems="right"
                                        spacing={2}>
                                        <Stack direction="column"
                                            justifyContent="center"
                                            alignItems="left"
                                            spacing={2}>
                                            <FormControl>
                                                <InputLabel htmlFor='user-email' variant="standard">Email</InputLabel>
                                                <Input onChange={onEmailChange} value={email} id='user-email' aria-describedby="my-helper-text" type="email" />
                                            </FormControl>
                                            <FormControl>
                                                <InputLabel htmlFor='user-password' variant="standard">Password</InputLabel>
                                                <Input onChange={onPasswordChange} value={password} id='user-password' aria-describedby="my-helper-text" type='password' />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                            <FormControl>
                                                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Box>
            </Modal>
            <Grid container spacing={gridSpacing}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    <TableCell>{row.nickname}</TableCell>
                                    <TableCell>{row.logins_count ? row.logins_count : 0}</TableCell>
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </MainCard>
    );
}

export default UtilitiesShadow;
