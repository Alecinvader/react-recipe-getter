import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import RecipeFinder from "./components/fetchRecipeByIngredient";
import CustomAppBar from "./components/app-bar";
import RecipeViewer from "./components/viewRecipe";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import SignUp from "./components/signup";
import LogIn from "./components/SignIn";
import { AuthProvider } from "./auth";
import PrivateRoute from "./PrivateRoute";

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <Router>
        <Route path="/search/*" component={CustomAppBar} />
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />

          <PrivateRoute path="/search/ingredient" component={RecipeFinder} />

          <PrivateRoute path="/search/recipes/:id" component={RecipeViewer} />
        </Switch>
      </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
