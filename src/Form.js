/** @format */
import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Cityform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInformation: [],
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  eventHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log('event fired');
      // get the data from the SW API
      // axios is the library of code that we will use to make our requests
      let cityLocations = await axios.get('https://swapi.dev/api/peple/?page=1');
      // console.log(cityLocations.data.results);
      //save it in state
      this.setState({
        cityInformation: cityLocations.data.results
      });
    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`
      })
    }
  }

  handleCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  citySubmit = async (e) => {
    e.preventDefault();
    // what city are we searching for — the one in state

    // get data from the Location IQ API
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);
    console.log(cityData.data[0]);
    // save that data in state
  }

  render() {

    let starWarsListItems = this.state.cityInformation.map((swData, idx) => {
      // console.log(idx);
      // console.log(swData);
      return <li key={idx}>{swData.name}</li>
    })

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.330062&zoom=12`

    console.log(this.state.cityName);
    return (
      <>
        <h1>Explore Your Next Destination</h1>

        <Form onSubmit={this.citySubmit}>
          <Form.Label>Pick a City
            <input type="text" onChange={this.handleCityInput} />
          </Form.Label>
          <Button type="submit">Explore!</Button>
        </Form>

        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ul>
            {starWarsListItems}
          </ul>
        }
      </>
    );
  }
}