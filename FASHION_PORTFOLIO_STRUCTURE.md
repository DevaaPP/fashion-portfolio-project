# Fashion Designer Portfolio - MERN Stack

## Project Structure

```
fashion-designer-portfolio/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PortfolioCard.jsx
│   │   │   ├── SkillTag.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── assets/
│   │   │   └── styles/
│   │   │       └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env.local
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Portfolio.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── portfolioRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── portfolioController.js
│   │   └── contactController.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

### Backend Setup
```bash
cd backend
npm install
# Create .env file with MongoDB URI, JWT secret
npm start
# Runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## Key Features
- Interactive homepage with sections
- Separate portfolio galleries (Digital & Hand Works)
- Resume display section
- Contact form with commission inquiries
- Responsive design
- Admin panel ready for designer updates
