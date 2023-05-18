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

### Make a Reservation in a coach for booking seats

### List all seats of all coaches
