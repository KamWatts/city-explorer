import React from 'react';
import MovieReturn from './MovieReturn';
import Alert from 'react-bootstrap/Alert';

class Movies extends React.Component {
  render() {
    let movieList = [];
    if (Array.isArray(this.props.movieData)) {
      movieList = this.props.movieData.map((movie) => {
        return (
          <MovieReturn
            image_url={movie.image_url}
            title={movie.title}
            overview={movie.overview}
            released_on={movie.released_on}
            popularity={movie.popularity}
            total_votes={movie.total_votes}
            average_votes={movie.average_votes}
          />
        );
      });
    } else if (this.props.error) {
      movieList = (
        <Alert key='danger' variant='danger'>
          {this.props.errorMessage}
        </Alert>
      );
    }

    return (
      <>
        <h3>Movies from this location</h3>
        {movieList}
      </>
    );
  }
}

export default Movies;
