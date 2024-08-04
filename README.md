
![Acebook Screenshot]()

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Front-End Setup](#front-end-setup)
  - [Back-End Setup](#back-end-setup)


## About the Project

**Acebook** is a full-stack social networking application that allows users to connect with friends, share posts, and interact through likes and comments. The initial set-up of this application (MERN stack) was provided by Makers and then built upon as a group project during the bootcamp (original project [here](https://github.com/NiamhBrown/acebook-mern-project)). I have since deployed the application using [Render](https://render.com/), and have continued to improve the project with additional features and functionalities.

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Password security**: Password salting and hashing using [bcrypt](https://www.npmjs.com/package/bcrypt).
- **Friend Management**: Search, send, and accept/deny friend requests.
- **Post Creation**: Create and publish posts to the feed page.
- **Interactive Features**: Like and comment on posts.
- **Edit user profile**: Update your user information.


## Built With

### Front-End

- [React](https://reactjs.org/)

### Back-End

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [JWT](https://jwt.io/)

## Architecture

The **Acebook** project is structured as a microservices architecture with a separate front-end react app and a back-end API server.
This current repo is the back-end, the fron-end can be found [here](https://github.com/NiamhBrown/acebook-front).

![Architecture Diagram](full-stack-architecture.png)

## Getting Started

### Prerequisites

#### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```
### Front-End Setup

1. **Clone the Front-End Repository**:

   ```bash
   git clone https://github.com/NiamhBrown/acebook-front.git
   cd acebook-front
   ```
2. **Install NPM Packages**:
   ```
   npm install
   ```
3. **Configure Environment Variables**:
Create a .env file with the following contents:
```
VITE_BACKEND_URL="https://acebook-back.onrender.com"
```

4. **Start the Front-End Development Server**:
      ```
   npm run dev
   ```
### Back-End Setup

1. **Clone the Back-End Repository**:

```bash
git clone https://github.com/NiamhBrown/acebook-back.git
cd acebook-back
```
2. **Install NPM Packages**:
   ```
   npm install
   ```
3. **Configure Environment Variables**:
Create a .env file with the following contents:

```
!!!!! THIS NEEDS UPDATING 
!!!!

```

4. **Start the Back-End Development Server**:
      ```
   npm run dev
   ```

   


