import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserLogin from '../../../model/UserLogin';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../../service/Service';
import './Login.css';

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

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/users/login`, userLogin, setToken);
            
            alert('O seu usuário foi logado com sucesso!');
        } catch (error) {
            alert('Ocorreu um erro, por favor verifique se inseriu os dados corretamente.');
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
                            className='bold'>
                                Entrar
                        </Typography>
                        <TextField
                            value={userLogin.login}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='login'
                            label='Endereço de e-mail'
                            placeholder='Insira seu e-mail cadastrado'
                            variant='outlined'
                            name='login'
                            margin='normal'
                            required
                            fullWidth />
                        <TextField
                            value={userLogin.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password'
                            label='Senha'
                            placeholder='Insira a sua senha cadastrada'
                            variant='outlined'
                            name='password'
                            margin='normal'
                            type='password'
                            required
                            fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' className='loginBtn'>
                                Entrar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to="/cadastro" className="registerLink">
                            <Typography variant='subtitle1' className="registerLink" gutterBottom align='center'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='logo-img'></Grid>
        </Grid>
    );
}

export default Login;