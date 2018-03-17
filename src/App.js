import React, { Component } from "react";
import Input from './components/Input';
import Cards from './components/Cards';

class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       listOfvehicles: [],
       valueInput: "",
       loaded: false,
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
         loaded: true,
       });
     })
   }

   handleInput = event => {
      this.setState({valueInput: event.target.value});
   }


   render() {

    return (

      <div className="container">

        <header className="header">
          <h1 className="tittle-header m-none">Vehicles</h1>
        </header>

        <main>

          <Input
            state= {this.state}
            handleInput = {this.handleInput}
          />

          { this.state.loaded ? null : <img className="spinner" src="icons/spinner.svg" alt="loading"/>  }

          <Cards
            state= {this.state}
          />

        </main>

      </div>
    );
  }
}

export default App;
