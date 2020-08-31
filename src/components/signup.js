import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Box, ThemeProvider, withTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as MuiLink } from "@material-ui/core/";
import purple from "@material-ui/core/colors/purple";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Background from "../assets/Background-01.jpg";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const mainColor = "#4dd0e1";

const styles = (theme) => ({
  root: {
    height: "100vh",
    backgroundColor: mainColor,
  },
  test: {},
  box: {
    height: "100%",
  },
  grid: {
    height: "100%",
    padding: "30px",
  },
  paper: {
    paddingRight: "30px",
    paddingLeft: "30px",
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      key: "",
      status: "",
    };
  }

  render() {
    const { classes } = this.props;
    const { theme } = this.props;
    return (
      <Box>
        <Container maxWidth="xl" className={classes.root}>
          <Box p={5}>
            <Box mb={3}>
              <Grid xs={4} container direction="row" justify="space-between">
                <Grid container item sm={5} className={classes.test}>
                  <Box>
                    <Typography
                      variant="h4"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      Recipeasy
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Grid
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              <Grid
                container
                item
                alignItems="center"
                direction="column"
                xs={12}
                md={3}
                className={classes.test}
              >
                <Paper className={classes.paper}>
                  <Box pb={8} mt={8}>
                    <Box pb={2}>
                      <Grid item>
                        <Avatar>
                          <LockOutlinedIcon />
                        </Avatar>
                      </Grid>
                    </Box>
                    <Grid item>
                      <Typography variant="h4">Register</Typography>
                    </Grid>

                    <form className={classes.form} noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoComplete="name"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoComplete="name"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputLabelProps={{
                          className: classes.helperText,
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                            input: classes.textField,
                          },
                        }}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />

                      <Box pt={2}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Sign Up
                        </Button>
                      </Box>
                      <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                          <Link href="#" to={"/"}>
                            <MuiLink variant="body2">
                              {"Already have an account? Sign in"}
                            </MuiLink>
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SignUp);
