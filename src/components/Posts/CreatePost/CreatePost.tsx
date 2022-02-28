import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { search, searchId, post, put } from '../../../service/Service';
import Theme from '../../../model/Theme';
import Posts from '../../../model/Posts';
import './CreatePost.css';

function CreatePost() {
  let history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [themes, setThemes] = useState<Theme[]>([])
  
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      history.push("/login")

    }
  }, [token])

  const [theme, setTheme] = useState<Theme>({
    id: 0,
    description: ''
  })

  const [posts, setPost] = useState<Posts>({
    id: 0,
    title: '',
    text: '',
    theme: null
  })

  useEffect(() => {
    setPost({
      ...posts,
      theme: theme
    })
  }, [theme])

  useEffect(() => {
    getThemes()
    if (id !== undefined) {
      findPostById(id)
    }
  }, [id])

  async function getThemes() {
    await search("/themes", setThemes, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function findPostById(id: string) {
    await searchId(`posts/${id}`, setPost, {
      headers: {
        'Authorization': token
      }
    })
  }

  function updatedPost(e: ChangeEvent<HTMLInputElement>) {
    setPost({
      ...posts,
      [e.target.name]: e.target.value,
      theme: theme
    })

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      put(`/posts`, posts, setPost, {
        headers: {
          'Authorization': token
        }
      })

      alert('Postagem atualizada com sucesso');
    } else {
      post(`/posts`, posts, setPost, {
        headers: {
          'Authorization': token
        }
      })
      alert('Postagem cadastrada com sucesso');
    }
    back();
  }

  function back() {
    history.push('/postagens')
  }

  return (
    <Container maxWidth="sm" className="top">
      <form onSubmit={onSubmit}>
        <Typography
          className="modalTitle"
          variant="h3"
          component="h1"
          align="center">
          Crie uma nova postagem
        </Typography>
        <TextField
          value={posts.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)}
          id="titulo"
          label="Título da postagem"
          placeholder="Insira o título da sua publicação"
          variant='outlined'
          name="title"
          margin="normal"
          required
          fullWidth />
        <TextField
          value={posts.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPost(e)}
          id="texto"
          label="Texto da postagem"
          placeholder="Insira o que você quer compartilhar"
          name="text"
          variant='outlined'
          margin="normal"
          required
          fullWidth />
        <FormControl fullWidth>
          <InputLabel className="inputSelect" id="demo-simple-select-label">Temática</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Temática"
            variant='outlined'
            onChange={(e) => searchId(`/themes/${e.target.value}`, setTheme, {
              headers: {
                'Authorization': token
              }
            })}>
              <MenuItem value="">Selecione uma temática</MenuItem>
            {
              themes.map(theme => (
                <MenuItem value={theme.id}>{theme.description}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button fullWidth className="btn" type="submit" variant="contained" color="primary">
          Finalizar
        </Button>
      </form>
    </Container>
  )
}
export default CreatePost;