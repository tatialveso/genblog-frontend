import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { searchId, deleteId } from '../../../service/Service';
import Theme from '../../../model/Theme';
import './DeleteTheme.css';


function DeleteTheme() {
  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

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
        <Card variant="outlined" className="deleteCard">
          <CardContent>
            <Box justifyContent="center">
              <Typography gutterBottom className="title">
                Você deseja excluir este tema?
              </Typography>
              <Typography>
                {theme?.description}
              </Typography>
            </Box>
          </CardContent>
          <CardActions className="displayBtn">
              <Box>
                <Button onClick={yes} variant="contained" className="yesBtn">
                  Sim, quero excluir este tema
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={no} variant="contained" className="noBtn">
                  Não, quero manter este tema
                </Button>
              </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeleteTheme;