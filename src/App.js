import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       idVehicle: "",
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
         idVehicle: result[0].id,
       })
     })

   }

   render() {



    return (

      <div>

        {
          this.state.listOfDrivers.map( (driver, index) => {
            for (const vehicle of driver.vehicles) {
              if (vehicle === this.state.idVehicle) {
                return (
                  <p key={index} > {driver.name} </p>
                )
              }
            }
          })
        }

      </div>



    );
  }
}

export default App;
