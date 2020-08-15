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
  test: {
    color: "red",
    fontSize: 25,
  },
};

class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      usedIngredients: ["chicken", "pasta"],
      excludedIngredients: ["rice"],
      information: [],
      showSpinner: false,
    };
  }

  componentDidMount() {
    this.setState({
      showSpinner: true,
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.state.id}/information?apiKey=${process.env.REACT_APP_APIKEY}&includeNutrition=false`
      )
      .then((response) => {
        this.setState(
          {
            information: response.data,
          },
          () => {
            console.log(response.data);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.state.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_APIKEY}`
      )
      .then((response) => {
        this.setState({
          usedIngredients: response.data.ingredients.map((ingredient) => {
            return ingredient.name;
          }),
          showSpinner: false,
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.showSpinner !== false ? <LinearProgress /> : <span></span>}
        <Box my={4}>
          <Container>
            <Paper elevation={3}>
              <Box py={4} px={4}>
                <Grid container justify="flex-start" alignItems="top">
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
                    <Grid>
                      <Grid item>
                        <Typography variant="h4" gutterBottom>
                          {this.state.information.title || "Grilled Chicken"}
                        </Typography>
                        <p className={classes.test}>Test text</p>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>

            <Box mt={3}>
              <Typography variant="h4">Similar Recipes</Typography>
              <Paper>
                <Box px={2} py={2}></Box>
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
