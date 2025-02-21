# Github Kanban Board

[Demo Link](https://github-kanban.netlify.app/)

GitHub Kanban Board is a web application that allows users to visualize and manage GitHub repository issues in a Kanban-style board. Users can enter a GitHub repository URL, load issues, and organize them into three columns:

- ToDo → New issues
- In Progress → Open issues with an assignee
- Closed → Closed issues

Users can drag and drop issues between columns, reorder them, and persist the board's state across sessions.Users can drag and drop issues between columns, reorder them, and persist the board's state across sessions.

## 🚀 Features

- 🔍 Search GitHub repositories by URL
- 🎲 Search random repository with issues
- 🔑 Possibility to use personal Github token to increase rate limit
- 📄 Load and display GitHub issues
- 🏗 Drag and drop issues between columns
- 🗂 Reorder issues within a column
- 💾 Persist issue positions across sessions
- 🔗 Visit repository and owner profile via links
- 🎨 Modern UI with Chakra UI
- 🏗 Maintainable modular codebase

## 🛠 Technologies Used

- React 19 with Vite and TypeScript
- Chakra UI
- DND Kit
- Zustand
- Tanstack Query
- Axios
- React Hook Form
- Zod
- Vitest & RTL
- ESLint, Prettier, Husky, Github Actions
- Deploy with Netlify

## 🏗 Setup & Installation

### 🔧 Prerequisites

- Install Node.js (v18+ recommended)
- Have a GitHub Personal Access Token (optional but improves API limits)

### 🚀 Installation Steps

#### Clone the repository

`git clone https://github.com/Krykunov/github-kanban.git`
`cd github-kanban`

#### Install dependencies

`npm install`

##### Create an .env file in the root directory

`"VITE_GITHUB_API_TOKEN=your_github_token" > .env`

##### Start the development server

`npm run dev`
