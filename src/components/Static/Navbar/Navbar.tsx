/* eslint-disable eqeqeq */
import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import './Navbar.css';

function Navbar() {
    let history = useHistory();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário foi deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        history.push('/login');
    }

    var navbarComponent;
    if (token != "") {
        navbarComponent = <AppBar position="static" className='navbar'>
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
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;