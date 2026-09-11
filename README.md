# STUDYSPHERE — Student Productivity Command Center

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=111)
![Lucide](https://img.shields.io/badge/Icons-Lucide-F56565)
![Responsive](https://img.shields.io/badge/Design-Responsive-22D3EE)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)

StudySphere is a modern student productivity platform created to organize subjects, study plans, focus sessions, examinations, notes, habits, resources, and placement preparation in one responsive workspace.

---

## 🌟 Core Features

- 📊 **Overview Dashboard:** Daily study statistics, completed tasks, focus time, weekly score, and subject progress.
- 📚 **My Subjects:** Track Discrete Mathematics, Computer Networks, Operating Systems, Algorithms, and their completion percentages.
- 🗓️ **Study Plan:** View the complete task queue with subjects, duration, priority, and completion state.
- ⏱️ **Focus Room:** Interactive 25-minute focus timer with start, pause, and reset controls.
- 🎯 **Goals:** Monitor GATE syllabus completion, study streaks, and PYQ targets.
- ✅ **PYQ Tracker:** Track solved questions, bookmarks, and accuracy for every subject.
- 📝 **Exams:** Organize mock tests, internal examinations, revision deadlines, and remaining time.
- 📒 **Notes:** Store and revisit revision sheets, formulas, examples, and important concepts.
- 📈 **Analytics:** Understand weekly focus time, strongest study days, and subjects requiring attention.
- 🔥 **Habit Tracker:** Measure morning revision, daily PYQs, and distraction-free focus blocks.
- 🔗 **Resources:** Organize courses, playlists, books, and trusted question banks.
- 💼 **Placement Preparation:** Track Java, DSA, portfolio projects, and interview preparation.
- 📅 **Weekly Schedule:** Plan realistic study blocks around college and personal commitments.
- 👤 **Profile:** Display academic details, career goals, skills, and current learning targets.
- ⚙️ **Settings:** Manage focus duration, daily study targets, and workspace preferences.
- ➕ **Interactive Tasks:** Search tasks, create new tasks, and mark tasks as completed.
- 📱 **Responsive Layout:** Optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend Core:** React with functional components and Hooks
- **Build Tool:** Vite
- **Language:** JavaScript (JSX)
- **Styling:** Custom responsive CSS
- **Icons:** Lucide React
- **State Management:** React `useState`, `useEffect`, and `useMemo`
- **Deployment:** Vercel-ready production build

---

## 📁 Project Structure

```text
StudySphere/
├── public/
│   └── favicon.svg             # StudySphere browser icon
├── src/
│   ├── App.jsx                 # Dashboard, navigation and all workspace views
│   ├── index.css               # Complete responsive visual system
│   └── main.jsx                # React application entry point
├── .gitignore                  # Files excluded from Git
├── index.html                  # Main HTML entry point
├── package.json                # Dependencies and npm scripts
├── package-lock.json           # Reproducible dependency versions
├── vite.config.js              # Vite and React configuration
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started Locally

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/keerthanamuddasani-hub/StudySphere.git
```

2. Open the project directory:

```bash
cd StudySphere
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local address displayed in the terminal, usually `http://localhost:5173`.

---

## 🏗️ Production Build

```bash
npm run build
```

The optimized production files will be created inside the `dist` folder.

To preview that build locally:

```bash
npm run preview
```

---

## ▲ Deploy on Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Select **Add New → Project**.
3. Import the **StudySphere** GitHub repository.
4. Use the lowercase project name `studysphere`.
5. Keep the detected framework as **Vite**.
6. Click **Deploy**.

Vercel automatically uses `npm run build` and publishes the `dist` directory.

---

## 🎨 Design System

- **Primary background:** Midnight navy (`#070B14`)
- **Primary accent:** Electric blue (`#4F7CFF`)
- **Secondary accent:** Cyan (`#22D3EE`)
- **Progress accent:** Lime (`#A3E635`)
- **Interface style:** Dark command-center dashboard with responsive cards and subtle gradients

---

## 👩‍💻 Author

**Keerthana Muddasani**  
B.Tech Computer Science and Engineering student

---

If you find StudySphere useful, consider giving the repository a ⭐.
