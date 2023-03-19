import React from 'react';
import '../App.css'; 
import SingleDay from './SingleDay';
import Alert from 'react-bootstrap/Alert';


class Weather extends React.Component{

  render() {
    let listItems = []
    if (this.props.weatherData) {
      console.log(this.props.weatherData[0]?.date)
    // console.log(this.props.weatherData.data[0].description)
    listItems = this.props.weatherData.map((weather) => {
      return (
        <SingleDay 
          date={weather.date}
          description={weather.description}
        />
      )}
    )}
  
    else if (!this.props.city) {
      listItems.push(
      <Alert key='danger' variant='danger'>Please enter a city</Alert>
      )
    } else {
      listItems.push(
      <Alert key='danger' variant='danger'>The city you are looking for is unavailable</Alert>
      )
    }
  


    return (
      <>
      <h3>Forecast</h3>
      {listItems}
      </>
    )
  }


};

export default Weather;
