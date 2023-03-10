/** @format */

import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default class Weather extends React.Component {

  render() {

    return (
      <ListGroup>
        <ListGroup.Item>{this.props.weatherObject.date}</ListGroup.Item>
        <ListGroup.Item>{this.props.weatherObject.description}</ListGroup.Item>
      </ListGroup>
    );

  }
}
