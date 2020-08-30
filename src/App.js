import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import RecipeFinder from "./components/fetchRecipeByIngredient";
import Container from "@material-ui/core/Container";
import CustomAppBar from "./components/app-bar";
import RecipeViewer from "./components/viewRecipe";
import SplashPage from "./components/splash";

function App() {
  return (
    <Router>
      <Route path="/search/*" component={CustomAppBar} />
      <Switch>
        <Route path="/" exact component={SplashPage} />

        <Route path="/search/ingredient" component={RecipeFinder} />

        <Route path="/recipes/:id" component={RecipeViewer} />
      </Switch>
    </Router>
  );
}

export default App;
