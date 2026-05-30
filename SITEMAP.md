# Website Sitemap & Navigation Structure

## 🗺️ Complete Site Map

```
Fashion Designer Portfolio
│
├── Home (/)
│   ├── Hero Section
│   │   ├── Main Headline
│   │   ├── Subtitle
│   │   └── CTA Buttons (Commission / Portfolio)
│   │
│   ├── About Section
│   │   ├── Designer Bio
│   │   ├── Quick Stats (Projects, Clients, Years)
│   │   └── Profile Image
│   │
│   ├── Featured Work Section
│   │   ├── Portfolio Grid (3 items)
│   │   └── View All Button
│   │
│   ├── Skills Section
│   │   ├── Design Software
│   │   ├── Specializations
│   │   ├── Techniques
│   │   └── Services
│   │
│   └── CTA Section
│       ├── Call to Action
│       ├── Commission Button
│       └── Download Resume Button
│
├── Portfolio (/portfolio)
│   ├── Page Header
│   │   ├── Title
│   │   └── Subtitle
│   │
│   ├── Filter Buttons
│   │   ├── All Work
│   │   ├── Digital Works
│   │   └── Hand Works
│   │
│   ├── Portfolio Grid
│   │   └── Portfolio Cards (Dynamic)
│   │       ├── Image
│   │       ├── Title
│   │       ├── Description
│   │       ├── Category Badge
│   │       ├── Tags
│   │       └── Like Button
│   │
│   └── Category Information
│       ├── Digital Works Info
│       │   ├── Description
│       │   └── List of Services
│       │
│       └── Hand Works Info
│           ├── Description
│           └── List of Services
│
├── Resume (/resume)
│   ├── Header
│   │   ├── Designer Name
│   │   ├── Title
│   │   ├── Bio
│   │   └── Download Button
│   │
│   ├── Skills Section
│   │   └── Skill Progress Bars
│   │
│   ├── Experience Section
│   │   ├── Timeline
│   │   └── Experience Items
│   │       ├── Position
│   │       ├── Company
│   │       ├── Duration
│   │       └── Responsibilities
│   │
│   ├── Education Section
│   │   └── Education Items
│   │       ├── Degree
│   │       ├── School
│   │       ├── Year
│   │       └── Details
│   │
│   └── Certifications
│       └── Certificate List
│
├── Contact (/contact)
│   ├── Page Header
│   │   ├── Title
│   │   └── Subtitle
│   │
│   ├── Contact Section
│   │   ├── Contact Form
│   │   │   ├── Name
│   │   │   ├── Email
│   │   │   ├── Phone
│   │   │   ├── Inquiry Type
│   │   │   ├── Subject
│   │   │   ├── Message
│   │   │   └── Submit Button
│   │   │
│   │   └── Quick Contact Info
│   │       ├── Email Card
│   │       ├── Phone Card
│   │       ├── Location Card
│   │       └── Social Links
│   │
│   ├── Services Section
│   │   ├── Custom Commissions
│   │   ├── Design Consulting
│   │   ├── Workshops & Training
│   │   └── Collaboration
│   │
│   └── FAQ Section
│       ├── Turnaround Time
│       ├── Rush Requests
│       ├── Commission Process
│       ├── Previous Work
│       ├── Payment Methods
│       └── Team Collaboration
│
└── 404 Not Found
    ├── Error Code Display
    ├── Error Message
    ├── Home Button
    └── Suggested Links
```

## 📊 Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Navigation Menu
│   │   ├── Home Link
│   │   ├── Portfolio Link
│   │   ├── Resume Link
│   │   └── Contact Link (CTA)
│   └── Mobile Hamburger
│
├── Main Content (Routes)
│   ├── Home
│   │   └── PortfolioCard (multiple)
│   ├── Portfolio
│   │   ├── Filter Buttons
│   │   └── PortfolioCard (grid)
│   ├── Resume
│   │   └── SkillTag (multiple)
│   ├── Contact
│   │   ├── ContactForm
│   │   └── Contact Info Cards
│   └── NotFound
│
└── Footer
    ├── Quick Links
    ├── Services
    └── Social Links
```

## 🔄 User Flow Diagrams

### New Visitor Flow
```
Landing (Home)
    ↓
Browse Featured Work
    ↓
Explore Portfolio
    ↓
View Resume
    ↓
Contact / Commission
    ↓
Submit Form
    ↓
Receive Confirmation
```

### Commission Request Flow
```
Contact Page
    ↓
Select "Commission Request"
    ↓
Fill Commission Details
    ↓
Enter Budget & Deadline
    ↓
Submit Form
    ↓
Designer Receives Email
    ↓
Designer Reviews
    ↓
Designer Replies
    ↓
Client Receives Response
```

### Portfolio Discovery Flow
```
Home Featured Work
    ↓
Portfolio Page
    ↓
Filter by Category
    (Digital / Hand / All)
    ↓
View Individual Item
    ↓
Like / Share
    ↓
Contact Designer
    ↓
