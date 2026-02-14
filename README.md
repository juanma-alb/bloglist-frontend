# Bloglist App (Frontend)

A modern, responsive React application designed to help users share, list, and rate interesting blog articles found on the web. This repository contains the **frontend** logic, built with React 19 and Vite.

## Features

* **User Authentication:** Secure login and logout functionality.
* **CRUD Operations:** Users can create new blog posts and delete their own posts.
* **Rating System:** "Like" functionality to rate blogs.
* **Sorting:** Blogs are automatically sorted by popularity (number of likes).
* **Toggleable UI:** Clean interface with hide/show mechanisms for forms and details to improve UX.
* **Notification System:** Real-time feedback for user actions (success, error, and info messages).
* **Responsive Design:** Styled with custom CSS objects and Flexbox for a polished look.

## Tech Stack

**Core:**
* **React 19**
* **Vite:** Next Generation Frontend Tooling for fast development and building.
* **Axios:** Promise-based HTTP client for the browser to communicate with the backend.

**Quality & Linting:**
* **ESLint** 
* **@stylistic/eslint-plugin:** Enforces consistent ESLint rules.

## Backend (Context)
* This frontend consumes a REST API built with **Node.js, Express, and MongoDB** located in a separate repository, you can clone the backend repository [Here](https://github.com/juanma-alb/blog-list-backend).

##  Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository**
    

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Backend:**
    ```bash
    npm run dev
    ```
    * *Note:* This application requires the  [Bloglist Backend](https://github.com/juanma-alb/blog-list-backend) to be running. Ensure your backend server is active (on port 3003).

4.  **Run the Frontend:**
    ```bash
    npm run dev // (or npx vite)
    ```
     (`http://localhost:5173`).

##  Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode using Vite.

### `npm run lint`
Runs ESLint to check the code for errors and stylistic issues.
> *Note: This project follows specific linting rules defined in `eslint.config.js`.*

### `npm run build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Locally preview the production build.

##  Contributing

Contributions, issues, and feature requests are welcome!


##  License

This project is part of the **Full Stack Open** course curriculum.

---
*Developed by juanma-alb as part of my ongoing training in web development.*