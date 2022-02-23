import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Static/Footer/Footer';
import Navbar from './components/Static/Navbar/Navbar';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import ThemeList from './components/Theme/ThemeList/ThemeList';
import PostsList from './components/Posts/PostsList/PostsList';
import CreatePost from './components/Posts/CreatePost/CreatePost';
import CreateTheme from './components/Theme/CreateTheme/CreateTheme';
import DeletePost from './components/Posts/DeletePost/DeletePost';
import DeleteTheme from './components/Theme/DeleteTheme/DeleteTheme';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <div style={{ minHeight: '100vh' }}>
          <Route exact path='/'>
            <Login />
          </Route>

          <Route path='/home'>
            <Home />
          </Route>

          {/* usuário */}
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/cadastro'>
            <Register />
          </Route>

          {/* tema */}
          <Route path='/temas'>
            <ThemeList />
          </Route>

          <Route path='/criar-tema'>
            <CreateTheme />
          </Route>

          <Route path='/editar-tema/:id'>
            <CreateTheme />
          </Route>

          <Route path='/deletar-tema/:id'>
            <DeleteTheme />
          </Route>

          {/* postagem */}
          <Route path='/postagens'>
            <PostsList />
          </Route>

          <Route path='/criar-postagem'>
            <CreatePost />
          </Route>

          <Route path='/editar-postagem/:id'>
            <CreatePost />
          </Route>

          <Route path='/deletar-postagem/:id'>
            <DeletePost />
          </Route>
        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
