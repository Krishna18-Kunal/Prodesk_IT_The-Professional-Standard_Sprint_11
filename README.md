# Prodesk IT – Sprint 11
## The Professional Standard: MERN Stack Integration & Quality Assurance

A full-stack web application developed as part of **Prodesk IT Sprint 11**, focusing on frontend-backend integration and professional development practices.

## Project Structure

```text
Prodesk_IT_The-Professional-Standard_Sprint_11/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Post.js
│   │   ├── routes/
│   │   │   └── posts.js
│   │   ├── server.js
│   │   ├── .env.example
│   │   └── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── PROMPTS.md
```

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- JavaScript
- MongoDB integration (as configured in the backend)

### Development Tools
- Git and GitHub
- npm
- Visual Studio Code
- Postman (API testing)

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB connection, if required by the backend configuration
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Krishna18-Kunal/Prodesk_IT_The-Professional-Standard_Sprint_11.git
```

```bash
cd Prodesk_IT_The-Professional-Standard_Sprint_11
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` and configure the required environment variables.

Start the backend using the development script configured in `backend/package.json`.

```bash
npm run
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file using `.env.example` and configure the required frontend environment variables.

Start the frontend using the script configured in `frontend/package.json`.

```bash
npm run
```

## Quality Assurance

The project follows a development workflow focused on:

- Frontend and backend integration
- API request and response handling
- Input and error handling
- Backend route and model organization
- Testing and debugging during development

## Environment Variables

Environment files containing credentials and secrets are excluded from version control.

Use the provided `.env.example` files as references for local configuration.

## Author

**Krishna Kunal**

---

*Developed as part of the Prodesk IT Engineering Residency – Sprint 11.*
