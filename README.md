# 🤖 PersonalChatBot — Modern AI Chat Assistant

PersonalChatBot is a sleek, mobile‑responsive chat application built with React and Vite, powered by Google Gemini. It delivers fast conversational AI with a clean UI, per‑conversation history (titled by the first message), and a polished dark/light theme.

## 🚀 Features
- Real‑time AI chat with responsive streaming UI
- Conversation history (first user message becomes the title)
- Load past chats from the sidebar (mobile drawer on phones)
- New Chat starts fresh without deleting previous history
- Mobile‑first layout with fixed input bar and smooth scrolling
- Dark/Light mode toggle and send‑on‑Enter support

## 🧠 LLM Used
- Google Gemini 2.5 Flash (via @google/genai)

## 🧰 Tech Stack
- React, Vite, ES Modules
- @google/genai (Gemini SDK)
- React Context API (global state for messages, history, conversations)
- React Icons
- CSS3 (variables, Flexbox, responsive media queries)

## 🔑 Key Components
- Chat UI: message list, loaders, prompt input, send on Enter
- Sidebar & History: hamburger drawer on mobile, MRU history list
- Dark Mode Toggle: theme switch with CSS variables
- Global State: messages, conversations, history, and actions (send, new chat, open conversation, clear history)
- LLM Service: Gemini request/stream handling, error fallback
- Styles & Theming: mobile‑first layout, safe‑area handling, fixed input bar

## 🔐 Environment (Required After Cloning)
Create a `.env` file at the project root and add your API key:
```properties
VITE_GEMINI_API_KEY=your_gemini_api_key_here
