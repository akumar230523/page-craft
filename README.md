# PageCraft
A drag-and-drop page builder where you can create, manage, and customize personal content pages — all saved automatically in your browser.

🔗 **Live Demo:** [PageCraft](https://akumar230523.github.io/page-craft/)

---

## 📋 Table of Contents
- [What It Does](#-what-it-does)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Block Types](#-block-types)
- [Pages & Routing](#-pages--routing)
- [State Management](#-state-management)
- [How Drag & Drop Works](#-how-drag--drop-works)
- [LocalStorage Persistence](#-localstorage-persistence)
- [Available Scripts](#-available-scripts)

---

## ✨ What It Does
- **Dashboard** — Create, duplicate, and delete multiple pages
- **Editor** — Drag blocks onto a canvas and reorder them freely
- **Config Panel** — Click any block to edit its content and style
- **Auto-Save** — Everything saves to localStorage automatically
- **4 Block Types** — Header, Rich Text, Image, Markdown

---

## 🛠️ Tech Stack
| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI components and state |
| React Router DOM | 7 | Dashboard / Editor / HowToUse pages |
| Vite | 8 | Dev server and production build |
| Tailwind CSS | 3 | Utility-first styling |
| MUI Icons | 7 | Icons throughout the UI |
| gh-pages | 6 | GitHub Pages deployment |

---

## 📁 Project Structure
```
page-craft/
│
├── src/
│   ├── components/
│   │   ├── blocks/
│   │   │   ├── HeaderBlock.jsx         # Renders <h1> / <h2> / <h3>
│   │   │   ├── TextBlock.jsx           # Renders a styled paragraph
│   │   │   ├── ImageBlock.jsx          # Renders an image from URL
│   │   │   └── MarkdownBlock.jsx       # Parses and renders Markdown
│   │   │
│   │   ├── configs/
│   │   │   ├── HeaderConfig.jsx        # Settings form for Header blocks
│   │   │   ├── TextConfig.jsx          # Settings form for Text blocks
│   │   │   ├── ImageConfig.jsx         # Settings form for Image blocks
│   │   │   └── MarkdownConfig.jsx      # Settings form for Markdown blocks
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx              # Top navigation bar
│   │   │   └── Footer.jsx              # Bottom footer
│   │   │
│   │   ├── Canvas.jsx                  # Drop zone — renders the block list
│   │   ├── CanvasBlock.jsx             # Single block wrapper (drag handle + toolbar)
│   │   ├── ConfigPanel.jsx             # Right-side settings panel
│   │   ├── Palette.jsx                 # Left sidebar — list of available blocks
│   │   └── PaletteItem.jsx             # Single draggable palette card
│   │
│   ├── constants/
│   │   └── blockTypes.js               # Block type names, icons, default content
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js          # Custom hook: React state ↔ localStorage
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx               # Page list — create, duplicate, delete
│   │   ├── Editor.jsx                  # Main editor — owns all drag/drop state
│   │   └── HowToUse.jsx                # Guide page with instructions
│   │
│   ├── utils/
│   │   ├── blockUtils.js               # createBlock, reorderBlocks, updateBlockContent
│   │   └── markdownParser.js           # Lightweight Markdown → HTML converter
│   │
│   ├── App.jsx                         # Root layout (Header + Footer + Outlet)
│   ├── index.css                       # Tailwind directives + global styles
│   └── main.jsx                        # App entry — sets up React Router
│
├── eslint.config.js 
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── vite.config.js                      # Vite build configuration
```

---

## 🚀 Getting Started

### Requirements
- **Node.js** v18 or higher → [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node)

### Install and Run
```bash
# 1. Go into the project folder
cd page-craft

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 🧠 How It Works
The app is split into three main screens, each with a clear job:
```
Dashboard  →  (click page)  →  Editor  →  (click block)  →  Config Panel
   │                              │
creates pages               owns all state:
in localStorage              - blocks[]
                             - selectedId
                             - dropIndicator
```
**Data always flows down, events always flow up:**
- `Editor` owns the block data and passes it down to `Canvas` and `ConfigPanel`
- Child components call callback functions (like `onContentChange`) to ask `Editor` to update the data
- `Editor` updates the data and React re-renders everything automatically

---

## 🧩 Block Types

Every block on the canvas is a plain JavaScript object:
```js
{
  id: "a1b2c3...",    // Unique ID from crypto.randomUUID()
  type: "header",     // 'header' | 'text' | 'image' | 'markdown'
  content: {          // Different fields for each type
    text: "Hello",
    level: 1,
    align: "left",
    color: "#1A1614"
  }
}
```

| Block | What it renders | Key settings |
|---|---|---|
| **Header** | `<h1>`, `<h2>`, or `<h3>` | Level, alignment, color |
| **Rich Text** | Styled `<p>` paragraph | Font size, bold, italic, color |
| **Image** | `<img>` from a URL | URL, caption, size, corner radius |
| **Markdown** | Parsed HTML from Markdown text | Raw Markdown content |

All block definitions (default content, label, icon) live in `src/constants/blockTypes.js`. That single file is the source of truth for what blocks exist.

---

## 🗺️ Pages & Routing
Routing is set up in `main.jsx` using `createHashRouter` (hash-based, so it works on GitHub Pages):
```
/            →  Dashboard    (list of all pages)
/editor/:id  →  Editor       (edit one page by its ID)
/how-to-use  →  HowToUse     (step-by-step guide)
```
`App.jsx` is the root layout. It renders the global `Header` and `Footer` and an `<Outlet />` — React Router puts the matching page component inside the Outlet automatically.

---

## 💾 State Management
All page data is stored under a single localStorage key (`pagecraft-pages`) as an array of page objects, each containing an `id`, `name`, `blocks`, and timestamps.
The `useLocalStorage` hook works like `useState` but automatically persists every change to localStorage. `Editor` always updates only the affected page, leaving all others untouched.

---

## 🖱️ How Drag & Drop Works

The app uses the browser's built-in HTML5 Drag and Drop API — no external library needed.

**Two types of drag exist:**
| Source | What happens on drop |
|---|---|
| Palette → Canvas | A **new block** is created and inserted at the drop position |
| Canvas → Canvas | The **existing block** is moved to the new position |

**Key events used:**
| Event | Where it fires | What it does |
|---|---|---|
| `onDragStart` | Palette item or Canvas block | Records what is being dragged (stored in a `useRef`) |
| `onDragOver` | Between-block drop zones | Prevents default (required to allow drop), shows the indicator line |
| `onDrop` | Between-block drop zones | Reads the drag source ref and either adds or reorders the block |
| `onDragEnd` | Dragged element | Clears the dragging state |

**Why `useRef` instead of `useState` for drag data?**
`onDragOver` fires hundreds of times per second as you move the mouse. If we stored drag data in React state, it would trigger hundreds of re-renders. A `ref` stores the data without causing any re-renders.

```js
// Editor.jsx
const dragSource = useRef(null);

// Set in onDragStart:
dragSource.current = { type: 'palette', blockType: 'header' };

// Read in onDrop:
const source = dragSource.current;
dragSource.current = null; // Clear after use
```

The **drop indicator** (the glowing line between blocks) is in state because we want the UI to update when it moves:
```js
const [dropIndicator, setDropIndicator] = useState(null);
// Example: { index: 2, position: 'before' }
```

---

## 💽 LocalStorage Persistence
The `useLocalStorage` hook in `src/hooks/useLocalStorage.js` handles all saving automatically.
**How it works:**
```js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // On first load: try to read saved data
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    // Every time value changes: save it
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // Same API as useState
}
```
You use it exactly like `useState` — the saving is completely invisible:
```js
const [pages, setPages] = useLocalStorage('pagecraft-pages', []);
// Calling setPages(...) automatically saves to localStorage
```

---

## 📜 Available Scripts
```bash
npm run dev       # Start local dev server at http://localhost:5173
npm run build     # Build optimised files into ./dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint to check for code issues
npm run deploy    # Build and deploy to GitHub Pages
```

---
