import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export default class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      usedIngredients: [],
      excludedIngredients: [],
      information: [],
      showSpinner,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.state.id}/information?apiKey=${process.env.REACT_APP_APIKEY}includeNutrition=false`
      )
      .then((response) => {
        this.setState(
          {
            information: response,
          },
          () => {
            console.log(response);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.spoonacular.com/recipes?apiKey=${process.env.REACT_APP_APIKEY}/${this.state.id}/ingredientWidget.json`
      )
      .then((response) => {
        this.setState({
          usedIngredients: response.data.ingredients.map((ingredient) => {
            return ingredient.name;
          }),
        });
      });
  }

  render() {
    return (
      <Container>
        <Paper>
          <Box>
            <Grid container justify="flex-start" alignItems="top">
              <Grid item>
                <img
                  src={this.state.information.image}
                  alt={"Image of" + this.state.information.title}
                />
              </Grid>
              <Grid>
                <h2>{this.state.information.title}</h2>
              </Grid>
              <Grid>
                <ul></ul>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }
}
