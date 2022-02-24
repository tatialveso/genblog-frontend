import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Posts from '../../../model/Posts';
import { search } from '../../../service/Service'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import useLocalStorage from 'react-use-localstorage';

function PostsList() {
    const [posts, setPosts] = useState<Posts[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado");
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
                <Box m={2} >
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Postagens
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {post.text}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {post.theme?.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="center" mb={1.5}>

                                <Link to={`/editar-postagem/${post.id}`} className="text-decorator-none" >
                                    <Box mx={1}>
                                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                            atualizar
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletar-postagem/${post.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" size='small' color="secondary">
                                            deletar
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