# Unheard

Unheard is an innovative, inclusive web application designed to empower the deaf and hard-of-hearing community – and anyone passionate about visual communication. It blends social networking, gamified learning, and community engagement features, with special emphasis on accessibility and creative expression beyond spoken words.

---

## Project Overview

Unheard aims to create a safe, lively space where users can:
- Share their stories and connect in a vibrant online community.
- Engage with accessible games and challenges centered around visual cognition.
- Promote awareness around deaf culture, sign language, and the nuances of non-verbal communication.

The platform prioritizes accessibility and fun, encouraging users to celebrate their unique modes of expression, build friendships, and learn together.

---

## Features

### 📰 Social Feed
- Post images, emoji stories, video reels, and more.
- React (hearts, laughs, wows), comment, and share.
- Example posts highlight accomplishments, community support, and inclusive stories.

### 🗣️ Community Forum
- Threaded discussions about daily experiences, tips, accessibility tech, and deaf culture.
- Supports comments, reactions, and encourages inclusive dialogue.
- Create your own posts and connect with others safely.

### 🎮 Accessible Game Hub

#### Lip Reading Trainer
- Practice reading lips via silent video challenges.
- Hints, scoring, and level progression.
- Designed for single or group play.

#### Visual Escape Room
- Solve visually-driven puzzles (symbol, pattern, or logic-based) to “escape.”
- Multiple rooms, graduated difficulty, time tracking, and scoring.
- Designed for quick solo play or team challenges.

#### Visual Riddles
- Decode emoji, patterns, and logic puzzles under time pressure.
- Streak, scoring, difficulty levels, and various game modes.

### 📹 Reels & Stories
- Share video reels or visual stories with the community.
- Celebrate creativity and visual storytelling.

### 📔 Personal Journal
- (Planned) Private space for personal reflection, notes, and achievements.

---

## Tech Stack

- **Languages:** TypeScript (98%), CSS (1.4%)
- **Core Frameworks:**
  - [React](https://react.dev/) (with Hooks)
  - [React Router](https://reactrouter.com/) (for routing)
  - [@tanstack/react-query](https://tanstack.com/query/latest) (async state/query management)
- **UI & Styling:**
  - [Tailwind CSS](https://tailwindcss.com/) (utility-first styling, themed for dark mode and accessibility)
  - Custom design tokens for color, type, gradients, and accessible contrast
  - [Lucide Icons](https://lucide.dev/) for modern accessible icons
- **State Management:** React built-in state, context (where used), and react-query.
- **Build Tools:** [Vite](https://vitejs.dev/)
- **Other:** Planned support for multiplayer game modes and expanded accessibility features

---

## Project Structure

```
src/
 ├── components/      # Reusable UI components
 ├── hooks/           # Custom React hooks
 ├── lib/             # Utility libraries
 ├── pages/           # Main route pages (Index, Games, Journal, Community, Reels)
 │   └── games/       # Subpages for game types (LipReading, EscapeRoom, VisualRiddles)
 ├── App.tsx          # Main app entrypoint (routing, providers)
 ├── main.tsx         # React root render
 ├── index.css        # Tailwind config, design tokens
 └── vite-env.d.ts    # Type declarations (Vite)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/FidhaAhamed/unheard.git
   cd unheard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Running Locally

```sh
npm run dev
# or
yarn dev
```
The app will be served at `http://localhost:5173` (Vite default).

### Build for Production

```sh
npm run build
# or
yarn build
```

---

## Project Relevance

Unheard stands out as a resource and social hub for people who use and appreciate non-verbal communication:
- Promotes representation and belonging in an often-overlooked digital space.
- Encourages empathy and understanding of deaf culture through games that are fun for all ages.
- Supports a vibrant, supportive community focused on accessibility, creativity, and mutual learning.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
