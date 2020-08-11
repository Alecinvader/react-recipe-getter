import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecipeFinder from "./components/fetchRecipeByIngredient";
import Container from "@material-ui/core/Container";
import CustomAppBar from "./components/app-bar";
import RecipeViewer from "./components/viewRecipe";

function App() {
  return (
    <Router>
      <CustomAppBar />

      <Route path="/" exact component={RecipeFinder} />
      <Route path="/recipes/:id" component={RecipeViewer} />
    </Router>
  );
}

export default App;
