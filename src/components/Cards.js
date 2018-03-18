import React, { Component } from "react";
import PropTypes from 'prop-types';

class Cards extends Component {

  filterDrivers = (drivers, value) => {
    for(let driver of drivers){
      if (driver.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (driver.email.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  render() {

    const {listOfvehicles, valueInput} = this.props.state

    const vehiclesByInputValue = listOfvehicles.filter( vehicle => {
      return this.filterDrivers(vehicle.drivers, valueInput);
    })

    return (
      <ul className="wrapper-grid">
        {
          vehiclesByInputValue.map( (vehicle, index) => {
            return (
              <li key={index} className="card">

                <div className="center">
                  {(() => {
                    switch (vehicle.type) {
                      case "full_trailer": return <img src="icons/full-trailer.svg" alt="Full Trailer"/>;
                      case "rigid_truck": return <img src="icons/rigid-truck.svg" alt="Rigid Truck"/>;
                      case "box_van": return <img src="icons/box-van.svg" alt="Box Van"/>;
                      case "van": return <img src="icons/van.svg" alt="Van"/>;
                      default: ;
                    }
                  })()}
                </div>

                <p className="title-card">
                  {(() => {
                    switch (vehicle.drivers.length) {
                      case 0: return "No Drivers";
                      case 1: return "1 Driver";
                      default: return vehicle.drivers.length + " Drivers";
                    }
                  })()}
                </p>

                <div className="container-data-card">
                  {
                    vehicle.drivers.map( (driverInfo, index) => {
                      return (
                        <div key={index}>
                          <p className="m-bottom-none"> { driverInfo.name } </p>
                          <p className="contact-card-font m-none"> { driverInfo.email } </p>
                        </div>
                      )
                    })
                  }
                </div>

              </li>
            )
          })
        }
      </ul>
    );
  }
}

Cards.propTypes = {
  state: PropTypes.object,
};

export default Cards;
