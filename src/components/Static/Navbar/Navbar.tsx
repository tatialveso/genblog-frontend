import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Navbar.css';

function Navbar() {
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    function goLogout() {
        setToken('');
        alert('Usuário deslogado');
        history.push('/login');
    }

    return (
        <>
            <AppBar position="static" className='navbar'>
                <Toolbar className="displayFlex" variant="dense">
                    <Box >
                        <Typography variant="h5">
                            BlogPessoal
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="start">
                        <Link to="/home">
                            <Box mx={1}>
                                <Typography variant="h6">
                                    home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/postagens" >
                            <Box mx={1}>
                                <Typography variant="h6">
                                    postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/temas" >
                            <Box mx={1}>
                                <Typography variant="h6">
                                    temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="criar-tema">
                            <Box mx={1}>
                                <Typography variant="h6">
                                    cadastrar tema
                                </Typography>
                            </Box>
                        </Link>
                        <Box mx={1} className="link" onClick={goLogout}>
                            <Typography className="link" variant="h6" color="inherit">
                                sair
                            </Typography>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;