# TrainReservationApi


- [Getting started with the Project](#getting-started-with-the-project)
- [How to use the API](#how-to-use-the-api)
   - [Create Coach with 80 seats](#create-coach-with-80-seats)
   - [Get Available Seats](#get-available-seats)
   - [Make a Reservation in a coach for booking seats](#make-a-reservation-in-a-coach-for-booking-seats)
   - [List all seats of all coaches](#list-all-seats-of-all-coaches)

## Getting started with the project

## Project Setup : 

- Clone the repo.
- `npm i` or `npm install`.
- Set-up `.env` file to add your environment variables.
    - `PORT = <PORT>`
    -  `MONGO_URL = <Your MongoDB URL(Or MongoDB ATLAS connection string) `

- .env example :
    ``` 
    PORT=5000
    MONGO_URL=mongodb+srv://<username>:<password>@abcd.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
    ```
- After basic configuration, run the server in your local machine :
    ```   
     npm run dev or npm start 
    ```


## How to use the API

### Create Coach With 80 Seats
- first of all we must have available seats to make a reservation. So create a coach with 80 seats with coach specifications as follows:
  - coach details:
    ```
        {
            "coach_number":5,
            "coach_type": "2A",
            "coach_designation": "AC two tier",
            "caoch_seats": "7 seats in a row",
            "total_seats":80
        }
    ```
  - Now hit the api:    
     ```
         http://localhost:5000/api/v1/initializeCoach
     ```
  - On successfull response, we will get the following response:
     ```
      "msg": "2A Caoch with 80 seats created successfully!!"
     ```

### Get Available Seats
- To view how many seats are available:
  - Select Coach type:
    ```
     {
       "coach_type": "CC"
     } 
    ```
  - Hit the following api to view the available seats of particular caoch:
    ```
     http://localhost:5000/api/v1/seat/available
    ```
- On successfull response, we must be able to see the data as follows:
  ```
   {
     "coach_type": "CC",
     "remaining_seats": 60,
     "total_seats": 80,
     "availableSeats": [
        {
            "_id": "646664bf7dc8ee2d14a21643",
            "seatNumber": 5,
            "isReserved": false,
            "coach": "646664bf7dc8ee2d14a21639",
            "coach_type": "CC",
            "coach_designation": "AC Chair Car",
            "__v": 0
        },
        .
        .
        .
        {
            "_id": "646664c67dc8ee2d14a216b9",
            "seatNumber": 64,
            "isReserved": false,
            "coach": "646664bf7dc8ee2d14a21639",
            "coach_type": "CC",
            "coach_designation": "AC Chair Car",
            "__v": 0
        }
        ]
    }
  ```   


### Make a Reservation in a coach for booking seats
- To make a reservation, one must select valid number of seats
- A person is allowed to book seats between range 1-7.
  - Provide the details about how many reservations you want to make in specific coach:
    ```
     {
       "coach_type": "SL",
       "totalSeats":5
     }
    ```
  - Now hit the following api, to book the seats:
    ```
     http://localhost:5000/api/v1/seat/book
    ```  
-  On successfull response, we will get our reservation details as follows:
  ```
   {
      "message": "Seats booked successfully.",
      "seats": [
        {
            "id": "64666c3759051d5a4446ba35",
            "seatNumber": 73
        },
        {
            "id": "64666c3759051d5a4446ba37",
            "seatNumber": 74
        },
        {
            "id": "64666c3759051d5a4446ba39",
            "seatNumber": 75
        },
        {
            "id": "64666c3759051d5a4446ba3b",
            "seatNumber": 76
        },
        {
            "id": "64666c3759051d5a4446ba3d",
            "seatNumber": 77
        }
    ],
    "totalSeatsLeft": 70
   }
  ``` 
### List all seats of all coaches
- To list all the coaches with all seats, hit the api:
  ```
  http://localhost:5000/api/v1/seat/all
  ```
- On successfull response, the data will look like:  
  ```
   {
    "total_coach": 5,
    "total_seats": 400,
    "coach": [
         {
            "_id": "646664bf7dc8ee2d14a21639",
            "coach_number": 1,
            "coach_type": "CC",
            "coach_designation": "AC Chair Car",
            "caoch_seats": "7 seats in a row",
            "total_seats": 80,
            "seats": [ ...
             ],
             "__v": 1
         },
         {
            "_id": "646665b65816b143b292aa0d",
            "coach_number": 2,
            "coach_type": "EC",
            "coach_designation": "Executive Chair Car",
            "caoch_seats": "7 seats in a row",
            "total_seats": 80,
            "seats": [...
            ],
            "__v": 1
         },
         {
            "_id": "64666bb259051d5a4446b8fe",
            "coach_number": 3,
            "coach_type": "1A",
            "coach_designation": "AC First Class",
            "caoch_seats": "7 seats in a row",
            "total_seats": 80,
            "seats": [...
             ],
            "__v": 1
         },
         {
            "_id": "64666c3159051d5a4446b9a3",
            "coach_number": 4,
            "coach_type": "SL",
            "coach_designation": "Sleeper Class",
            "caoch_seats": "7 seats in a row",
            "total_seats": 80,
            "seats": [...
             ],
            "__v": 1
         },
         {
            "_id": "646697d0d43e01b10fb88252",
            "coach_number": 5,
            "coach_type": "2A",
            "coach_designation": "AC two tier",
            "caoch_seats": "7 seats in a row",
            "total_seats": 80,
            "seats": [...
             ],
            "__v": 1
         } 
      ]
   }  
  ```

  