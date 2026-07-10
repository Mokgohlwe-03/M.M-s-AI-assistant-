# M.M's AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals improve workplace productivity through Artificial Intelligence. Users can generate professional emails, summarize research, and chat with an AI workplace assistant — all without registration, login, or any user credentials.

## Project Overview

This application follows a **privacy-first** approach. It runs entirely in the browser session and does not store user data, require accounts, or persist personal information on a backend. AI-generated outputs are editable and can be copied or downloaded by the user.

A clear **Responsible AI notice** is displayed throughout the app, reminding users that AI-generated content should always be reviewed before professional use.

## Features Implemented

- **Dashboard Home** — Welcome overview with quick-action buttons, tool cards, and workspace status indicators.
- **Smart Email Generator** — Generate professional emails by entering recipient, subject, purpose, context, and selecting a tone (Formal / Friendly / Persuasive).
- **AI Research Assistant** — Paste or type research content and receive AI-generated summaries.
- **AI Workplace Chatbot** — Interactive chat session for workplace questions and productivity assistance; chat history is session-only.
- **Editable AI Output Panel** — Review, edit, copy, regenerate, or download AI-generated content.
- **Current Session Page** — View session details and privacy information, with an option to clear local browser data.
- **Settings** — Guest workspace settings reflecting the privacy-first nature of the app.
- **Help Page** — Guides and instructions for using each AI tool.
- **Responsible AI Notice** — Persistent reminder that users remain responsible for verifying AI-generated outputs.

## Technologies and Tools Used

- **Framework:** [TanStack Start v1](https://tanstack.com/start) — full-stack React framework with SSR/SSG and server functions.
- **Routing:** [TanStack Router](https://tanstack.com/router) — file-based, type-safe routing.
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) — server-state management.
- **UI Library:** [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with custom design tokens.
- **Components:** [shadcn/ui](https://ui.shadcn.com) primitives built on [Radix UI](https://www.radix-ui.com).
- **Icons:** [Lucide React](https://lucide.dev).
- **AI Integration:** [AI SDK](https://sdk.vercel.ai) via the Lovable AI Gateway using OpenAI-compatible providers.
- **Validation:** [Zod](https://zod.dev) for input validation.
- **Build Tool:** [Vite](https://vitejs.dev).
- **Package Manager:** [Bun](https://bun.sh).

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) installed on your machine.
- A Lovable AI Gateway API key (or equivalent OpenAI-compatible API credentials).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tanstack_start_ts
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the project root and add your AI Gateway credentials:

   ```env
   LOVABLE_API_KEY=your_api_key_here
   ```

   > The exact environment variable name may depend on how `src/lib/ai-gateway.server.ts` reads its configuration. Check that file for the expected variable names.

### Running the Development Server

```bash
bun dev
```

The app will be available at `http://localhost:8080` by default.

### Building for Production

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

### Linting and Formatting

```bash
bun run lint
bun run format
```

---

**Note:** This application does not collect or store user data. All AI interactions are stateless and session-scoped. Users are responsible for reviewing and verifying all AI-generated content before professional use.
