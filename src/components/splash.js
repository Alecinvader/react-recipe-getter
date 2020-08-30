import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";

export default class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      key: "",
      status: "",
    };
  }

  render() {
    return (
      <Container maxWidth="xl">
        <Box mt={3}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography>d</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
