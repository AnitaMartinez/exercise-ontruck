import React, { Component } from "react";
import FullTrailer from "./icons/FullTrailer";
import RigidTruck from "./icons/RigidTruck";
import BoxVan from "./icons/BoxVan";
import Van from "./icons/Van";


class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       listOfvehicles: [],
     }
   }

   componentDidMount() {

     let listOfvehicles;

     fetch("http://localhost:3000/vehicles")
     .then(response => response.json())
     .then(resultVehicles => {
       listOfvehicles = resultVehicles;
       return fetch("http://localhost:3000/drivers");
     })
     .then(response => response.json())
     .then(resultDrivers => {
       for (const vehicle of listOfvehicles) {
         if (vehicle.type === "full_trailer") {
            vehicle.value = 1;
         }
         if (vehicle.type === "rigid_truck") {
            vehicle.value = 2;
         }
         if (vehicle.type === "box_van") {
            vehicle.value = 3;
         }
         if (vehicle.type === "van") {
           vehicle.value = 4;
         }
         vehicle.drivers = []
         for (const driver of resultDrivers) {
           for (const vehicleOfDriver of driver.vehicles) {
             if (vehicleOfDriver === vehicle.id) {
               vehicle.drivers.push(driver);
             }
           }
         }
       }
       //order by size
       function compare(a,b) {
         return a.value - b.value
       }
       listOfvehicles.sort(compare)
       this.setState({
         listOfvehicles: listOfvehicles,
       });
     })
   }


   render() {

    return (

      <div>

        <ul>

          {
            this.state.listOfvehicles.map( (vehicle, index) => {
              return (
                <li key={index} className="cointainer">
                  <p> { vehicle.id } </p>
                  <p> {(() => {
                    switch (vehicle.type) {
                      case "full_trailer": return <FullTrailer/>;
                      case "rigid_truck": return <RigidTruck/>;
                      case "box_van": return <BoxVan/>;
                      case "van": return <Van/>;
                    }
                    })()}
                  </p>
                  <p> { `${vehicle.drivers.length} Drivers` } </p>
                  {
                    vehicle.drivers.map( (driverInfo, index) => {
                      return (
                        <div key={index}>
                          <p> { driverInfo.name } </p>
                          <p> { driverInfo.email } </p>
                        </div>
                      )
                    })
                  }
                </li>
              )
            })
          }

        </ul>
      </div>
    );
  }
}

export default App;
