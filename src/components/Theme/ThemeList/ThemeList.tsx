import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Theme from '../../../model/Theme';
import useLocalStorage from 'react-use-localstorage';
import { search } from '../../../service/Service';
import './ThemeList.css';

function ThemeList() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado");
            history.push("/login");
        }
    }, [token])


    async function getTheme() {
        await search("/themes", setThemes, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getTheme();
    }, [themes.length])

    return (
        <>
            {themes.map(theme => (
                <Box m={2} className="grid">
                    <Card variant="outlined" className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                { theme.description }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="center" mb={1.5} >
                                <Link to={`/editar-tema/${theme.id}`}>
                                    <Box mx={1}>
                                        <Button variant="contained" className="editBtn">
                                            Editar este tema
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletar-tema/${theme.id}`}>
                                    <Box mx={1}>
                                        <Button variant="contained" className="deleteBtn">
                                            Excluir este tema
                                        </Button>
                                    </Box>
                                </Link>
                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            ))
            }
        </>
    );
}


export default ThemeList;