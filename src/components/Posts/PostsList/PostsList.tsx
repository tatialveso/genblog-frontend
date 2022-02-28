/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import Posts from '../../../model/Posts';
import { search } from '../../../service/Service'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './PostsList.css';
import { toast } from 'react-toastify';

function PostsList() {
    const [posts, setPosts] = useState<Posts[]>([])
    let history = useHistory();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "") {
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
            history.push("/login")
        }
    }, [token])

    async function getPost() {
        await search("/posts", setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getPost();
    }, [posts.length])

    return (
        <>
            {posts.map(post => (
                <Box m={2}>
                    <Card variant="outlined" className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {post.text}
                            </Typography>
                            <Typography className="themeName" variant="body2" component="p">
                                {post.theme?.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" mb={1.5}>
                                <Link to={`/editar-postagem/${post.id}`} className="text-decorator-none" >
                                    <Box mx={1}>
                                        <Button variant="contained" className="editBtn">
                                            Editar postagem
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletar-postagem/${post.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" className="deleteBtn">
                                            Excluir postagem
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
    )
}

export default PostsList;