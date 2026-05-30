# 🚀 Fashion Designer Portfolio - Installation Guide

## One-Command Setup (Recommended)

If you have both backends and frontend in the same folder:

```bash
# In main folder
npm install-all  # (requires setup script)
npm run dev-all  # Starts both frontend and backend
```

## Step-by-Step Installation

### 1️⃣ Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install packages
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fashion-portfolio
JWT_SECRET=your_super_secret_key_12345
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
DESIGNER_EMAIL=designer@example.com
DESIGNER_NAME=Your Name
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
EOF

# Create uploads folder
mkdir -p uploads

# Start server
npm start
# Server running on http://localhost:5000 ✅
```

### 2️⃣ Frontend Setup (5 minutes)

Open a NEW terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install packages
npm install

# Create .env.local file
cat > .env.local << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_BASE_URL=/api
EOF

# Start React app
npm start
# App running on http://localhost:3000 ✅
```

### 3️⃣ Database Setup (2 minutes)

#### Using MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Drivers" → Copy connection string
5. Replace `<password>` with your password
6. Paste into MONGODB_URI in `.env`

#### Using Local MongoDB

```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com
# Linux: sudo apt-get install mongodb

# Start MongoDB service
mongod

# Update MONGODB_URI in .env
MONGODB_URI=mongodb://localhost:27017/fashion-portfolio
```

### 4️⃣ Email Setup (3 minutes)

#### Gmail Setup:
1. Go to https://myaccount.google.com/
2. Security → Enable 2-Step Verification
3. App passwords → Select Mail and Windows Computer
4. Copy the 16-character password
5. Update in .env:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=16-char-app-password
   ```

#### Alternative Services:
- SendGrid
- Mailgun
- AWS SES
- Brevo (formerly Sendinblue)

## ✅ Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] MongoDB connected (no errors in terminal)
- [ ] Can access home page
- [ ] Navigation bar works
- [ ] All pages load correctly

## 📝 Test the Application

### 1. Access the Website
- Open http://localhost:3000 in your browser
- Explore all pages: Home, Portfolio, Resume, Contact

### 2. Test Contact Form
- Go to Contact page
- Fill and submit the form
- Check backend terminal for logged data

### 3. Portfolio Items (Backend Testing)
```bash
# Create sample portfolio item via API
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Design",
    "description": "A beautiful fashion design",
    "category": "Digital",
    "tags": ["fashion", "design"],
    "tools": ["Adobe XD", "Figma"]
  }'
```

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module 'express'"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "MongoDB connection failed"
- Check MONGODB_URI in .env
- Verify IP is whitelisted in MongoDB Atlas
- Ensure cluster is running

### Issue: "CORS error"
- Verify CLIENT_URL matches your frontend URL
- Restart backend server

### Issue: "Emails not sending"
- Check EMAIL_USER and EMAIL_PASSWORD
- Try a different email provider
- Check spam folder

### Issue: "Port 3000/5000 already in use"
```bash
# Kill process using port
# macOS/Linux: lsof -ti:3000 | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

## 🎨 Customizing for Your Designer

### 1. Update Profile Information
- Edit `Home.jsx` - mock profile data
- Add real profile image to `uploads/` folder
- Update resume PDF link

### 2. Customize Skills
- Edit `Resume.jsx` - skills array
- Add your specific design tools and techniques

### 3. Customize Services
- Edit `Contact.jsx` - serviceInfo array
- Update pricing and service descriptions

### 4. Update Social Links
- Edit `Footer.jsx` - social link URLs
- Edit `Contact.jsx` - social media links

### 5. Change Colors
- Edit `index.css` - CSS variables section
- Update accent color, primary color, etc.

## 🔑 Key Credentials

Save these temporarily for testing:

```
Frontend URL: http://localhost:3000
Backend URL: http://localhost:5000
API Base: http://localhost:5000/api

MongoDB: [Your Atlas connection string]
Email: [Your email address]
JWT Secret: [Your secret key]
```

## 📦 Deployment Preparation

### Before Deploying:
1. Update environment variables
2. Build frontend: `npm run build`
3. Set production MongoDB URI
4. Set secure JWT_SECRET
5. Configure email service
6. Test all forms and endpoints

### Deploy Frontend:
- Vercel: `vercel deploy`
- Netlify: Drag & drop build folder
- GitHub Pages: `npm run build` + commit

### Deploy Backend:
- Heroku: `git push heroku main`
- Railway: Connect GitHub repo
- Render: Deploy from git

## 📚 Next Steps

1. ✅ Set up the application
2. ✅ Customize for your designer
3. ✅ Add portfolio images and items
4. ✅ Set up email notifications
5. ✅ Deploy to production
6. ✅ Promote on social media

## 💬 Need Help?

- Check README.md for full documentation
- Review error messages in terminal
- Check browser console (F12) for client errors
- Test API endpoints with Postman

---

**Welcome to your new fashion portfolio website!** 🎨✨
