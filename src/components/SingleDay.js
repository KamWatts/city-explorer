import React from 'react';
import '../App.css'; 
import Card from 'react-bootstrap/Card';

class SingleDay extends React.Component{
  
  render() {
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{this.props.date}</Card.Title>
        <Card.Text>{this.props.description}</Card.Text>
      </Card.Body>
    </Card>
    )
  }

}

export default SingleDay;