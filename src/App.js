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

  handleInput = event => {
    this.setState({valueInput: event.target.value});
  }

  assignValue = (elementArray, valueToAssign1, valueToAssign2, valueToAssign3, valueToAssign4) => {
    if (elementArray.type === valueToAssign1) {
      elementArray.value = 1;
    }
    if (elementArray.type === valueToAssign2) {
      elementArray.value = 2;
    }
    if (elementArray.type === valueToAssign3) {
      elementArray.value = 3;
    }
    if (elementArray.type === valueToAssign4) {
      elementArray.value = 4;
    }
  }

  orderFromLeastToGreatest = array => {
    const compare = (a, b) => a.value - b.value;
    array.sort(compare);
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
        this.assignValue(vehicle, "full_trailer", "rigid_truck", "box_van", "van");
        vehicle.drivers = []
        for (const driver of resultDrivers) {
          for (const vehicleOfDriver of driver.vehicles) {
            if (vehicleOfDriver === vehicle.id) {
              vehicle.drivers.push(driver);
            }
          }
        }
      }
      this.orderFromLeastToGreatest(listOfvehicles);
      this.setState({
        listOfvehicles: listOfvehicles,
        loaded: true,
      });
    })
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="tittle-header m-none">Vehicles</h1>
        </header>
        <main>

          <Input
            valueInput= {this.state.valueInput}
            handleInput = {this.handleInput}
          />

          { this.state.loaded ? null : <img className="spinner" src="icons/spinner.svg" alt="loading"/> }

          <Cards
            state= {this.state}
          />

        </main>
      </div>
    );
  }
}

export default App;
