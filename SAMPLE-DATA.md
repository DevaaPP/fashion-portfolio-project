# Sample Data for Testing

## 🌱 Seed Your Database

Use this data to populate your MongoDB database for testing and demo purposes.

## 👤 Sample Designer Profile

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alexandra Chen",
  "email": "alex@fashiondesigner.com",
  "password": "hashed_password_here",
  "bio": "Innovative fashion designer passionate about blending digital innovation with traditional hand-craftsmanship",
  "profileImage": "/uploads/profile-alex.jpg",
  "about": "With over 7 years of experience in the fashion industry, I specialize in creating bespoke designs that tell stories. My work combines cutting-edge digital design tools with meticulous hand-crafted techniques.",
  "resume": "/uploads/resume-alex.pdf",
  "socialLinks": {
    "instagram": "https://instagram.com/alexchendesigns",
    "linkedin": "https://linkedin.com/in/alexandrachen",
    "behance": "https://behance.net/alexchen",
    "twitter": "https://twitter.com/alexchendesign"
  },
  "skills": [
    {
      "skill": "Fashion Illustration",
      "proficiency": "Expert"
    },
    {
      "skill": "Adobe Creative Suite",
      "proficiency": "Expert"
    },
    {
      "skill": "Pattern Design",
      "proficiency": "Expert"
    },
    {
      "skill": "Embroidery Design",
      "proficiency": "Expert"
    },
    {
      "skill": "Figma",
      "proficiency": "Intermediate"
    },
    {
      "skill": "Textile Design",
      "proficiency": "Intermediate"
    }
  ],
  "isApproved": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T15:45:00Z"
}
```

## 🎨 Sample Portfolio Items

### Digital Work Example 1

```json
{
  "_id": "607f1f77bcf86cd799439012",
  "title": "Ethereal Summer Collection",
  "description": "A modern digital collection featuring flowing silhouettes and pastel color palettes inspired by nature. This collection showcases advanced fashion illustration techniques combined with digital design.",
  "category": "Digital",
  "images": [
    "/uploads/digital-summer-1.jpg",
    "/uploads/digital-summer-2.jpg",
    "/uploads/digital-summer-3.jpg"
  ],
  "tags": ["Digital Design", "Fashion Illustration", "Summer Collection", "Conceptual"],
  "tools": ["Adobe Illustrator", "Photoshop", "Figma"],
  "completionDate": "2024-01-10T00:00:00Z",
  "featured": true,
  "designer": "507f1f77bcf86cd799439011",
  "viewCount": 245,
  "likes": 89,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T15:45:00Z"
}
```

### Digital Work Example 2

```json
{
  "_id": "607f1f77bcf86cd799439013",
  "title": "Urban Streetwear Line",
  "description": "Contemporary streetwear designs blending minimalism with bold typography. Created entirely in Figma for seamless digital-to-production workflow.",
  "category": "Digital",
  "images": [
    "/uploads/streetwear-1.jpg",
    "/uploads/streetwear-2.jpg"
  ],
  "tags": ["Streetwear", "Minimalist", "Typography", "Urban"],
  "tools": ["Figma", "Adobe XD"],
  "completionDate": "2024-01-05T00:00:00Z",
  "featured": true,
  "designer": "507f1f77bcf86cd799439011",
  "viewCount": 312,
  "likes": 156,
  "createdAt": "2024-01-10T08:20:00Z",
  "updatedAt": "2024-01-18T12:30:00Z"
}
```

### Hand Work Example 1

```json
{
  "_id": "607f1f77bcf86cd799439014",
  "title": "Embroidered Heritage Collection",
  "description": "Hand-embroidered evening wear featuring traditional motifs with modern interpretation. Each piece is meticulously crafted with silk thread and seed beads.",
  "category": "Hand",
  "images": [
    "/uploads/embroidery-1.jpg",
    "/uploads/embroidery-2.jpg",
    "/uploads/embroidery-detail.jpg"
  ],
  "tags": ["Embroidery", "Hand-Crafted", "Evening Wear", "Heritage"],
  "tools": ["Silk Thread", "Seed Beads", "Hand Stitching"],
  "completionDate": "2024-01-20T00:00:00Z",
  "featured": true,
  "designer": "507f1f77bcf86cd799439011",
  "viewCount": 198,
  "likes": 134,
  "createdAt": "2024-01-12T14:15:00Z",
  "updatedAt": "2024-01-21T09:45:00Z"
}
```

### Hand Work Example 2

```json
{
  "_id": "607f1f77bcf86cd799439015",
  "title": "Beaded Cocktail Dress",
  "description": "Custom beaded cocktail dress featuring hand-sewn Swarovski crystals and precision beading. A luxurious one-of-a-kind piece.",
  "category": "Hand",
  "images": [
    "/uploads/beaded-dress-1.jpg",
    "/uploads/beaded-dress-2.jpg",
    "/uploads/beaded-detail.jpg"
  ],
  "tags": ["Beadwork", "Cocktail Dress", "Luxury", "Crystal"],
  "tools": ["Swarovski Crystals", "Hand Beading", "Custom Tailoring"],
  "completionDate": "2024-01-18T00:00:00Z",
  "featured": false,
  "designer": "507f1f77bcf86cd799439011",
  "viewCount": 154,
  "likes": 92,
  "createdAt": "2024-01-14T11:20:00Z",
  "updatedAt": "2024-01-19T16:30:00Z"
}
```

## 📧 Sample Contact Submissions

### Commission Inquiry

```json
{
  "_id": "707f1f77bcf86cd799439016",
  "name": "Emma Rodriguez",
  "email": "emma.rodriguez@email.com",
  "phone": "+1-555-123-4567",
  "subject": "Custom Wedding Dress Commission",
  "message": "I'm looking for a custom wedding dress design. I want something unique that combines elegance with modern elements. I'm interested in seeing your embroidery work.",
  "type": "Commission",
  "commissionDetails": {
    "budget": "$3000 - $5000",
    "deadline": "2024-06-15T00:00:00Z",
    "description": "Custom white and gold embroidered wedding dress with flowing train"
  },
  "status": "Unread",
  "designer": null,
  "createdAt": "2024-01-22T08:30:00Z",
  "updatedAt": "2024-01-22T08:30:00Z"
}
```

### Collaboration Request

```json
{
  "_id": "707f1f77bcf86cd799439017",
  "name": "Marcus Chen",
  "email": "marcus@fashionbrand.com",
  "phone": "+1-555-987-6543",
  "subject": "Collaboration Opportunity - Fashion Brand",
  "message": "We love your aesthetic and would like to collaborate on a capsule collection. Your digital design style aligns perfectly with our brand vision.",
  "type": "Collaboration",
  "status": "Unread",
  "designer": null,
  "createdAt": "2024-01-21T14:20:00Z",
  "updatedAt": "2024-01-21T14:20:00Z"
}
```

### General Inquiry

```json
{
  "_id": "707f1f77bcf86cd799439018",
  "name": "Sophie Taylor",
  "email": "sophie.taylor@email.com",
  "subject": "Design Workshop Inquiry",
  "message": "Hi! I'm interested in attending one of your fashion design workshops. When do you offer them?",
  "type": "Inquiry",
  "status": "Unread",
  "designer": null,
  "createdAt": "2024-01-20T10:15:00Z",
  "updatedAt": "2024-01-20T10:15:00Z"
}
```

## 🗄️ MongoDB Insertion Commands

### Create Collections

```javascript
// In MongoDB shell or Mongoose

