import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { searchId, deleteId } from '../../../service/Service';
import Theme from '../../../model/Theme';


function DeleteTheme() {
  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useLocalStorage('token');
  const [theme, setTheme] = useState<Theme>()

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
    searchId(`/themes/${id}`, setTheme, {
      headers: {
        'Authorization': token
      }
    })
  }

  function yes() {
    history.push('/temas')
    deleteId(`/themes/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Tema deletado com sucesso');
  }

  function no() {
    history.push('/temas')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {theme?.description}
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
              <Box mx={2}>
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
export default DeleteTheme;