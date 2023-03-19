import React from "react";
import axios from "axios";
import CityForm from "./CityForm";
import City from "./components/MapInfo";
import Weather from "./components/Weather";
import Movies from "./components/Movies"
import SingleDay from './components/SingleDay'
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityNameInput: '',
      cityData: [],
      weatherData: [],
      error: false,
      errorMessage: '',
      isWeatherLoaded: false,
      weatherObject: {},
      isMovieLoaded: false,
      movieData: [],
      mapURL: '',
      cityName: '',
      lat: null,
      lon: null,
      date: '',
      description: ''
    };
  }

  mapSubmit = () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12}`;

    this.setState({
      mapURL: mapURL,
    });
    this.movieSubmit();
    console.log(mapURL);
  };

  citySubmit = async () => {
    
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityNameInput}&format=json`;
    try {
      let searchedCity = await axios.get(url);
      console.log(searchedCity);
      this.setState(
        {
          cityData: searchedCity.data,
          cityName: searchedCity.data[0].display_name,
          lat: searchedCity.data[0].lat,
          lon: searchedCity.data[0].lon,
        },
        this.weatherSubmit
      );
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error.message);
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`,
      });
    }
  };

  weatherSubmit = async () => {
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;
    console.log(url);
    try {
      const weatherObject = await axios.get(url);
      console.log(weatherObject);
      this.setState(
        {
          isWeatherLoaded: true,
          weatherData: weatherObject.data,

        },
        this.mapSubmit
      );
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error);
      let errorMessage = "An Error Occured";
      if (error.response) {
        errorMessage += `: ${error.response.status}`;
      }
      this.setState({
        error: true,
        errorMessage: errorMessage,
      });
    }
  }

  movieSubmit = async () => {
    let url = `${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityNameInput}`;
    console.log(url);
  
    try {
      const movieData = await axios.get(url);
      console.log(movieData.data);
      this.setState({
        movieData: movieData.data
      });
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error.message);
      let errorMessage = "An Error Occured";
      if (error.response) {
        errorMessage += `: ${error.response.status}`;
      }
      this.setState({
        error: true,
        errorMessage: errorMessage,
      });
    }
  };

  handleCityInput = (event) => {
    let nameOfCity = event.target.value;
    this.setState({
      cityNameInput: nameOfCity,
    });
  };

  citySubmitHelper = (event) => {
    event.preventDefault();
    this.citySubmit(this.state.cityNameInput);
  }


  render() {
    return (
      <div>
        <header>
          <h1>Pick a Destination</h1>
        </header>
        <main>
          <CityForm
            citySubmit={this.citySubmit}
            handleCityInput={this.handleCityInput}
            cityName={this.state.cityNameInput}
            cityCoordinates={this.state.cityData}
            mapURL={this.state.mapURL}
            citySubmitHelper={this.citySubmitHelper}
          />
          {this.state.error ? (
            <div className="alert">{this.state.errorMessage}</div>
          ) : null}

          <City cityData={this.state.cityData} 
          mapURL={this.state.mapURL}/>

          <Weather 
          cityName={this.state.cityData.display_name}
          weatherObject={this.state.weatherObject} 
          weatherData={this.state.weatherData}
          />
          <Movies
         movieData={this.state.movieData}
          />
          <SingleDay
          date={this.state.date}
          description={this.state.description}/>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
