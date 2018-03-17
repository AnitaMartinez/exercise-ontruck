import React, { Component } from "react";

class Cards extends Component {

   render() {

     const {listOfvehicles, valueInput} = this.props.state

     const vehiclesByInputValue = listOfvehicles.filter( vehicle => {
       return searchDriver(vehicle.drivers, valueInput);
     })
     function searchDriver(drivers, name){
       for(let driver of drivers){
         if (driver.name.toLowerCase().includes(name.toLowerCase())) {
           return true;
         }
         if (driver.email.toLowerCase().includes(name.toLowerCase())) {
           return true;
         }
       }
       return false;
     }

    return (
      <ul className="wrapper-grid">
        {
          vehiclesByInputValue.map( (vehicle, index) => {
            return (
              <li key={index} className="card">

                <div> {(() => {
                  switch (vehicle.type) {
                    case "full_trailer": return <img src="icons/full-trailer.svg" alt="Full Trailer"/>;
                    case "rigid_truck": return <img src="icons/rigid-truck.svg" alt="Rigid Truck"/>;
                    case "box_van": return <img src="icons/box-van.svg" alt="Box Van"/>;
                    case "van": return <img src="icons/van.svg" alt="Van"/>;
                    default: ;
                  }
                  })()}
                </div>
                <p className="title-card"> { `${vehicle.drivers.length} Drivers` } </p>
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

export default Cards;
