
# 🤖 StudyBuddy AI Chatbot

**StudyBuddy** is a smart AI-powered chatbot designed to support students in their academic journey. It offers instant answers, detailed explanations, and helpful guidance through a simple and intuitive conversational interface. Whether you're stuck on a tricky math problem or need help understanding a complex concept, StudyBuddy is here to help — 24/7! 💬📚


> ⚠️ **Note:** Voice commands currently work **only in Google Chrome**.


---

## 📁 Project Structure

```
studybuddy/
├── client/   # Frontend (React)
└── server/   # Backend (Express)
```

---

## 🛠️ Tech Stack

### 💻 Frontend
- React
- Tailwind CSS
- Axios
- React Toastify
- Lucide React

### 🔧 Backend
- Node.js
- Express
- CORS
- Axios
- Dotenv

### 🧠 API
- DEEPSEEK API

---

## ⚙️ Setup Instructions

Follow the steps below to set up the project on your local machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rugvedkadu06/StudyBuddyChatBot.git
cd studybuddy-chatbot
```

### 2️⃣ Frontend Setup

```
cd client
npm install
npm install tailwindcss @tailwindcss/vite
npm install axios lucide-react
npm install react-toastify
```

### 3️⃣ Backend Setup

```
cd ../server
npm install
npm install express cors axios dotenv
```

### 4️⃣ Environment Variables

Create a `.env` file inside the `server` folder and add your OpenAI API key:

```env
ROUTER_API=your-deepseek-api-key-here
```

### 5️⃣ Run the Project

In **separate terminals**, run the backend and frontend:

**Backend**

```
cd server
node index.js
```

**Frontend**

```
cd client
npm run dev
```

---

## ✅ Features

- 🤖 **AI-powered chatbot** for real-time academic assistance  
- 🎨 **Clean and responsive UI** built with Tailwind CSS  
- 🔔 **Toast notifications** for user feedback and error handling  
- 🔗 **Smooth communication** between frontend and backend via Axios  

---

## 📬 Contact

Made with ❤️ by **Rugved Kadu**  
Have questions or suggestions? Feel free to reach out or open an issue!
