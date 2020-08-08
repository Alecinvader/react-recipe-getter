import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RecipeFinder from './components/fetchRecipe';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router>
      <Container>
        <Route path="/" exact component = {RecipeFinder}/>
        
      </Container>
    </Router>
  );
}

export default App;
