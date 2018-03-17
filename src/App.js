import React, { Component } from "react";

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

     //filter input
     const vehiclesByInputValue = this.state.listOfvehicles.filter( vehicle => {
       return searchDriver(vehicle.drivers, this.state.valueInput);
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

      <div className="container">

        <header className="header">
          <h1 className="tittle-header m-none">Vehicles</h1>
        </header>

        <main>

          <div className="relative p-bottom-md">
            <label className="hidden" htmlFor="inputByNameEmail">Busca por email o teléfono</label>
            <input className="main-input" onChange={ this.handleInput } type="text" value={ this.state.valueInput } placeholder="Search ..." id="inputByNameEmail"/>
            <img src="icons/search.svg" alt="Search" className="icon-search"/>
          </div>

          { this.state.loaded ? null : <img className="spinner" src="icons/spinner.svg" alt="loading"/>  }

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
        </main>


      </div>
    );
  }
}

export default App;
