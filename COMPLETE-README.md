# Fashion Designer Portfolio - MERN Stack

A sophisticated, production-grade website for fashion designers to showcase their work, manage commissions, and connect with clients. Built with MongoDB, Express, React, and Node.js.

## 🌟 Features

### Frontend
- **Elegant, Luxury Design** - Refined aesthetic with sophisticated typography and smooth animations
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **Interactive Home Page** - Hero section, featured work, skills showcase
- **Portfolio Gallery** - Separate sections for digital and hand-crafted works
- **Resume Display** - Professional timeline with education, experience, and certifications
- **Contact System** - Commission inquiries, collaborations, and general contact forms
- **Smooth Animations** - CSS and Framer Motion animations throughout

### Backend
- **User Authentication** - Secure signup, login, and JWT token management
- **Portfolio Management** - Full CRUD operations for portfolio items
- **Contact Management** - Receive and manage inquiries and commission requests
- **Email Notifications** - Automated email responses to inquiries
- **File Upload** - Images for profile, portfolio, and resume
- **Responsive APIs** - RESTful endpoints for all features

### Database
- **MongoDB** - Scalable NoSQL database
- **User Schema** - Profile, skills, resume storage
- **Portfolio Schema** - Digital and hand works with metadata
- **Contact Schema** - Inquiry tracking and management

## 📋 Project Structure

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

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone and navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` with your values:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

5. **Start the server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local file**
```bash
REACT_APP_API_URL=http://localhost:5000
```

4. **Start the development server**
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## 📚 API Endpoints

### User Routes (`/api/users`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)
- `GET /profile/:id` - Get user profile
- `PUT /update` - Update profile (protected)
- `POST /upload-image` - Upload profile image (protected)
- `POST /upload-resume` - Upload resume PDF (protected)

### Portfolio Routes (`/api/portfolio`)
- `GET /` - Get all portfolio items
- `GET /featured` - Get featured works
- `GET /category/:category` - Get items by category
- `GET /:id` - Get single portfolio item
- `POST /` - Create new portfolio item (protected)
- `PUT /:id` - Update portfolio item (protected)
- `DELETE /:id` - Delete portfolio item (protected)
- `POST /:id/like` - Like a portfolio item

### Contact Routes (`/api/contact`)
- `POST /submit` - Submit contact form
- `GET /` - Get all contacts (protected)
- `GET /:id` - Get single contact (protected)
- `PUT /:id/status` - Update contact status (protected)
- `POST /:id/reply` - Reply to contact (protected)
- `DELETE /:id` - Delete contact (protected)

## 🎨 Design Features

### Color Palette
- **Primary**: #1a1a1a (Deep Black)
- **Secondary**: #f5f5f5 (Light Gray)
- **Accent**: #d4a574 (Gold)
- **Accent Dark**: #8b7355 (Brown Gold)

### Typography
- **Display**: Playfair Display (Elegant serif)
- **Body**: Lato (Clean sans-serif)

### Animations
- Smooth fade-ins and slide animations
- Hover effects on interactive elements
- Staggered animations on page load
- Smooth scroll behavior

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User signs up/logs in
2. Server returns a JWT token
3. Token is stored in client
4. Token is sent with protected requests
5. Server validates token for protected routes

### Protected Routes
- Creating/updating/deleting portfolio items
- Updating user profile
- Accessing contact submissions
- Replying to inquiries

## 📧 Email Configuration

The backend sends email notifications:

1. **Gmail Setup**:
   - Enable 2-Factor Authentication
   - Generate App Password
   - Use App Password in EMAIL_PASSWORD

2. **Alternative Providers**:
   - Modify `EMAIL_SERVICE` in .env
   - Nodemailer supports most email providers

## 📁 File Upload

Files are uploaded to the `uploads/` directory:
- Profile images (JPG, PNG)
- Portfolio images (JPG, PNG)
- Resume PDF files

Configure max file size in .env:
```
MAX_FILE_SIZE=5242880 # 5MB
```

## 🔧 Customization

### Add More Portfolio Categories
Edit `Portfolio.js` model and filter buttons in frontend

### Modify Color Scheme
Edit CSS variables in `index.css`:
```css
:root {
  --primary: #1a1a1a;
  --accent: #d4a574;
  /* ... */
}
```

### Update Service Information
Edit the `Contact.jsx` page serviceInfo array

### Add Custom Sections
Create new page components and add to routing in `App.jsx`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy from git or docker
```

### Database (MongoDB Atlas)
1. Create free MongoDB Atlas cluster
2. Use connection string in .env
3. Set IP whitelist for security

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=app_password
DESIGNER_EMAIL=designer@example.com
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check connection string format
- Whitelist your IP in MongoDB Atlas
- Verify credentials

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASSWORD
- Enable "Less secure app" (if using Gmail)
- Use App Password if 2FA enabled

### CORS Errors
- Verify CLIENT_URL in backend .env
- Check that frontend URL matches

### Build Errors
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📚 Additional Features to Consider

- Admin dashboard for designer
- Client testimonials section
- Blog/news section
- Social media integration
- Analytics/visitor tracking
- Payment integration (Stripe/PayPal)
- Newsletter subscription
- Image optimization
- SEO optimization
- Multi-language support

## 📖 Dependencies

### Frontend
- React 18
- React Router DOM
- Axios (API calls)
- React Icons
- Framer Motion (animations)
- Intersection Observer (scroll animations)

### Backend
- Express
- MongoDB/Mongoose
- JWT for auth
- Multer for file uploads
- Nodemailer for emails
- CORS for cross-origin requests

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with passion for fashion designers worldwide** ✨
