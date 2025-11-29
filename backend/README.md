# Backend - Easy Generator Task

This is the backend REST API for the Easy Generator Task, built with NestJS.

## Technologies Used

-   **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
-   **TypeScript**: Static typing.
-   **MongoDB & Mongoose**: Database and ODM.
-   **Passport & JWT**: Authentication strategies.
-   **Bcrypt**: Password hashing.
-   **Class Validator & Transformer**: DTO validation and transformation.

## Setup and Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the `backend` directory.
    ```env
    PORT=Port_Number
    MONGO_URI=MongoDB_URI
    JWT_SECRET=JWT_Secret
    JWT_EXPIRES_IN=1h
    FRONTEND_URL=Frontend_URL
    ```

## Available Scripts

-   `npm run start`: Starts the application.
-   `npm run start:dev`: Starts the application in watch mode (development).
-   `npm run build`: Builds the application for production.
-   `npm run test`: Runs unit tests.
-   `npm run lint`: Runs ESLint.

## API Documentation

### Authentication (`/auth`)

#### 1. Sign Up
Register a new user.

-   **Endpoint**: `POST /auth/signup`
-   **Body**:
    ```json
    {
      "email": "user@example.com",
      "name": "John Doe",
      "password": "Password123!"
    }
    ```
    -   `email`: Valid email address.
    -   `name`: String, min length 3.
    -   `password`: String, min length 8, must contain uppercase, lowercase, number, and special character.

#### 2. Log In
Authenticate a user and receive tokens.

-   **Endpoint**: `POST /auth/login`
-   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "Password123!"
    }
    ```

#### 3. Log Out
Log out the current user (clears cookies/tokens).

-   **Endpoint**: `POST /auth/logout`

#### 4. Get Homepage Data (Auth)
Get user details for the homepage. Protected route.

-   **Endpoint**: `GET /auth/homepage`
-   **Headers**:
    -   `Authorization`: `Bearer <token>` (or via cookie depending on implementation)
-   **Response**:
    ```json
    {
      "user": {
        "email": "user@example.com",
        "name": "John Doe",
        "_id": "..."
      }
    }
    ```

### General

#### 1. Get Homepage Message
Get a welcome message. Protected route.

-   **Endpoint**: `GET /homepage`
-   **Headers**:
    -   `Authorization`: `Bearer <token>`
-   **Response**:
    ```json
    {
      "message": "Welcome to the application."
    }
    ```