// Insert Designer Profile
db.users.insertOne({
  name: "Alexandra Chen",
  email: "alex@fashiondesigner.com",
  password: "hashed_password",
  bio: "Fashion designer with 7+ years experience",
  skills: [
    { skill: "Fashion Illustration", proficiency: "Expert" },
    { skill: "Adobe Creative Suite", proficiency: "Expert" },
    { skill: "Pattern Design", proficiency: "Expert" },
    { skill: "Embroidery Design", proficiency: "Expert" }
  ],
  isApproved: true
});

// Insert Featured Portfolio Items
db.portfolios.insertMany([
  {
    title: "Ethereal Summer Collection",
    description: "Modern digital collection...",
    category: "Digital",
    featured: true,
    tags: ["Digital Design", "Summer Collection"],
    tools: ["Adobe Illustrator", "Photoshop"]
  },
  {
    title: "Embroidered Heritage Collection",
    description: "Hand-embroidered evening wear...",
    category: "Hand",
    featured: true,
    tags: ["Embroidery", "Hand-Crafted"],
    tools: ["Silk Thread", "Seed Beads"]
  }
]);

// Insert Sample Contacts
db.contacts.insertOne({
  name: "Emma Rodriguez",
  email: "emma.rodriguez@email.com",
  subject: "Custom Wedding Dress Commission",
  message: "I'm looking for a custom wedding dress...",
  type: "Commission",
  status: "Unread"
});
```

## 🧪 API Testing Examples

### Test Signup

```bash
curl -X POST http://localhost:5000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alexandra Chen",
    "email": "alex@fashiondesigner.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@fashiondesigner.com",
    "password": "securePassword123"
  }'
```

### Get All Portfolio Items

```bash
curl -X GET http://localhost:5000/api/portfolio
```

### Get Digital Works Only

```bash
curl -X GET http://localhost:5000/api/portfolio/category/Digital
```

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Emma Rodriguez",
    "email": "emma.rodriguez@email.com",
    "phone": "+1-555-123-4567",
    "subject": "Custom Wedding Dress Commission",
    "message": "I am interested in commissioning a custom wedding dress...",
    "type": "Commission",
    "commissionDetails": {
      "budget": "$3000-$5000",
      "deadline": "2024-06-15",
      "description": "Custom embroidered wedding dress"
    }
  }'
```

## 📋 Test Checklist

After importing sample data:

- [ ] Home page displays with sample portfolio items
- [ ] Featured work section shows 3 items
- [ ] Portfolio page filters by category
- [ ] Filter buttons work (All/Digital/Hand)
- [ ] Contact form accepts submission
- [ ] Email is logged in backend
- [ ] Portfolio cards display correctly
- [ ] Images load (if present)
- [ ] Responsive design works on mobile

## 🔄 Refresh Database

To reset and reload sample data:

```bash
# In MongoDB shell
use fashion-portfolio

# Drop existing collections
db.users.deleteMany({})
db.portfolios.deleteMany({})
db.contacts.deleteMany({})

# Then run the insertOne/insertMany commands above
```

## 💾 Export Data

```bash
# Export to JSON
mongoexport --db fashion-portfolio --collection users --out users.json
mongoexport --db fashion-portfolio --collection portfolios --out portfolios.json

# Import from JSON
mongoimport --db fashion-portfolio --collection users --file users.json
mongoimport --db fashion-portfolio --collection portfolios --file portfolios.json
```

---

Use this sample data to quickly test all features of the application!
