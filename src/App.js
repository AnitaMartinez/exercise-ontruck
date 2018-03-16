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
       valueInput: "",
     }
   }

   componentDidMount = () => {

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

   handleInput = event => {
      this.setState({valueInput: event.target.value});
   }


   render() {

     // let result;
     // for (const vehicle of this.state.listOfvehicles) {
     //   result = vehicle.drivers.filter( (vehicle) => {
     //     return vehicle.name.toLowerCase().includes(this.state.valueInput.toLowerCase());
     //   })
     // }


    return (

      <div>

        <header>
          <h1 className="tittle-header m-none">Vehicles</h1>
        </header>

        <main>

          <input onChange={ this.handleInput } type="text" className="" value={ this.state.valueInput } placeholder=" Search ..."/>

          <ul>
            {
              this.state.listOfvehicles.map( (vehicle, index) => {

                return (
                  <li key={index} className="cointainer">
                    <p> {(() => {
                      switch (vehicle.type) {
                        case "full_trailer": return <FullTrailer/>;
                        case "rigid_truck": return <RigidTruck/>;
                        case "box_van": return <BoxVan/>;
                        case "van": return <Van/>;
                        default: ;
                      }
                      })()}
                    </p>
                    <p className="title-card"> { `${vehicle.drivers.length} Drivers` } </p>
                    {
                      vehicle.drivers.map( (driverInfo, index) => {
                        return (
                          <div key={index}>
                            <p> { driverInfo.name } </p>
                            <p className="contact-card-font"> { driverInfo.email } </p>
                          </div>
                        )
                      })
                    }
                  </li>
                )
              })
            }
          </ul>

        </main>



      </div>
    );
  }
}

export default App;
