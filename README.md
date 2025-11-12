# 🌟 Star Wars Character App

A responsive web application that displays a list of Star Wars characters — built as a frontend take-home assignment.  
Users can **browse, search, and filter** characters from the Star Wars universe and view detailed information about each one.

The app is built with **React**, **TypeScript**, and **Tailwind CSS**, and includes **pagination**, **search**, **filtering**, and a **mock authentication** system.

---

## 🧰 Tech Stack

- **Core:** React 19 (with Hooks), TypeScript  
- **Styling:** Tailwind CSS  
- **API & State:** TanStack React Query  caching, and pagination)  
- **Routing:** React Router v7  
- **Forms:** React Hook Form + Zod (for login validation)  
- **UI:** Lucide React (icons), Framer Motion (animations)  
- **Build Tool:** Vite  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd Zippee-Assignment
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

This will start the app on [http://localhost:5173](http://localhost:5173) (or the next available port).

---

## 🔐 Login (Mock Authentication)

Use the following mock credentials to log in:

| Username | Password |
|-----------|-----------|
| `TestUser` | `123456` |

Upon login, a **mock JWT token** is created and stored in `localStorage`.  
The main character page is a **protected route**, so users without a valid token are redirected to `/login`.

---

## 🎯 Features Implemented

### ✅ Core Requirements
- **Fetch & Display Characters:** Retrieves character data from the [SWAPI](https://swapi.dev/api/people) endpoint.
- **Pagination:** Navigate through characters using **Prev** and **Next** buttons.
- **Loading & Error States:** Managed automatically by `react-query`. Displays **skeleton loaders** while fetching.
- **Character Cards:** Each character is shown on a card with:
  - Name
  - Random image (from [Picsum Photos](https://picsum.photos), seeded by name)
  - Species-based background color
- **Details Modal:** Clicking a card opens a **Framer Motion animated** modal with:
  - Name (header)
  - Height (e.g. `1.72 m`)
  - Mass (e.g. `77 kg`)
  - Birth Year
  - Number of Films
  - Date Added (`dd-MM-yyyy`)
  - Homeworld info (name, terrain, climate, population)
- **Responsive Design:** Fully responsive with Tailwind breakpoints for mobile, tablet, and desktop.

---

### ⚙️ Bonus Features
- **Search:** Real-time search by character name (partial match supported)
- **Filters:** Dropdown filters for:
  - Homeworld  
  - Species  
  - Film  
  (Options are dynamically populated from fetched data)
- **Combined Search + Filter:** Works together seamlessly.
- **Mock Authentication System:**
  - Login/logout flow with persistent token
  - Protected routes
  - **Silent Token Refresh:** A custom `useAuth` hook checks every 5 seconds to "refresh" the token before expiry — simulating real-world behavior.

---

## 🚧 Not Implemented
- Automated tests (e.g., React Testing Library, Jest)

---

## 💡 Design Choices & Trade-offs

### 🧩 State Management
Used **TanStack React Query** to manage all **server-side state** (characters, homeworlds, species, films).  
Local UI state (search, filters, pagination) handled with `useState`.


### 🔐 Authentication
Implemented a realistic **mock authentication system** with:
- Token stored in `localStorage`
- `useAuth` hook for token access and silent refresh logic
- Logout clears token and session data
