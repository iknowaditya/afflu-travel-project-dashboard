# Affulence Travel - Next.js Fullstack Application

A modern, secure, and scalable travel management platform built with [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [MongoDB](https://www.mongodb.com/), and JWT authentication.  
This project demonstrates best practices for authentication, protected routes, and clean code organization.

---

## 🚀 Features

- 🔒 **JWT Authentication** with httpOnly cookies
- 🛡️ **Protected Routes** using Next.js Middleware
- 👤 **User Profile & Login History**
- 🌍 **Geolocation** (city, country) from user IP
- ⚡ **TypeScript** for type safety
- 🗄️ **MongoDB** with Mongoose for data storage
- 🎨 **shadcn/ui** for beautiful, accessible UI
- 🧹 **ESLint** and **Prettier** for code quality

---

## 📦 Tech Stack

- [Next.js 14+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React Icons](https://lucide.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🛠️ Getting Started

### 1. Clone the repository

git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME


### 2. Install dependencies

npm install


### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IP_INFO_TOKEN=your_ipinfo_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000


> Replace the values with your actual secrets and connection strings.

---

### 4. Run the development server


---

## 🔑 Authentication Flow

- User logs in → JWT is created and stored in an httpOnly cookie.
- Protected routes are guarded by Next.js middleware (checks JWT).
- User info is extracted from JWT in API routes/pages as needed.
- Logout route clears the JWT cookie.

---

## 🧪 Linting & Formatting

npm run lint # Check for lint errors
npm run lint -- --fix # Auto-fix lint errors
npm run format # Format code with Prettier


---

## 📝 Scripts

| Script         | Description                        |
|----------------|------------------------------------|
| `dev`          | Run development server             |
| `build`        | Build for production               |
| `start`        | Start production server            |
| `lint`         | Run ESLint                         |
| `format`       | Format code with Prettier          |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [MongoDB](https://www.mongodb.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

---

## 💬 Contact

For questions, issues, or contributions, please open an [issue](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/issues) or contact [YOUR NAME](mailto:your.email@example.com).

---

_Happy coding!_
