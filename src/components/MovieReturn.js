import React from 'react';
import Card from 'react-bootstrap/Card';

class MovieReturn extends React.Component{

  

  render() {

    let moviePoster = `https://image.tmdb.org/t/p/original${this.props.image_url}`
    
    return(
    <Card style={{ width: '350px' }}>
      <Card.Img variant="top" src={moviePoster} />
      <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Text>{this.props.released_on}</Card.Text>
        <Card.Text>{this.props.overview}</Card.Text>
        <Card.Text>This movie has a popularity index of {this.props.popularity}, according to a total of {this.props.total_votes} votes, with an average votes of {this.props.average_votes}</Card.Text>
      </Card.Body>
    </Card>
    )
  }
}

export default MovieReturn;
