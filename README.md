# social media service
social media service is a mock social media website prototype designed for users to connect with friends and register using their email addresses. It provides basic functionalities such as adding friends, creating user profiles, and viewing user's friends. This project aims to demonstrate the fundamental features of a social networking platform while serving as a learning tool for web development enthusiasts.

## Key Features
- User registration and authentication via email
- Profile creation and customization
- Adding and removing friends
- A render counter in register page in real time
- A login page
- A protected page to view a user's profile by user ID, and a button to add the user as a friend, if not already added or viewing one's own profile
- A page to show a user's friends

## Design and explanations

### Framework
- FE/BE: Nextjs
- Storage & Database & Authentication & RealTime: Firebase
- Container: Docker

### REST API
- POST: /api/v1/users
Registration
- POST: /api/v1/users/login
Login
- GET: /api/v1/users/{ID}
Get user profile by ID
- PATCH: /api/v1/users/{ID}
Update User Info
- POST: /api/v1/users/{ID}/friends
Add user as friend
- GET: /api/v1/users/{ID}/friends
Get the user's friends

### Websocket event
- updateRegisterFormRenderedCount
Send the notification of count.

### Explanations
Because this service is primarily focused on developing features for social media, there is a certain demand for concurrent read and write operations. Additionally, most of the stored data is in an unstructured format. Therefore, for the database, I choose to use a NoSQL DB.

As I aim to simplify the email authentication process, I have decided to utilize Firebase for identity verification. Additionally, I leverage its existing Storage service and Realtime features, which help reduce the development costs associated with these functionalities.

## Getting Started
Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

