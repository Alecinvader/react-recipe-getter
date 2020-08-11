import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecipeFinder from "./components/fetchRecipeByIngredient";
import Container from "@material-ui/core/Container";
import CustomAppBar from "./components/app-bar";

function App() {
  return (
    <Router>
      <CustomAppBar />
      <Container maxWidth="lg">
        <Route path="/" exact component={RecipeFinder} />
      </Container>
    </Router>
  );
}

export default App;
