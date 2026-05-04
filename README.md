# Dishcovery - Recipe Website 

A simple recipe website where you can browse Indian recipes, register an account, and even chat with a bot about recipes!

## What This Project Does

- **Browse Recipes**: See delicious Indian recipes like Butter Chicken, Biryani, Dosa, and more
- **User Registration & Login**: Create your own account to save favorites
- **Add New Recipes**: Share your own recipes with others
- **Chatbot**: Ask questions about recipes and get instant answers
- **Contact & Feedback**: Send messages and feedback to the website

## Technologies Used

- **Frontend**: React (with Vite for faster development)
- **Backend**: Node.js + Express
- **Database**: MongoDB (stores users and recipes)
- **Styling**: CSS

## What You Need Before Starting

Make sure you have these installed on your computer:
- **Node.js** (download from nodejs.org)
- **MongoDB** (download from mongodb.com)

## How to Run This Project

### Step 1: Install All Dependencies
Open PowerShell in the project folder and run:
```
npm install
```

### Step 2: Start MongoDB Database
Open a **new PowerShell window** and run:
```
mongod --dbpath="mongodb-data"
```
Keep this window open while using the website.

### Step 3: Start the Backend Server
Open **another PowerShell window** and run:
```
npm run server
```

### Step 4: Start the Frontend
Open **one more PowerShell window** and run:
```
npm run dev
```

### Step 5: Open in Browser
Go to your browser and visit: `http://localhost:5173` (If running locally)

### Step 6: Add API Key for Chatbot (Important!)
Open `src/chatbot.jsx` or `src/ChatBotPage.jsx` and add your chatbot API key where needed.

## Pages Available

- Home Page
- Login
- Registration
- Recipes
- Add Recipe
- Chatbot
- Contact
- Feedback 

## Project Structure

```
project/
├── src/                    # Frontend React files
│   ├── App.jsx            # Main app component
│   ├── Home.jsx           # Home page
│   ├── Login.jsx          # Login page
│   ├── Recipe.jsx         # Recipe listing page
│   └── ...                # Other pages
├── backend/
│   └── server.js          # Backend API server
├── mongodb-data/          # Database files (local storage)
├── public/                # Public assets
└── package.json           # Project dependencies
```

## What I Learned

This is a great project to learn:
- How frontend (React) talks to backend (Node.js)
- How to store data in a database (MongoDB)
- How user authentication works (login/register)
- How to build a complete website from scratch

  


