# Backend Go Cab Now App 💻

Main base of the services used within the Go Cab Now App

- Built with Node.js and Express
- Typescript
- Prisma ORM
- REST API

## Prerequisites 📋

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org) Node >= 18.15 LTS, npm >= 9.5.x - Install with Volta.sh

## Installation 🔧

   1. Clone the repository: https://github.com/GomezJuanEfe/go-cab-now-backend

   2. Run npm install or yarn to install server dependencies.

## 🛠️ Local development

    npm run dev
    Or you can use
    $ yarn dev


## Express Router and Routes

## Auth Local

| Route                                            | HTTP Verb | Description                          |
| ------------------------------------------------ | ----------| ------------------------------------ |
| /auth/local/activate-account/:token              | GET       | Active account, for new user         |
| /auth/local/generate-token-forgot-password/:email| GET       | Get token to recover the password    | 
| /auth/local/check-token-forgot-password/:token   | GET       | Verify token to recover the password |
| /auth/local/reset-password/:token                | GET       | To reset password for an created user|
| /auth/local/login                                | POST      | User login                           |

## User Routes

| Route                        | HTTP Verb | Route Middleware          | Description                      |
| ---------------------------- | --------- | ------------------------- | -------------------------------- |
| /api/healthcheck             | GET       |                           | Show a simple message            |
| /api/users                   | GET       | isAuthenticated, hasRole  | Get list of all users            | 
| /api/users/single            | GET       | isAuthenticated           | Get a single users               |
| /api/users/driver-without-car| GET       | isAuthenticated, hasRole  | Get list of drivers without cars |
| /api/users                   | POST      |                           | Creates a new user               |
| /api/users/upload-img        | POST      | isAuthenticated, formData | Upload new profile image         |
| /api/users/single            | PATCH     | isAuthenticated           | Update a single users            |
| /api/users                   | PATCH     | isAuthenticated, hasRole  | Update user by admin role        |
| /api/users                   | DELETE    | isAuthenticated           | Deletes a user                   |
| /api/users/:email            | DELETE    | isAuthenticated, hasRole  | Deletes an user by admin role    |

## Trip Routes

| Route                        | HTTP Verb | Route Middleware          | Description                      |
| ---------------------------- | --------- | ------------------------- | -------------------------------- |
| /api/trips                   | GET       | isAuthenticated, hasRole  | Get list of all trips            |
| /api/trips/single            | GET       | isAuthenticated, hasRole  | Get a single trips               | 
| /api/trips/user-trips        | GET       | isAuthenticated           | Get trips by user                |
| /api/trips/cars-trips        | GET       | isAuthenticated, hasRole  | Get trips by car id              |
| /api/trips                   | POST      | isAuthenticated, hasRole  | Creates a new trip               |
| /api/trips/single            | PATCH     | isAuthenticated           | Update a single trips            |
| /api/trips/                  | DELETE    | isAuthenticated           | Deletes a trip                   |

## Car Routes

| Route                 | HTTP Verb | Route Middleware                  | Description                       |
| ----------------------| --------- | --------------------------------- | ----------------------------------|
| /api/cars             | GET       | isAuthenticated                   | Get list of all cars              |
| /api/cars/single/:id  | GET       | isAuthenticated, hasRole          | Get a single cars                 | 
| /api/cars/paginated   | GET       | isAuthenticated                   | Get cars for pagination           |
| /api/cars             | POST      | isAuthenticated, hasRole, formData| Creates a new cars, upload image  |
| /api/cars/:id         | PATCH     | isAuthenticated, hasRole, formData| Update a single cars, update image|
| /api/cars/:id         | DELETE    | isAuthenticated                   | Deletes a car                     |

## Payment Routes

| Route                       | HTTP Verb | Route Middleware| Description              |
| ----------------------------| --------- | --------------- | -------------------------|
| /api/payment/               | POST      |                 | Create payment in stripe | 
| /api/payment/create-payment | POST      |                 | Creates a payment        |

## Usage

The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a note or log in, here we have some examples.

## Database

**Setup and Migration**

This project uses Prisma as the ORM (Object-Relational Mapping) tool to manage the database. Follow these steps to set up and migrate the database:

**1. Install Prisma**

  npm install -g prisma
  or
  yarn global add prisma


**2. Database Migration**

  **Create a new migration**

    npx prisma migrate dev
    or 
    npx prisma db push

**4. Create Seeders**

  `Seed the database with initial data`

    npx prisma db seed


### Authentication **user** `/auth/local/login`

This backend application uses JWT (JSON Web Tokens) for authentication. Users can obtain an access token by providing valid credentials (email and password)

Request Body:

```json
{
  "email": "pp@test.com",
  "password": "1234"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbTB4MHpleDAwMDB1bHZodjZtZXVhbTkiLCJlbWFpbCI6ImF2QHRlc3QuY29tIiwiaWF0IjoxNjk0ODMyNjcxLCJleHAiOjE2OTQ5MTkwNzF9.fpD5shIH6Wuh-2G3P88MWVyEuYo_33zt4q_f3i1NmJI",
  "profile": {
    "id": "62fd77a4d25acc4a4e5df3d1",
    "firstName": "Pepito",
    "lastName": "Perez",
    "email": "pp@test.com"
  }
}
```

### Basic example **Create User** `/api/users`

Request Body:

```json
{
  "name": "Pepito Perez",
  "email": "pp@test.com",
  "password": "1234"
}
```

Response:

```json
{
  "name": "Pepito Perez",
  "email": "pp@test.com",
  "role": "USER"
}
```

### Developing 🛠️

1. Clone the repository

2. Run `npm install` to install server dependencies.

3. Configure the env running `cp .env.example .env`

4. Update `.env` with the required info

5. Run the migrations: `prisma migrate dev`

6. Run `npm run dev` to start the development server.

## License

This project is licensed under the [MIT](LICENSE).

## Authors 👥✒️

- Juan Felipe Gomez - (https://github.com/GomezJuanEfe)
- Andrea Vargas - (https://github.com/PVARGASM1)
- Daniel Hincape Vargas - (https://github.com/danielhincapievargas)


