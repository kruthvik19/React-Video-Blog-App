# Video Management App

This project is a Video Management Application built with React, Chakra UI, Firebase, and React Router. The app allows users to browse, create, update, and search for videos. It also supports user authentication via Google Sign-In.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with Google Sign-In
- Browse videos by category
- Create, update, and view video details
- Search functionality for videos
- Responsive design using Chakra UI

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- A Firebase account


### Install Dependencies:

```bash
npm install
```

### Set up Firebase

1. **Create a Firebase project in the Firebase Console.**
2. **Enable Authentication** (Google Sign-In).
3. **Set up Firestore** as your database.
4. **Copy your Firebase configuration details.**

### Create `firebase-config.js`

1. Create a `firebase-config.js` file in the `src` directory and add your Firebase configuration:

   ```javascript
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   export const firebaseApp = initializeApp(firebaseConfig);


## Start the Development Server

To start the development server, run the following command:

```bash
npm start
```

-The app will run on http://localhost:3000.

## Usage

### Logging In

- On the login page, click "Sign in with Google".
- Upon successful login, you'll be redirected to the home page.

### Browsing Videos

- The home page displays a feed of videos.
- Use the category list on the left to filter videos by category.

### Creating and Updating Videos

- Authenticated users can create new videos by navigating to the "Create" page.
- To update a video, navigate to its detail page and click the "Update" button.

### Searching for Videos

- Enter a search term in the search bar at the top of the page.
- The search results will be displayed on the "Search" page.

## Project Structure

```plaintext
src/
│
├── Components/
│   ├── Category.js
│   ├── Create.js
│   ├── Feed.js
│   ├── NavBar.js
│   ├── Search.js
│   ├── UserProfile.js
│   ├── VideoPinDetail.js
│   └── UpdateVideo.js
│
├── data/
│   └── categories.js
│
├── img/
│   └── musicbg.jpg
│
├── pages/
│   ├── Home.js
│   └── Login.js
│
├── firebase-config.js
├── App.js
├── index.js
└── ... (other files)

```


## Components Overview

- **Home**: The main layout of the app, includes the `NavBar`, category list, and routes for different pages.
- **Login**: Handles user authentication via Google Sign-In and redirects to the home page.
- **Category**: Displays individual categories.
- **Feed**: Shows a list of videos, which can be filtered by category.
- **Create**: Allows users to create new video entries.
- **Search**: Displays search results based on the user's input.
- **UserProfile**: Shows user profile details.
- **VideoPinDetail**: Displays detailed information about a specific video.
- **UpdateVideo**: Allows users to update existing video details.


