import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserLogin from '../../../model/UserLogin';
import { login } from '../../../service/Service';
import { useDispatch } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';
import './Login.css';
import { toast } from 'react-toastify';

function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        login: '',
        password: '',
        token: ''
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token));
            history.push('/home');
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/users/login`, userLogin, setToken);
            toast.success('Seu usuário foi logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } catch (error) {
            toast.error('Ocorreu um erro, por favor verifique se inseriu os dados corretamente', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
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