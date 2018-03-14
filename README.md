# OnTruck Front-end Exercise

## Objective

The goal of this exercise is to complete the User Stories listed below. You can choose any stack to implement the solution, without restriction. Feel free to use a framework (Angular...), a library (React...), Vanilla JS, ~~jQuery~~, or whatever you want.

Please find attached a design, try to make the layout as accurate as possible.

We know that the user stories are not well detailed. You should make any and all decisions while coding the solution, but feel free to ask if something is not clear.

We will evaluate:

- Clean code.
- Execution speed.
- Design / User Story fidelity.
- Creative decisions where the story is not accurate.

We will not evaluate:

- Taskrunner code (Webpack, Gulp...)

## Design

Feel free to ask any questions about the design

![Design](design.png)

## User stories

### As operator at OnTruck, I want to see a list of vehicles ordered by size (desc) so I can see the biggest vehicles first

- The design will be 3 columns at full screen width (feel free to make it responsive), with the information flowing from left to right, and then from top to bottom.

### As operator at OnTruck, I want to see the number of drivers per vehicle

![Driver names](driver-names.png)

### As operator at OnTruck, I want search vehicles which have drivers by the driver's name or email, by writting in a field so I can find a specific driver

![Search fields](search-fields.png)

## Technical documentation

### Setting up the server (NodeJS)

```bash
git clone git@github.com:ontruck/challenges.git
cd challenges/frontend-challenge
npm install
npm run mocks
```

### Business data

Vehicle sizes:
> `full_trailer > rigid_truck > box_van > van`

### Backend endpoints

`[GET] http://localhost:3000/vehicles`:

- Returns a list of vehicles ordered by id.
- The size of the list is a random number between 0 and 100.

```json
[
    {
        "id": 1,
        "plate_number": "1234ABC",
        "type": "full_trailer | semi_trailer | rigid_truck | box_van | van"
    }
]
```

`[GET] http://localhost:3000/drivers`:

- Returns a list of drivers ordered by id.
- The size of the list is a random number between 0 and 100.
- The request has a random delay between 500 and 2000 ms.
- Each driver has a list of 0 to 50 random related vehicles.

```json
[
   {
      "id": 373,
      "name": "Dashawn Watsica",
      "email": "Abby.Wilderman@yahoo.com",
      "vehicles": [
         48,
         19,
         15,
         47
      ]
   }
]
```
