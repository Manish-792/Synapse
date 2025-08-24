# Synapse 🧠

> An autonomous AI agent with a dynamic, 3D user interface, capable of multi-step reasoning and real-time tool integration.

**[Live Demo](https://synapse-y3ig.onrender.com/)** ![Synapse AI Agent UI](https://i.imgur.com/K3t5s5E.png)

---

## ✨ Core Features

Synapse is more than just a chatbot; it's a sophisticated agent designed to solve complex problems by thinking, acting, and learning.

* **🧠 Multi-Step Reasoning:** Powered by a custom reasoning loop, the agent can break down complex queries into sequential steps, gather information, and synthesize a final answer.
* **🛠️ Real-Time Tool Integration:** Dynamically uses a set of tools to fetch live data from the internet, including:
    * **`getWeather`**: For current weather information.
    * **`getCryptoPrice`**: For real-time cryptocurrency prices.
    * **`getNews`**: For the latest news headlines on any topic.
    * And more utility tools for calculations and time.
* **🚀 Dynamic & Interactive Frontend:** A modern, visually stunning UI built with:
    * **Spline 3D:** An interactive 3D scene serves as the application background.
    * **GSAP & Framer Motion:** Butter-smooth animations for scroll-based triggers, hover effects, and message streaming.
    * **Glassmorphism Design:** A sleek, frosted-glass aesthetic for a futuristic feel.
* **🔗 Full-Stack Architecture:** A clear separation of concerns between the robust backend agent and the modern frontend client.
    * **Backend:** A Node.js/Express API that houses the core agent logic and tool connections.
    * **Frontend:** A multi-page React (Vite) application for a seamless user experience.

## 🛠️ Tech Stack

| Category      | Technology                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Frontend** | `React`, `Vite`, `Tailwind CSS`, `Framer Motion`, `GSAP`, `Spline`, `React Router`                              |
| **Backend** | `Node.js`, `Express.js`, `Google Gemini Pro`                                                                |
| **Deployment**| `Vercel` (Frontend), `Render` (Backend)                                                                     |

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* npm
* A Google AI Studio API Key for Gemini

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Manish-792/Synapse.git](https://github.com/Manish-792/Synapse.git)
    cd Synapse
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add your API keys:
    ```env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    OPENWEATHER_API_KEY="YOUR_OPENWEATHER_KEY"
    NEWS_API_KEY="YOUR_NEWSAPI_KEY"
    ```
    Start the backend server:
    ```bash
    node server.js 
    # The backend will be running on http://localhost:3001
    ```

3.  **Setup the Frontend:**
    Open a new terminal window.
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env.local` file in the `frontend` directory and add the backend API URL:
    ```env
    VITE_API_URL="http://localhost:3001"
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    # The frontend will be running on http://localhost:5173
    ```

## ☁️ Deployment

The application is deployed using a modern CI/CD workflow:
* The **frontend** is deployed on **Vercel**, configured to the `frontend` root directory.
* The **backend** is deployed as a Web Service on **Render**, configured to the `backend` root directory.

---
