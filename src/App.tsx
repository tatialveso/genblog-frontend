import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/User/Register/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <div style={{ minHeight: '100vh' }}>
          <Route path='/'>
            <Login />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
