import React from "react";
import axios from "axios";
import CityForm from "./Form";
import City from "./Thecity";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityNameInput: "",
      cityData: [],
      weatherData: {},
      error: false,
      errorMessage: "",
      weatherObject: {},
      mapURL: "",
      cityName: "",
      lat: "",
      lon: "",
    };
  }

  mapSubmit = () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12}`;

    this.setState({
      mapURL: mapURL,
    });
    console.log(mapURL);
  };

  citySubmit = async (cityNameInput) => {
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${cityNameInput}&format=json`;
    console.log(url);
    try {
      let searchedCity = await axios.get(url);
      console.log(searchedCity);
      this.setState(
        {
          cityData: searchedCity.data[0],
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
    const { lat, lon, cityNameInput } = this.state;
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&format=json&city_name=${cityNameInput}`;
  console.log(url);
    try {
      const weatherData = await axios.get(url);
      console.log(weatherData);
      this.setState(
        {
          weatherObject: weatherData.data[0],
        },
        this.mapSubmit
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
          <Weather weatherObject={this.state.weatherObject} />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
