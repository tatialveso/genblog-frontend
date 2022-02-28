/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Theme from '../../../model/Theme';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { search } from '../../../service/Service';
import './ThemeList.css';
import { toast } from 'react-toastify';

function ThemeList() {
    const [themes, setThemes] = useState<Theme[]>([]);
    let history = useHistory();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == '') {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
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
                <Box m={2}>
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