# Backend App Go Cab Now - Make It Real 💻

Main base of the services used within the Make It Real platforms

- Built with Node.js and Express
- Typescript
- Prisma ORM
- REST API

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org) Node >= 18.15 LTS, npm >= 9.5.x - Install with Volta.sh

## Express Router and Routes

| Route                        | HTTP Verb | Route Middleware          | Description                      |
| ---------------------------- | --------- | ------------------------- | -------------------------------- |
| /api/healthcheck             | GET       |                           | Show a simple message            |
| /api/users                   | GET       | isAuthenticated, hasRole  | Get list of all users            | 
| /api/users/single            | GET       | isAuthenticated           | Get a single users               |
| /api/users/driver-without-car| GET       | isAuthenticated, hasRole  | Get list of drivers without cars |
| /api/users                   | POST      |                           | Creates a new user               |
| /api/users/upload-img        | POST      |isAuthenticated, formData  | Upload new profile image         |
| /api/users/single            | PATCH     | isAuthenticated           | Update a single users            |
| /api/users/single            | PATCH     | isAuthenticated, hasRole  | Update user by admin role        |
| /api/users/single            | DELETE    | isAuthenticated           | Deletes a user                   |
| /api/users/:email            | DELETE    | isAuthenticated, hasRole  | Deletes an user by admin role    |


## Usage

The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a note or log in, here we have some examples.

### Authentication **user** `/auth/local/login`

Request Body:

```json
{
  "email": "jd@test.com",
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

### Developing

1. Clone the repository

2. Run `npm install` to install server dependencies.

3. Configure the env running `cp .env.example .env`

4. Update `.env` with the required info

5. Run the migrations: `prisma migrate dev`

6. Run `npm run dev` to start the development server.

## License

[MIT](LICENSE)
