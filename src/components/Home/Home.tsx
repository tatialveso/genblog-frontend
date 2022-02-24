import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import PostsTab from '../Posts/PostsTab/PostsTab';
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';
import PostModal from '../Posts/PostModal/PostModal';
import homeImg from '../../assets/img/home.png';
import './Home.css';

function Home() {
  let history = useHistory();
  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      history.push("/login")

    }
  }, [token])

  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20} >
            <Typography
              variant="h1"
              gutterBottom
              align="center">
                Boas vindas ao nosso blog!
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              align="center">
                Este é o nosso cantinho literário, indicações e compartilhamento de experiências de leitura
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <PostModal />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <img src={homeImg} alt="" width="500px" height="500px" />
        </Grid>
        <Grid xs={12}>
          < PostsTab />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;