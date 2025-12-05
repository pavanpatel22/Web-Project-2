# 🚀 React Portfolio with TanStack Router

A modern, performant **portfolio website** built with **React**, **TypeScript**, and **TanStack Router**, featuring advanced routing patterns, responsive design, and smooth animations.

---

## 🚀 Tech Stack

### **Frontend**
- React 18 with TypeScript  
- TanStack Router (formerly React Router)  
- Vite  
- CSS3 with Custom Properties  
- Responsive Design  

### **Key Features**
- File-based routing with nested routes  
- Type-safe route definitions  
- Code splitting & lazy loading  
- Smooth page transitions  
- Dark mode aesthetic  
- Mobile-first design  

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── index.tsx
│   ├── root.tsx
│   ├── home.tsx
│   ├── about.tsx
│   ├── page1.tsx
│   ├── page2.tsx
│   └── blog/
│       ├── index.tsx
│       └── article.tsx
├── router.tsx
├── main.tsx
└── index.css
```

---

## 🔧 Routing Implementation

### **Custom Route Tree Builder**
```ts
export function createTree(
  parent: AnyRoute,
  ...routes: ((parent: AnyRoute) => AnyRoute)[]
) {
  return parent.addChildren(routes.map(route => route(parent)));
}

// Route tree
export const routeTree = createTree(
  rootRoute,
  home,
  page1,
  page2,
  blog,
  about
);
```

---

## 📚 Route Definitions Example
```ts
export default (parent: AnyRoute) =>
  createRoute({
    path: "/about",
    getParentRoute: () => parent,
    component: AboutPage,
  });
```

---

## 🧭 Nested Routes (Blog)

### Structure:
```
/blog
/blog/article
```

### Definition:
```ts
export default (parent: AnyRoute) =>
  createRoute({
    path: "/article",
    getParentRoute: () => parent,
    component: ArticlePage,
  });
```

---

## 🔒 Type Safety
```ts
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

---

## 🎨 Key Routing Features

### **1. Layout Route Pattern**
- `root.tsx` provides global layout  
- `<Outlet />` renders child routes  
- Smooth scrolling enabled  

### **2. Active Route Detection**
```tsx
<Link 
  to="/about"
  className="nav-link"
  activeProps={{ className: "nav-link active" }}
>
  About
</Link>
```

### **3. Dynamic Page Transitions**
- Fade-in animations  
- Scroll restoration  
- Intent-based preloading  

### **4. Custom 404 Page**
- Themed error UI  
- Navigation tips  

### **5. Performance Optimizations**
- Route-based code splitting  
- Asset preloading  
- Optimized bundles  

---

## 🛠️ Routes Overview

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page |
| `/about` | AboutPage | Bio & skills |
| `/page1` | ServicesPage | Services |
| `/page2` | ContactPage | Contact |
| `/blog` | BlogPage | Blog listing |
| `/blog/article` | ArticlePage | Article page |

---

## 📦 Installation & Usage

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## 🎯 Development Features

### **Hot Module Replacement**
- Fast refresh  
- Preserves component state  

### **Type Checking**
- TS strict mode  
- Safer routes & props  

### **Code Quality**
- ESLint configured  
- Prettier formatting  

---

## 🔗 Navigation Implementation

### **Navbar**
- Gradient logo  
- Active highlight  
- Mobile responsive  
- Backdrop blur  

### **Link Types**
- TanStack Router `<Link>` for internal  
- `<a>` for external/hash  

### **Smooth Scrolling**
```ts
useEffect(() => {
  const handleAnchorClick = (e: MouseEvent) => {
    // Smooth scroll behavior
  };
}, []);
```

---

## 🌐 SEO & Accessibility

- Semantic HTML  
- ARIA labels  
- Image optimization-ready  
- Efficient CSS delivery  

---

## 🎨 Design System

### **CSS Variables**
```css
:root {
  --primary: #0a0a0a;
  --secondary: #1a1a1a;
  --accent: #6366f1;
  --text: #fafafa;
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### **Component Styling**
- BEM-like naming  
- Reusable animations  
- Consistent spacing  

---

## 📱 Responsive Breakpoints

| Max Width | Devices |
|-----------|---------|
| 768px | Tablets & mobiles |
| 480px | Small mobiles |

---

## 🔄 State Management

### **Route-Based State**
- URL-driven UI  
- Query params support  
- Nested state persists  

### **Component State**
- Local reactive state  
- No external state library needed  

---

## 🚨 Error Handling

### **404 Page**
- Tech stack preview  
- Navigation suggestions  

### **Route Error Boundaries**
- User-friendly error messages  

---

## 📈 Performance Metrics

### **Route Loading**
- Nested route code splitting  
- Lazy-loaded components  

### **Bundle Optimization**
- Tree-shaking  
- Minified builds  
- Gzip-ready  

---

## 🔧 Development Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

---

## 📚 Additional Features

### **Blog System**
- Nested routing  
- Metadata support  
- Category filters (optional)  

### **Contact Form**
- Validation  
- Responsive layout  

### **Project Showcase**
- Tag-based filtering  
- Case study navigation  
- Responsive cards  

---

## 🎉 Final Notes

This portfolio is built to be **scalable**, **fast**, and **developer-friendly**, using the powerful features of **TanStack Router** with modern React architecture.

