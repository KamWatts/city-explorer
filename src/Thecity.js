import React from "react";

class Thecity extends React.Component{

  render(){
    return(
      <>
        <p>{this.props.cityName}</p>
        <p>{this.props.cityCoordinates}</p>
        <img src={this.props.mapURL} alt={this.props.cityName}/>
      </>
    );
  }
}

export default Thecity;