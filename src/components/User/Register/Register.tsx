import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import User from '../../../model/User';
import { register } from '../../../service/Service';
import './Register.css';

function RegisterUser() {
    let history = useHistory();
    const [confirmPassword, setConfirmPassword] = useState<String>("")

    const [user, setUser] = useState<User>({
        id: 0,
        name: '',
        login: '',
        password: ''
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        name: '',
        login: '',
        password: ''
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            history.push("/login");
        }
    }, [userResult])


    function confirmPasswordHandle(e:ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    function updatedModel(e:ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e:ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (confirmPassword === user.password && user.password.length >= 8) {
            register(`/users/register`, user, setUserResult);

            alert('Usuario cadastrado com sucesso');
        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.');
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField
                            value={user.name}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='name'
                            label='name'
                            variant='outlined'
                            name='name'
                            margin='normal'
                            fullWidth />
                        <TextField
                            value={user.login}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='login'
                            label='login'
                            variant='outlined'
                            name='login'
                            margin='normal'
                            fullWidth />
                        <TextField
                            value={user.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password'
                            label='password'
                            variant='outlined'
                            name='password'
                            margin='normal'
                            type='password'
                            fullWidth />
                        <TextField
                            value={confirmPassword}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => confirmPasswordHandle(e)}
                            id='confirmPassword'
                            label='confirmPassword'
                            variant='outlined'
                            name='confirmPassword'
                            margin='normal'
                            type='password'
                            fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RegisterUser;