Commission Similar Work
```

## 🎯 Navigation Paths

### Primary Navigation
- Home → Portfolio
- Home → Resume
- Home → Contact
- Any Page → Home (Logo)

### Secondary Navigation
- Portfolio → Filter → View Item
- Resume → Download
- Contact → Submit Form
- Contact → Social Links

### Mobile Navigation
- Hamburger Menu
- Full Page Menu (Overlay)
- Touch-Friendly Buttons
- Sticky Header

## 📱 Responsive Breakpoints

```
Desktop (1200px+)
├── 4-column grid layouts
├── Full navigation bar
├── Side-by-side sections
└── Full animations

Tablet (768px - 1199px)
├── 2-column grid layouts
├── Hamburger menu
├── Stacked sections
└── Optimized touch targets

Mobile (Below 768px)
├── 1-column layouts
├── Full-screen menu
├── Vertical stacking
├── Large tap targets
└── Simplified navigation
```

## 🔐 Protected vs Public Routes

### Public Routes
- `/` - Home
- `/portfolio` - Portfolio
- `/resume` - Resume
- `/contact` - Contact
- `/api/users/profile/:id` - User profiles
- `/api/portfolio/*` - Portfolio endpoints (read-only)
- `/api/contact/submit` - Form submission

### Protected Routes (Admin Only)
- `/api/users/me` - Own profile
- `/api/users/update` - Update profile
- `/api/users/upload-*` - File uploads
- `/api/portfolio/*` - Create/Update/Delete
- `/api/contact/*` - View/Manage inquiries
- `/api/contact/:id/reply` - Reply to contacts

## 🎨 Page Layout Structure

### Home Page Layout
```
┌─────────────────────────────┐
│      NAVBAR                 │
├─────────────────────────────┤
│  HERO SECTION               │
│ (Full Width)                │
├─────────────────────────────┤
│  ABOUT SECTION              │
│ (2 Column)                  │
├─────────────────────────────┤
│  FEATURED WORK              │
│ (3 Column Grid)             │
├─────────────────────────────┤
│  SKILLS SECTION             │
│ (4 Column Grid)             │
├─────────────────────────────┤
│  CTA SECTION                │
│ (Full Width Dark)           │
├─────────────────────────────┤
│      FOOTER                 │
└─────────────────────────────┘
```

### Portfolio Page Layout
```
┌─────────────────────────────┐
│      NAVBAR                 │
├─────────────────────────────┤
│  PAGE HEADER                │
│ (Dark Background)           │
├─────────────────────────────┤
│  FILTER BUTTONS             │
│ (Centered)                  │
├─────────────────────────────┤
│  PORTFOLIO GRID             │
│ (Responsive: 3→2→1 col)     │
├─────────────────────────────┤
│  CATEGORY INFO              │
│ (2 Column Dark Section)     │
├─────────────────────────────┤
│      FOOTER                 │
└─────────────────────────────┘
```

### Contact Page Layout
```
┌─────────────────────────────┐
│      NAVBAR                 │
├─────────────────────────────┤
│  PAGE HEADER                │
│ (Dark Background)           │
├─────────────────────────────┤
│  CONTACT SECTION            │
│ (2 Column: Form | Info)     │
├─────────────────────────────┤
│  SERVICES SECTION           │
│ (2 Column Grid, Dark)       │
├─────────────────────────────┤
│  FAQ SECTION                │
│ (Single Column)             │
├─────────────────────────────┤
│      FOOTER                 │
└─────────────────────────────┘
```

## 🔗 API Endpoint Structure

```
API Base: http://localhost:5000/api

User Endpoints:
  POST   /users/signup
  POST   /users/login
  GET    /users/profile/:id
  GET    /users/me (protected)
  PUT    /users/update (protected)
  POST   /users/upload-image (protected)
  POST   /users/upload-resume (protected)

Portfolio Endpoints:
  GET    /portfolio
  GET    /portfolio/featured
  GET    /portfolio/category/:category
  GET    /portfolio/:id
  POST   /portfolio (protected)
  PUT    /portfolio/:id (protected)
  DELETE /portfolio/:id (protected)
  POST   /portfolio/:id/like

Contact Endpoints:
  POST   /contact/submit
  GET    /contact (protected)
  GET    /contact/:id (protected)
  PUT    /contact/:id/status (protected)
  POST   /contact/:id/reply (protected)
  DELETE /contact/:id (protected)
```

## 🎯 Key Features by Page

| Page | Purpose | Key Features |
|------|---------|--------------|
| Home | Landing & Overview | Hero, Featured work, Stats, Skills, CTA |
| Portfolio | Work Showcase | Filters, Categories, Grid, Details |
| Resume | Credentials | Skills, Experience, Education, Certs |
| Contact | Lead Generation | Form, Info, Services, FAQ |
| 404 | Error Handling | Error message, Quick links |

## 📈 User Journey Optimization

1. **First Time Visitor**
   - Lands on Home
   - Explores Featured Work
   - Views Portfolio
   - Checks Resume/Credentials
   - Submits Contact Form

2. **Returning Visitor**
   - Directly accesses Portfolio
   - Browses specific category
   - Views Portfolio detail
   - Submits Commission Request

3. **Potential Client**
   - Home → About Section
   - Portfolio → Digital Works
   - Resume → View Experience
   - Contact → Send Commission Request

4. **Collaboration Partner**
   - Portfolio → Browse Work
   - Resume → View Skills
   - Contact → Collaboration Form
   - Social Links → External Validation

---

This comprehensive structure ensures optimal user experience and easy navigation throughout the entire portfolio website.
