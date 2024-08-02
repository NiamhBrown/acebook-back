![Acebook Screenshot](https://user-images.githubusercontent.com/your-username/your-repo/main/screenshot.png)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Front-End Setup](#front-end-setup)
  - [Back-End Setup](#back-end-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## About the Project

**Acebook** is a full-stack social networking application that allows users to connect with friends, share posts, and interact through likes and comments. The initial set-up of this application (MERN stack) was provided by Makers and then built upon as a group project during the bootcamp (original project [here](https://github.com/NiamhBrown/acebook-mern-project)). I have since deployed the application and have continued to improve the project with additional features and functionalities.

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
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [JWT](https://jwt.io/)

## Architecture

The **Acebook** project is structured as a microservices architecture with a separate front-end react app and a back-end API server.

![Architecture Diagram](images/full-stack-architecture.png)
