import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       listOfvehicles: [],
       listOfDrivers: [],
     }
   }

   componentDidMount() {

     //Drivers
     fetch("http://localhost:3000/drivers")
     .then(response => response.json())
     .then(result => {
       this.setState({
         listOfDrivers: result,
       })
     })

     //Vehicle
     fetch("http://localhost:3000/vehicles")
     .then(response => response.json())
     .then(result => {
       this.setState({
         listOfvehicles: result,
       })
     })

   }

   render() {

    return (

      <ul>

        {
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
        }

      </ul>



    );
  }
}

export default App;
