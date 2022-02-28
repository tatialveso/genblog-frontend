import React, { useState, useEffect, ChangeEvent } from 'react';
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Theme from '../../../model/Theme';
import { searchId, post, put } from '../../../service/Service';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import './CreateTheme.css';

function CreateTheme() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const [theme, setTheme] = useState<Theme>({
        id: 0,
        description: ''
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado");
            history.push("/login");
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id])

    async function findById(id: string) {
        searchId(`/themes/${id}`, setTheme, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTheme(e: ChangeEvent<HTMLInputElement>) {
        setTheme({
            ...theme,
            [e.target.name]: e.target.value,
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(theme))

        if (id !== undefined) {
            console.log(theme)
            put(`/themes`, theme, setTheme, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/themes`, theme, setTheme, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back();
    }

    function back() {
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="top">
            <form onSubmit={onSubmit}>
                <Typography
                    variant="h3"
                    className="formTitle"
                    component="h1">
                        Formulário de cadastro tema
                </Typography>
                <TextField
                    value={theme.description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTheme(e)}
                    id="description"
                    label="Título do tema"
                    placeholder="Insira um nome de um tema"
                    variant="outlined"
                    name="description"
                    margin="normal"
                    fullWidth />
                <Button
                    type="submit"
                    variant="contained"
                    className="btn">
                    Criar tema
                </Button>
            </form>
        </Container>
    )
}

export default CreateTheme;