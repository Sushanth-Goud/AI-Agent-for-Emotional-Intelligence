```txt
  ___  _____    ___                   _      __           
 / _ \|_   _|  / _ \                 | |    / _|          
/ /_\ \ | |   / /_\ \ __ _  ___ _ __ | |_  | |_ ___  _ __ 
|  _  | | |   |  _  |/ _` |/ _ \ '_ \| __| |  _/ _ \| '__|
| | | |_| |_  | | | | (_| |  __/ | | | |_  | || (_) | |   
\_| |_/\___/  \_| |_/\__, |\___|_| |_|\__| |_| \___/|_|   
                      __/ |                               
                     |___/                                
 _____                _   _                   _           
|  ___|              | | (_)                 | |          
| |__ _ __ ___   ___ | |_ _  ___  _ __   __ _| |          
|  __| '_ ` _ \ / _ \| __| |/ _ \| '_ \ / _` | |          
| |__| | | | | | (_) | |_| | (_) | | | | (_| | |          
\____/_| |_| |_|\___/ \__|_|\___/|_| |_|\__,_|_|          
                                                          
                                                          
 _____      _       _ _ _                                 
|_   _|    | |     | | (_)                                
  | | _ __ | |_ ___| | |_  __ _  ___ _ __   ___ ___       
  | || '_ \| __/ _ \ | | |/ _` |/ _ \ '_ \ / __/ _ \      
 _| || | | | ||  __/ | | | (_| |  __/ | | | (_|  __/      
 \___/_| |_|\__\___|_|_|_|\__, |\___|_| |_|\___\___|      
                           __/ |                          
                          |___/                                              
 ```


# AI Agent for Emotional Intelligence 🤖

A modern React + TypeScript + shadcn-ui template designed for building an **EmotionAI Agent** — a lightweight multimodal emotion detection web app.

---

## ✨ Features
- ⚡ Fast Vite + React + TypeScript setup  
- 🎨 Tailwind CSS styling  
- 🧩 Pre-downloaded shadcn-ui components (`@/components/ui`)  
- 📁 Clean, minimal file structure  
- 🚀 Ready for custom logic + ML features  

---

## 🛠️ Tech Stack
- Vite  
- React  
- TypeScript  
- shadcn-ui  
- Tailwind CSS  
- pnpm (recommended)

---

## 🚀 Quick Start
Install dependencies:  pnpm i  
Start dev server:      pnpm run dev  
Build for production:  pnpm run build

## 📁 Project Structure
```txt
/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
└─ src/
   ├─ main.tsx        # App entry
   ├─ app.tsx         # Root component
   ├─ index.css       # Global styles
   ├─ pages/
   │  └─ Index.tsx    # Home page
   └─ components/
      └─ ui/          # All shadcn/ui components (pre-downloaded)

```
## 🧩 Components
Import any shadcn-ui component directly:

import { Button } from "@/components/ui/button";

All components are stored under @/components/ui.

## 🎨 Styling
Use Tailwind CSS classes for UI styling

Add global styles in src/index.css

Modify theme/colors in tailwind.config.js

Create component-level CSS files if needed

## 💡 Development Tips
@/ alias points to the src/ folder

Avoid re-exporting TypeScript types unnecessarily

Keep UI components clean and reusable

Extend the EmotionAI logic in the pages/ folder

## 🔎 Useful Commands

#### Add new dependency
pnpm add <package-name>

#### Start preview/dev
pnpm run dev

#### Build
pnpm run build

## 📝 Notes
This template is purely UI-focused — add your emotion detection model or backend as needed

Never store API keys or secrets on the client

## 🤝 Contributing
Feel free to create issues or pull requests. Keep commits small and clear.

