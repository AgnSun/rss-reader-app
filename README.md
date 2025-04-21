# RSS Reader

This project is a simple **RSS Reader** application. It lets you subscribe to RSS feeds and view articles from many different websites in one place.

**RSS (Really Simple Syndication)** is an older but still useful technology that allows users to follow updates from websites like blogs or news portals.

---

## Features

- **Add and delete feeds** – Add new RSS feeds using their URL and delete existing ones.
- **See all articles** – View all articles from your feeds in one list, sorted by publication date.
- **Read one article** – Open a full view of an article to read its content.
- **Filter by feed** – Show only articles from one selected feed.
- **Save feeds locally** – Feeds and settings are saved in your browser (localStorage), so they stay after refresh.
- **Mark unread/read** – Articles are marked as read or unread. You can filter by read/undread/all.
- **Favorite articles** – Mark articles as favorites to find them quickly later in separate list.

> For testing, you can use public RSS feeds from NASA:  
> https://www.nasa.gov/rss-feeds

---

## Used Technologies

### Frontend

- **React** + **TypeScript**
- **Vite** – A fast development server and bundler for web projects.
- **Redux Toolkit** – State management made simple and efficient with Redux.
- **Redux-persist** – Stores Redux state (like feeds and favorites) in browser localStorage.
- **MUI (Material UI)** – A UI component library with a clean and modern design.
- **React-router-dom** – Used to navigate between pages.
- **Date-fns** – A lightweight library for working with dates (e.g., formatting, sorting).
- **Responsive view** – The app is responsive and works well on desktop and mobile devices.

### Backend

- **rss-parser** – A library that parses RSS feeds into JSON.
- **Node.js + Express** – A simple backend server to handle RSS feed parsing (useful for CORS issues in the browser).

---

## How to Run the Project Locally

Follow these steps to run the app and backend locally on your machine:

### Frontend

### 1. Clone the repository

```bash
git clone https://github.com/AgnSun/rss-reader-app.git
```

### 2. Install frontend dependencies

```bash
cd rss-reader-app
npm install
# or
yarn install
```

### 3. Start the frontend development server

```bash
npm run dev
# or
yarn dev
```

The frontend will usually run at http://localhost:5173

### Backend

### 1. Go to the server directory in new terminal

```bash
cd server
```

### 2. Install backend dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the backend server

```bash
npm run dev
# or
yarn dev
```

---

## Future Improvements

There are several features and improvements that could be added in the future to make the app better:

- **More tests** – Add more unit and integration tests using Vitest to cover key features.
- **Better error handling** – Use libraries like `notistack` or MUI Snackbar to display user-friendly messages when an error happens (e.g. invalid feed URL, connection problems).
- **Search** – Allow users to search articles by title/content.
- **Theme support** – Add a light/dark theme switcher using MUI theming.
