import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       listOfvehicles: [],
     }
   }

   componentDidMount() {

     fetch("http://localhost:3000/vehicles")
     .then(response => response.json())
     .then(resultVehicles => {
       this.setState({
         listOfvehicles: resultVehicles,
       });
       return fetch("http://localhost:3000/drivers");
     })
     .then(response => response.json())
     .then(resultDrivers => {

       for (const vehicle of this.state.listOfvehicles) {
         vehicle.drivers = []
         for (const driver of resultDrivers) {
           for (const vehicleOfDriver of driver.vehicles) {
             if (vehicleOfDriver === vehicle.id) {
               vehicle.drivers.push(driver);
             }
           }
         }
       }

       this.setState({
         listOfvehicles: this.state.listOfvehicles,
       });

     })
   }


   render() {

    return (

      <div>



        <ul>

          {/* {
            this.state.listOfvehicles.map( (vehicle, index) => {
              return (
                <li key={index} className="cointainer">
                  <p> { vehicle.id } </p>
                  <p> { vehicle.type } </p>

                  {
                    this.state.listOfDrivers.map( (driver, index) => {
                      for (const vehicleOfDriver of driver.vehicles) {
                        if (vehicleOfDriver === vehicle.id) {
                          return (
                            <div key={index} >
                              <p> { driver.name } </p>
                              <p> { driver.email } </p>
                            </div>
                          )
                        }
                      }
                    })
                  }

                </li>
              )
            })
          } */}

        </ul>


      </div>
    );
  }
}

export default App;
