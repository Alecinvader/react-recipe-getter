import React from "react";

export default class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
    };
  }

  render() {
    return <h1>{this.state.id}</h1>;
  }
}
