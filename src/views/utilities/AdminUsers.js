import PropTypes from 'prop-types';
// material-ui
import { Box, Button, Card, FormControl, FormHelperText, Snackbar, Alert, Grid, Input, InputLabel, Modal, Stack, Typography, TableCell } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project imports
import { gridSpacing } from 'store/constant';
import React, { useEffect, useState } from 'react';
import createUser from 'api/createUser';
import getUsers from 'api/getUsers';
import getRole from 'api/getRole';
import deleteUser from 'api/deleteUser';


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

const AdminUtility = ({ name, loading }) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [openSucess, setOpenSucess] = useState(false);
    const [role, setRole] = useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [sureDelete, setSureDelete] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getRole(name).then(res => {
            setRole(res.data[0]);
            console.log(res.data[0]);
            getUsers(res.data[0].id).then(res => {
                console.log(res.data);
                setUsers(res.data);
                setIsLoading(false)
            });
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getRole(name).then(res => {
            setRole(res.data[0]);
            console.log(res.data[0]);
            getUsers(res.data[0].id).then(res => {
                console.log(res.data);
                setUsers(res.data);
                setIsLoading(false);
            });
        });
    }, [name]);

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
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const handleSubmit = () => {
        console.log(email, password);
        createUser(email, password, role.id).then(
            () => {
                getUsers(role.id).then(res => {
                    setUsers(res.data);
                });
                handleClose();
                handleOpenSucess();
                setEmail("");
                setPassword("");
            }
        );
    };
    const handleOpenSucess = () => setOpenSucess(true);
    const handleCloseSucess = () => setOpenSucess(false);

    const handleSureDelete = (id) => {
        console.log(id);
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if (element.user_id === id) {
                setSelectedUser(element);
                setSureDelete(true);
            }
        }
    }
    const handleDelete = () => {
        deleteUser(selectedUser.user_id).then((res) => {
            getUsers(role.id).then(res => {
                setUsers(res.data);
                setSureDelete(false);
            });
        })
    }
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    return (
        <>
            {isLoading ? (
                <Box sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                }}>
                    <CircularProgress />
                </Box>
            ) : (
                <MainCard title={name.toProperCase() + " Users"} secondary={<Button variant='contained' onClick={handleOpen} > Add {name.toProperCase()} User </Button>}>
                    <Snackbar open={openSucess} autoHideDuration={6000} onClose={handleCloseSucess} >
                        <Alert onClose={handleCloseSucess} severity="success" sx={{ width: '100%' }}>
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
                            <MainCard title={`Add ${name.toProperCase()} User `} secondary={<Button variant="contained" onClick={handleClose}> Close </Button>}>
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
                    <Modal
                        open={sureDelete}
                        onClose={() => setSureDelete(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style, width: "30%" }}>
                            <Stack spacing={4} sx={{ justifyContent: 'center', }}>
                                <Typography variant='h3'> Are you Sure you want to delete the user?</Typography>
                                <Box sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color='error' onClick={handleDelete}>Yes</Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Modal>
                    <Grid container spacing={gridSpacing}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Action</TableCell>
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
                                            <TableCell><Button color="error" onClick={() => handleSureDelete(row.user_id)}><DeleteIcon /></Button></TableCell>
                                        </TableRow >
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default AdminUtility;
