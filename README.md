# Chatz Web App

Chatz is a real-time chat application built with the MERN stack and Tailwind CSS.

## Deployment

### Frontend (React)

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure socket url:**
   

    change url
   [SocketContext.jsx](./frontend/src/context/SocketContext.jsx)
   


4. **Run the app:**

    ```bash
    npm start
    ```

5. **Access the app:**

    Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Backend (Node.js)

1. **Navigate to the server directory:**

    ```bash
    cd ../server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set environment variables:**

    - Create a `.env` file in the `server` directory.
    - Add the following variables:

      ```dotenv
      PORT=<port_number>
      MONGODB_URI=<your_mongodb_connection_string>
      ```

4. **Run the server:**

    ```bash
    npm start
    ```

5. **Server will run at:**

    [http://localhost:<port_number>](http://localhost:<port_number>)

## Features

- **Real-time Messaging:** Implemented using Socket.IO for real-time communication.
- **Database:** MongoDB used for storing chat messages and user data.
- **Styling:** UI designed using Tailwind CSS for a sleek and responsive design.

## Deployment Link

The Chatz app is deployed at [https://chatz-nnea.onrender.com](https://chatz-nnea.onrender.com).

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
