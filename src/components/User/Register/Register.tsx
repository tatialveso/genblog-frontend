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


    function confirmPasswordHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (confirmPassword === user.password && user.password.length >= 8) {
            register(`/users/register`, user, setUserResult);

            alert('O seu usuário foi cadastrado com sucesso!');
        } else {
            alert('Algo deu errado, por favor verifique se informou os dados corretos.');
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='logo-img'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='bold'>Cadastre-se</Typography>
                        <TextField
                            value={user.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            type='text'
                            id='name'
                            label='Nome'
                            placeholder='Como você gostaria de ser chamade?'
                            variant='outlined'
                            name='name'
                            margin='normal'
                            required
                            fullWidth />
                        <TextField
                            value={user.login}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            type='email'
                            id='login'
                            label='Endereço de e-mail'
                            placeholder='Insira o seu melhor endereço de e-mail'
                            variant='outlined'
                            name='login'
                            margin='normal'
                            required
                            fullWidth />
                        <TextField
                            value={user.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password'
                            label='Senha'
                            placeholder='Crie uma senha de acesso'
                            variant='outlined'
                            name='password'
                            margin='normal'
                            type='password'
                            required
                            fullWidth />
                        <TextField
                            value={confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmPasswordHandle(e)}
                            id='confirmPassword'
                            label='Confirme a senha'
                            placeholder='Repita a senha para confirmação'
                            variant='outlined'
                            name='confirmPassword'
                            margin='normal'
                            type='password'
                            required
                            fullWidth />
                        <Box marginTop={2} textAlign='center' className='btnBox'>
                            <Button type='submit' variant='contained' className='registerBtn'>
                                Cadastrar
                            </Button>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' className='cancelBtn'>
                                    Cancelar
                                </Button>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RegisterUser;