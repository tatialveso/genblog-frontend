import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Posts from '../../../model/Posts';
import { searchId, deleteId } from '../../../service/Service';
import './DeletePost.css';

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
        <Card variant="outlined" className="deleteCard">
          <CardContent>
            <Box justifyContent="center">
              <Typography gutterBottom className="title">
                Você deseja excluir a seguinte postagem?
              </Typography>
              <Typography>
                {post?.title}
              </Typography>
            </Box>

          </CardContent>
          <CardActions className="displayBtn">
              <Box>
                <Button onClick={yes} className="yesBtn">
                  Sim, quero excluir esta postagem
                </Button>
              </Box>
              <Box>
                <Button onClick={no} className="noBtn">
                  Não, quero manter esta postagem
                </Button>
              </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletePost;