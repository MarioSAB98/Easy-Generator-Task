# Frontend - Easy Generator Task

This is the frontend application for the Easy Generator Task, built with React and Vite.

## Technologies Used

-   **React**: UI Library
-   **Vite**: Build tool and development server
-   **TypeScript**: Static typing
-   **TailwindCSS**: Utility-first CSS framework
-   **Axios**: HTTP client
-   **React Router**: Routing
-   **React Hook Form**: Form handling
-   **Zod**: Schema validation

## Setup and Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the `frontend` directory based on `.env.example`.
    ```env
    VITE_API_URL=BACKEND_URL
    ```

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Previews the production build locally.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

-   `src/components`: Reusable UI components.
-   `src/pages`: Application pages (routes).
-   `src/api`: API integration logic (axios instances, interceptors).
-   `src/App.tsx`: Main application component and routing setup.
