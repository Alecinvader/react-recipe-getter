import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link as MuiLink } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../auth";


const mainColor = "#4dd0e1";


const useStyles = makeStyles({
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

const LogIn = ({ history }) => {

  const classes = useStyles();

  const handleLogIn = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      history.push("/search/ingredient");
    } catch (error) {
      alert(error);
    }
  }, [history]);


  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/search/ingredient" />;
  }

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
                      <Typography variant="h4">Login</Typography>
                    </Grid>

                    <form className={classes.form} noValidate onSubmit={handleLogIn}>
                      
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
                          Sign In
                        </Button>
                      </Box>
                      <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                          <Link href="#" to={"/signup"}>
                            <MuiLink variant="body2">
                              {"New here? Register instead."}
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
};

export default withRouter(LogIn);