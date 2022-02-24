import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Posts from '../../../model/Posts';
import { searchId, deleteId } from '../../../service/Service';

function DeletePost() {
  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useLocalStorage('token');
  const [post, setPosts] = useState<Posts>()

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      history.push("/login")

    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    searchId(`/posts/${id}`, setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  function yes() {
    history.push('/postagens')
    deleteId(`/posts/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Postagem deletada com sucesso');
  }

  function no() {
    history.push('/postagens')
  }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
                {post?.title}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={yes} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box>
                <Button onClick={no} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletePost;