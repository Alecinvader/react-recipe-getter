import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../App.css";
import MediaCard from "./RecipeCards";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { spacing } from "@material-ui/system";

import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";

export class RecipeFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      currentIngredient: "",
      recipes: [],
      showSpinner: false,
    };

    this.onIngredientUpdate = this.onIngredientUpdate.bind(this);
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.onIngredientSubmit = this.onIngredientSubmit.bind(this);
    this.convertIngredientsToString = this.convertIngredientsToString.bind(
      this
    );
    this.recipeList = this.recipeList.bind(this);
    this.onIngredientDelete = this.onIngredientDelete.bind(this);
  }

  onIngredientUpdate(event) {
    this.setState({
      currentIngredient: event.target.value,
    });
  }

  onAddIngredient(event) {
    event.preventDefault();

    let subList = this.state.ingredients;

    subList.push(this.state.currentIngredient);

    this.setState({
      ingredients: subList,
      currentIngredient: "",
    });
  }

  convertIngredientsToString() {
    let tempList = [""];

    let tempWord = "";

    this.state.ingredients.forEach((element) => {
      if (
        element !== this.state.ingredients[this.state.ingredients.length - 1]
      ) {
        tempWord = tempWord + "+" + element;
      } else {
        tempWord = element;
      }

      console.log(tempWord);

      tempList.push(tempWord);

      tempWord = "";
    });

    tempList = tempList.reverse();

    tempList.pop();

    console.log(tempList.toString());

    let converetedString = tempList.join(",");
    this.setState(
      {
        ingredientURL: tempList,
      },
      () => {
        this.onIngredientSubmit(converetedString);
      }
    );
  }

  recipeList() {
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {this.state.recipes.map((recipe) => {
          return (
            <Grid item>
              <MediaCard
                title={recipe.title}
                image={recipe.image}
                id={recipe.id}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  onIngredientDelete(title) {
    this.setState(
      {
        ingredients: this.state.ingredients.filter(
          (ingredient) => ingredient !== title
        ),
      },
      () => {
        this.convertIngredientsToString();
      }
    );
  }

  onIngredientSubmit(url) {
    this.setState({
      showSpinner: true,
    });

    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_APIKEY}&ingredients=${url}&number=10`
      )
      .then((response) => {
        console.log(response.data);

        this.setState(
          {
            recipes: response.data,
            showSpinner: false,
          },
          () => {
            console.log(this.state.recipes);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(this.state.recipes.toString());
  }

  render() {
    return (
      <div>
        {this.state.showSpinner === true ? <LinearProgress /> : <span></span>}
        <Container>
          <h3>Search recipes</h3>
          <Paper>
            <Grid
              className="search-bar"
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  variant="filled"
                  type="text"
                  label="Ingredient"
                  onChange={this.onIngredientUpdate}
                  value={this.state.currentIngredient}
                />
              </Grid>
              <Grid item>
                {this.state.ingredients.length < 3 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    onClick={this.onAddIngredient}
                  >
                    Add Ingredient
                  </Button>
                ) : (
                  <Button disabled variant="filled" color="primary">
                    Max Ingredients
                  </Button>
                )}
              </Grid>
              <Grid item>
                {this.state.ingredients.length !== 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.convertIngredientsToString}
                  >
                    Search Recipes
                  </Button>
                ) : (
                  <Button disabled>Search Recipes</Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            {this.state.ingredients.map((ingredient) => {
              return (
                <Grid item>
                  <Box pt={2}>
                    <Chip
                      label={ingredient}
                      onDelete={() => {
                        this.onIngredientDelete(ingredient);
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {this.state.showSpinner === false ? this.recipeList() : <span></span>}
        </Container>
      </div>
    );
  }
}

export default RecipeFinder;
