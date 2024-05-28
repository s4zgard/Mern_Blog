
# Reactive-Blog (MERN)

This project is a full-stack blog application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

Check out the live demo [here](https://blogreact-e1ebc0699034.herokuapp.com)

## Features

- User authentication with JWT (JSON Web Tokens)
- CRUD operations for blog posts and comments
- Client-side routing with React Router
- State management with Redux Toolkit
- Real-time database with MongoDB
- Secure password hashing with bcryptjs
- Environment variable management with dotenv
- Express.js server for API endpoints
- Vite for fast development and build times

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/s4zgard/Mern_Blog.git
   ```

2. Install dependencies:

   ```bash
   cd Mern-Blog
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

## Usage

The application consists of two main parts: the server-side API (`index.js`) and the client-side application (`client/`). 

### Server

The server-side API is built with Express.js and handles authentication, CRUD operations for blog posts and comments, and serves the client-side application.

- To start the server in development mode:

  ```bash
  yarn dev
  ```

- To start the server in production mode:

  ```bash
  yarn start
  ```

### Client

The client-side application is built with React.js and uses Vite for development and build processes. 

- To start the development server:

  ```bash
  cd client
  yarn dev
  ```

- To build the client-side application for production:

  ```bash
  cd client
  yarn build
  ```
<hr>
Feel free to copy and paste this code into your README.md file and adjust it as needed.
