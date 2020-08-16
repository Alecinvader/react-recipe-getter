import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Box from "@material-ui/core/Box";
import MapIngredients from "./mapIngredients";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 220,
  },
  media: {
    height: 140,
  },
});

// onCardClick() {

// }

export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={props.id}>
      <CardActionArea>
        <CardMedia
          image={props.image}
          title={props.title}
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>{MapIngredients(props.usedIngredients, true)}</Grid>
            <Grid item>{MapIngredients(props.excludedIngredients, false)}</Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">Not interested</Button>
        <Button size="small" color="primary">
          <Link
            to={{
              pathname: `/recipes/${props.id}`,
              state: {
                usedIngredients: props.usedIngredients,
                excludedIngredients: props.excludedIngredients,
              },
            }}
          >
            {" "}
            Learn More{" "}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
