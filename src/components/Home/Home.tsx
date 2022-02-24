import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import PostsTab from '../Posts/PostsTab/PostsTab';
import './Home.css';
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';
import PostModal from '../Posts/PostModal/PostModal';

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
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{ backgroundColor: "#3F51B5" }}>
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20} >
            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>Seja bem vindo(a)!</Typography>
            <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>expresse aqui os seus pensamentos e opiniões!</Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <PostModal />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <img src="https://i.imgur.com/H88yIo2.png" alt="" width="500px" height="500px" />
        </Grid>
        <Grid xs={12} style={{ backgroundColor: "white" }}>
          < PostsTab />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;