import React from "react";

export default class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
    };
  }

  render() {
    return <h1>{this.props.id}</h1>;
  }
}
