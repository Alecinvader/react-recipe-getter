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
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#88ffff",
      main: "#4dd0e1",
      dark: "#009faf",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffff81",
      main: "#ffd54f",
      dark: "#c8a415",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/search/*" component={CustomAppBar} />
        <Switch>
          <Route path="/" exact component={SplashPage} />

          <Route path="/search/ingredient" component={RecipeFinder} />

          <Route path="/search/recipes/:id" component={RecipeViewer} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
