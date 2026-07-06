# 🤖 HireGenie AI

HireGenie AI is a full-stack AI mock interview platform built to help users prepare for technical and HR interviews. Users can sign in with Google, upload their resume, get AI-generated interview questions, practice interviews, receive feedback, and buy credits when needed.

I built this project to learn how real-world SaaS applications work, including authentication, payments, backend APIs, database management, and deployment.

---

## 🚀 Features

* Google Sign-In using Firebase
* Upload Resume (PDF)
* AI-generated interview questions
* Technical & HR interview practice
* AI feedback after every interview
* Credit-based interview system
* Buy credits using Razorpay
* Smooth animations with Framer Motion
* Responsive UI
* Full-stack deployment on Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Redux Toolkit
* Axios
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* Firebase Google Authentication

### Payments

* Razorpay

### Deployment

* Render

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/hiregenie-ai.git
```

Go to the project folder

```bash
cd hiregenie-ai
```

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd ../server
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_api_key

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

CLIENT_URL=http://localhost:5173
```

Create another `.env` file in the **client** folder.

```env
VITE_SERVER_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=

VITE_RAZORPAY_KEY_ID=
```

---

## ▶️ Run the Project

Start the backend

```bash
npm run dev
```

Start the frontend

```bash
npm run dev
```

---

## 💡 How it Works

1. Sign in with your Google account.
2. Upload your resume in PDF format.
3. AI generates interview questions based on your profile.
4. Practice Technical or HR interviews.
5. Get AI-generated feedback after completing the interview.
6. Use credits to start interviews.
7. Buy more credits anytime using Razorpay.

---

## 📚 What I Learned

While building this project, I learned about:

* Building REST APIs with Express
* MongoDB and Mongoose
* Firebase Authentication
* Redux Toolkit
* File uploads
* AI API integration
* Razorpay payment integration
* Protected routes
* Deploying full-stack apps on Render

---

## 📌 Future Improvements

* Resume analysis with detailed suggestions
* Interview history
* User dashboard
* Dark mode
* More interview categories
* Admin panel

---

## 🙌 Thanks

Thanks for checking out this project. If you like it, feel free to ⭐ the repository or share your feedback.

Happy Coding! 🚀
