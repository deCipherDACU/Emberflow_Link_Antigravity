# LifeQuest RPG: The Gamified Productivity App

Welcome to LifeQuest RPG, a Next.js application designed to turn your daily tasks and long-term goals into an epic role-playing adventure. This app gamifies productivity by allowing you to level up your character, complete quests, fight weekly bosses, and develop skills—all by managing your real-life tasks.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account & Firebase CLI (`npm install -g firebase-tools`)
- Google Gemini API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/lifequest-rpg.git
    cd lifequest-rpg
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the `.env.example` file to a new file named `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    -   Open `.env.local` and fill in your Firebase project configuration and your Google Gemini API key.

4.  **Run the development servers:**
    -   This app uses `npm-run-all` to start both the Next.js frontend and the Genkit AI backend concurrently.
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    -   Access the application at [http://localhost:3000](http://localhost:3000).
    -   The Genkit development UI is available at [http://localhost:4000/dev](http://localhost:4000).

## 🔥 Deployment

To deploy your application to Firebase Hosting:

1.  **Login to Firebase:**
    ```bash
    firebase login
    ```
2.  **Initialize Project (if you haven't already):**
    ```bash
    firebase init
    ```
3.  **Deploy Everything:**
    ```bash
    npm run firebase:deploy
    ```
4.  **Deploy Only Hosting:**
    ```bash
    npm run firebase:deploy:hosting
    ```


## 🛠️ Development

### Firebase Studio Tips
-   **Authentication**: You can log in to your Firebase account directly within the IDE using the Firebase icon in the sidebar.
-   **Deployment**: Deploying is simple. Just type `firebase deploy` in the terminal.
-   **AI Assistance**: Use the integrated Gemini assistant to help you write code, explain concepts, and generate components.

### Available npm Scripts
-   `dev`: Starts both the Next.js app and the Genkit development server.
-   `build`: Creates a production build of the Next.js application.
-   `start`: Starts the production Next.js server.
-   `lint`: Lints the codebase using ESLint.
-   `format`: Formats all files using Prettier.
-   `typecheck`: Runs the TypeScript compiler to check for type errors.
-   `genkit:start`: Starts only the Genkit development server.
-   `genkit:watch`: Starts the Genkit server in watch mode for hot-reloading.

## ✨ Features Roadmap

-   [x] 🚀 Gamified productivity system (Quests, XP, Levels)
-   [x] 🤖 AI-powered features using Google Gemini & Genkit
-   [x] ⚔️ Weekly boss fights
-   [x] 🧘 Pomodoro timer and breathing exercises
-   [x] 📝 AI-powered journal and weekly reviews
-   [x] 🔥 Habit tracker with streak system
-   [x] 🎨 Customizable character profile and themes
-   [ ] 🛒 Rewards shop with redeemable items
-   [ ] 📈 Nutrition and fitness tracking modules
-   [ ] 🤝 Social features (friends, leaderboards)
-   [ ] 📱 Full PWA support for offline access

## 💻 Tech Stack

-   **Framework**: Next.js (App Router)
-   **Styling**: Tailwind CSS & ShadCN UI
-   **AI**: Google Gemini & Genkit
-   **Database**: Firebase Firestore
-   **Authentication**: Firebase Authentication
-   **Deployment**: Firebase App Hosting
-   **Language**: TypeScript

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.
