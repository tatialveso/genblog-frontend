import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/statics/Footer/Footer';
import Navbar from './components/statics/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <div>
            <Route path='/home'>
              <Home />
            </Route>
          </div>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
