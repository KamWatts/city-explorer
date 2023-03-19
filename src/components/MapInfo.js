import React from "react";

class MapInfo extends React.Component {
  render() {
    return (
      <div>
        {this.props.mapURL ? (
          <img src={this.props.mapURL} alt="map of city" />
        ) : null}
        <ul>
          {this.props.cityData.length > 0 ? (
            <div>
              <li>City: {this.props.cityData[0].display_name}</li>
              <li>Latitude: {this.props.cityData[0].lat}</li>
              <li>Longitude: {this.props.cityData[0].lon}</li>
            </div>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default MapInfo;
