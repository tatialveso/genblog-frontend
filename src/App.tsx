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

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <div style={{ minHeight: '100vh' }}>
          <Route path='/'>
            <Login />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/home'>
            <Home />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/themes'>
            <ThemeList />
          </Route>
          
          <Route path='/posts'>
            <PostsList />
          </Route>
        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
