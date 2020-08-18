import React from "react";
import { Grid, LinearProgress, Typography, Divider } from "@material-ui/core";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import createSpacing from "@material-ui/core/styles/createSpacing";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MapIngredients from "./mapIngredients";

const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  mainRecipe: {
    padding: "35px",
  },
};

class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      information: [],
      showSpinner: false,
      usedIngredients: [],
      similarRecipes: [],
    };
  }

  componentDidMount() {
    let usedIngredients = this.props.location.state.usedIngredients;
    let tempList = [];
    let idList = [];

    this.setState({
      showSpinner: true,
      usedIngredients: usedIngredients,
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.state.id}/information?apiKey=${process.env.REACT_APP_APIKEY}&includeNutrition=false`
      )
      .then((response) => {
        this.setState(
          {
            information: response.data,
            showSpinner: false,
          },
          () => {
            // console.log(response.data);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.state.id}/similar?apiKey=${process.env.REACT_APP_APIKEY}`
      )
      .then((response) => {
        for (
          let index = response.data.length;
          index < response.data.length;
          index++
        ) {
          idList.push(response.data[index].id);

          return axios
            .get(
              `https://api.spoonacular.com/recipes/${idList}/information?apiKey=${process.env.REACT_APP_APIKEY}&includeNutrition=false`
            )
            .then((detailedResponse) => {
              console.log(detailedResponse.data);
              // tempList.push(detailedResponse);
              // this.setState(
              //   {
              //     similarRecipes: tempList,
              //   },
              //   () => {
              //     console.log(this.state.similarRecipes + "d");
              //   }
              // );
            })
            .catch((error) => {
              console.log("Error fetching recipe by ID" + error);
            });
        }
      })
      .catch((error) => {
        console.log("Error finding similar recipes" + error);
      });

    // axios
    //   .get(
    //     `https://api.spoonacular.com/recipes/${this.state.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_APIKEY}`
    //   )
    //   .then((response) => {
    //     this.setState({
    //       usedIngredients: response.data.ingredients.map((ingredient) => {
    //         return ingredient.name;
    //       }),

    //     });
    //   });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.showSpinner !== false ? <LinearProgress /> : <span></span>}
        <Box my={4}>
          <Container>
            <Box py={2} px={4} display="flex" justifyContent="center">
              <Paper elevation={3} className={classes.mainRecipe}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item>
                    <img
                      style={{ maxWidth: 400 }}
                      src={
                        this.state.information.image ||
                        "https://cookthestory.com/wp-content/uploads/2016/08/how-to-grill-chicken.jpg"
                      }
                      alt={
                        "Image of" + this.state.information.title || "alt text"
                      }
                    />
                  </Grid>

                  <Box px={3}>
                    <Grid container spacing={1} direction="column">
                      <Grid item>
                        <Typography variant="h4" gutterBottom>
                          {this.state.information.title || "Grilled Chicken"}
                        </Typography>
                      </Grid>

                      <Grid item>
                        {MapIngredients(this.state.usedIngredients, true)}
                      </Grid>
                      <Grid item>
                        <ul style={{ padding: "15px" }}>
                          <li style={{ padding: "0px" }}>
                            <Typography variant="subtitle1" gutterBottom>
                              {"Ready in " +
                                this.state.information.readyInMinutes +
                                " minutes. "}
                            </Typography>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>
            </Box>

            <Box mt={3}>
              <Typography variant="h4">Similar Recipes</Typography>
              <Paper>
                <Box px={2} py={2}>
                  <p>{this.state.similarRecipes.length}</p>
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </div>
    );
  }
}

RecipeViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeViewer);
