# Link Saver + Auto-Summary 🔗✨

A full-stack web application that allows users to save, organize, and automatically summarize web links. Built with modern technologies for a seamless bookmark management experience.

## 🚀 Features

- **User Authentication**: Secure signup/login with password hashing and JWT sessions
- **Bookmark Management**: Save, view, and delete web links with automatic title and favicon fetching
- **AI-Powered Summaries**: Automatic content summarization using Jina AI API
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Tag Filtering**: Organize bookmarks with custom tags (optional enhancement)
- **Dark Mode Support**: Toggle between light and dark themes (optional enhancement)

## 🛠️ Tech Stack

### Frontend
- **Next.js** (App Router) - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript<img width="2256" height="1377" alt="Screenshot 2025-08-10 at 00-12-23 Create Next App" src="https://github.com/user-attachments/assets/a86dd069-429c-4d96-a281-f6993891956e" />
<img width="2256" height="1377" alt="Screenshot 2025-08-10 at 00-11-59 Create Next App" src="https://github.com/user-attachments/assets/012c5267-997e-4dc6-b35d-4f4912c33515" />

<img width="2256" height="1377" alt="Screenshot 2025-08-10 at 00-11-51 Create Next App" src="https://github.com/user-attachments/assets/de14ad62-b8b4-4c61-90a5-664442379c7e" />

### Backend
- **Next.js API Routes** - Serverless API endpoints<img width="2256" height="1377" alt="Screenshot 2025-08-10 at 00-12-48 Create Next App" src="https://github.com/user-attachments/assets/1c33d079-201c-4122-b26d-0ff67cf5f288" />

- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Database
- **MongoDB** - NoSQL database
- **Prisma** or **Mongoose** - Database ORM/ODM

### External APIs
- **Jina AI API** - Content summarization service

## 📁 Project Structure

```
link-saver-app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── bookmarks/     # Bookmark CRUD operations
│   ├── dashboard/         # Main dashboard page
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── lib/                   # Database config and helpers
│   ├── auth.js           # Authentication utilities
│   ├── database.js       # Database connection
│   └── utils.js          # Helper functions
├── components/            # Reusable UI components
├── public/               # Static assets
└── prisma/               # Database schema (if using Prisma)
```

## 🏗️ Development Roadmap

### Phase 1: Project Setup ✅
- Initialize Next.js application with TypeScript
- Configure Tailwind CSS for styling
- Set up MongoDB database connection
- Create basic folder structure

### Phase 2: Authentication System ✅
- Implement user registration and login
- Password hashing with bcrypt
- JWT token generation and validation
- Protected route middleware
- Optional: Google OAuth integration

### Phase 3: Core Bookmark Features ✅
- **API Endpoints:**
  - `POST /api/bookmarks` - Save new bookmark
  - `GET /api/bookmarks` - Retrieve user bookmarks
  - `DELETE /api/bookmarks/:id` - Delete bookmark
- Automatic title and favicon extraction
- Responsive bookmark grid/card layout
- Add/delete bookmark functionality

### Phase 4: AI Summary Integration ✅
- Jina AI API integration for content summarization
- Automatic summary generation on bookmark save
- Collapsible summary sections in UI
- "Regenerate Summary" functionality

```javascript
// Summary generation example
const target = encodeURIComponent(bookmarkUrl);
const res = await fetch(`https://r.jina.ai/http://${target}`);
const summary = await res.text();
```

### Phase 5: Enhanced Features (Optional)
- Tag-based filtering system
- Dark mode with `next-themes`
- Drag-and-drop bookmark reordering
- Search functionality
- Export/import bookmarks

### Phase 6: Testing & Quality Assurance
- Unit tests for API routes (Jest/Vitest)
- End-to-end testing (Cypress/Playwright)
- Performance optimization
- Security audit

### Phase 7: Deployment & Documentation
- Deploy to Vercel or VPS
- MongoDB Atlas cloud database setup
- Environment configuration
- Live demo and documentation

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/guptaashish2003/link-saver-app.git
cd link-saver-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
JINA_API_KEY="your-jina-ai-api-key"
```

4. **Database Setup**
```bash
# If using Prisma
npx prisma generate
npx prisma db push

# If using Mongoose, ensure MongoDB is running
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 API Documentation

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Create new bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark

### Summaries
- `POST /api/summaries/generate` - Generate AI summary for URL

## 🎨 UI Components

- **BookmarkCard**: Displays individual bookmark with title, favicon, and summary
- **BookmarkForm**: Add new bookmark form with URL input
- **Dashboard**: Main interface showing all saved bookmarks
- **AuthForms**: Login and signup forms with validation

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

For E2E tests:
```bash
npm run test:e2e
# or
yarn test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx) if needed

## 📊 Project Metrics

- **Development Time**: 15 hours (dedicated single-day sprint)
- **Lines of Code**: ~2,500 lines
- **Components**: 12+ reusable components
- **API Endpoints**: 8+ RESTful endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Jina AI](https://jina.ai/) for the summarization API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Contact

Your Name - [@guptaashish2003](https://x.com/guptaashish2003) - work.ar.gupta.gmail.com

Project Link: [https://github.com/guptaashish2003/link-bookmark](https://github.com/guptaashish2003/link-bookmark)

Live Demo: [[https://your-app.vercel.app](https://link-bookmark-beryl.vercel.app/)]

---

⭐ If you found this project helpful, please give it a star on GitHub!
