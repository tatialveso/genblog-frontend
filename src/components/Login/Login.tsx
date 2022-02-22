import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import UserLogin from '../../model/UserLogin';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../service/Service';

function Login() {
    let history = useHistory();
    const [token, setToken] = useLocalStorage('token');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        login: '',
        password: '',
        token: ''
    })

    function updatedModel(e:ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            history.push('/home')
        }
    }, [token])

    async function onSubmit(e:ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/users/login`, userLogin, setToken)
            
            alert('Usuário logado com sucesso!');
        } catch (error) {
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography
                            variant='h3'
                            gutterBottom
                            color='textPrimary'
                            component='h3'
                            align='center'
                            className='textos1'>
                                Entrar
                        </Typography>
                        <TextField
                            value={userLogin.login}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='login'
                            label='login'
                            variant='outlined'
                            name='login'
                            margin='normal'
                            fullWidth />
                        <TextField
                            value={userLogin.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password'
                            label='password'
                            variant='outlined'
                            name='password'
                            margin='normal'
                            type='password'
                            fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/register'>
                            <Typography variant='subtitle1' gutterBottom align='center' style={{ fontWeight: 'bold' }}>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'></Grid>
        </Grid>
    );
}

export default Login;