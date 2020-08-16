import React from "react";
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/styles/makeStyles";

export default function MapIngredients(ingredients, used) {
  return (
    <Grid item>
      {ingredients.map((ingredient) => {
        return (
          <Chip
            key={ingredient}
            style={{ marginRight: "10px" }}
            icon={used !== true ? <ClearIcon /> : <DoneIcon />}
            label={ingredient}
            color={used !== true ? "secondary" : "primary"}
          />
        );
      })}
    </Grid>
  );
}
