import React from "react";
import {Form, Button } from 'react-bootstrap';


class CityForm extends React.Component {


  render(){
    return(
      <>
        <Form onSubmit={this.props.citySubmitHelper}>
          <Form.Label>Pick a City
            <Form.Control type="text" onChange={this.props.handleCityInput} />
          </Form.Label>
          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
      </>
    );
  }
}

export default CityForm;