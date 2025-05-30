# Employee Management System

## Getting Started
### Step 1: Clone the Repository
`git clone <repository_url>
cd <project_directory>`

### Step 2: Build and Run the Application
Run the following command to start all services:

`docker-compose up --build`

### This command will:

Build and start the PostgresSQL database service on port 5432.

Build and start the API service on port 8080.

Build and start the Angular frontend on port 4300.

## Accessing the Application

Frontend: Open your browser and navigate to http://localhost:4300.

API: Access the API at http://localhost:8080.

Database: Use any PostgreSQL client (e.g., pgAdmin) to connect to the database on localhost:5432