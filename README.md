# 🧢 StreetCap - 3D Cap Designer Platform# Astro Starter Kit: Basics



A modern, interactive web application for designing and customizing 3D baseball caps. Built with **Astro**, **Three.js**, and **Tailwind CSS** for a premium, production-ready experience.```sh

npm create astro@latest -- --template basics

## ✨ Features```



### 🎨 **3D Cap Customizer**> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

- Real-time 3D visualization using Three.js

- Interactive rotation with mouse/touch controls## 🚀 Project Structure

- Color customization for crown, visor, band, and button

- Multiple cap styles (Baseball, Snapback, Mesh, Flat)Inside of your Astro project, you'll see the following folders and files:

- Export designs as PNG

- Share designs via social media```text

/

### 📱 **Responsive Design**├── public/

- Mobile-first approach with Tailwind CSS v4│   └── favicon.svg

- Works seamlessly on desktop, tablet, and mobile├── src

- Touch-friendly controls for mobile users│   ├── assets

- Glassmorphism UI with dark mode│   │   └── astro.svg

│   ├── components

### 📄 **Multi-Page Application**│   │   └── Welcome.astro

- **Home** - Hero section with 3D preview│   ├── layouts

- **Designer** (`/diseña`) - Full customization interface│   │   └── Layout.astro

- **Models** (`/modelos`) - Browse cap collection│   └── pages

- **Gallery** (`/galeria`) - Community designs showcase│       └── index.astro

- **Community** (`/comunidad`) - Social feed└── package.json

- **Contact** (`/contacto`) - Contact form with Formspree integration```



### 🚀 **Performance Optimized**To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

- Static site generation with Astro

- Lazy loading of components## 🧞 Commands

- Optimized Three.js rendering

- ~50KB total bundle size (excluding Three.js)All commands are run from the root of the project, from a terminal:



---| Command                   | Action                                           |

| :------------------------ | :----------------------------------------------- |

## 🛠️ Tech Stack| `npm install`             | Installs dependencies                            |

| `npm run dev`             | Starts local dev server at `localhost:4321`      |

| Technology | Purpose || `npm run build`           | Build your production site to `./dist/`          |

|-----------|---------|| `npm run preview`         | Preview your build locally, before deploying     |

| **Astro** v5.14.5 | Static site generation & framework || `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

| **Three.js** v0.180 | 3D graphics & visualization || `npm run astro -- --help` | Get help using the Astro CLI                     |

| **Tailwind CSS** v4 | Styling with @tailwindcss/postcss |

| **TypeScript** | Type safety and better DX |## 👀 Want to learn more?

| **Formspree** | Email form handling (no backend needed) |

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ (tested on v22.19.0)
- npm or yarn

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/streetcap.git
cd streetcap

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Server will run on http://localhost:4321

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
streetcap/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Navbar.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── CapModels.astro
│   │   │   ├── Customizer.astro
│   │   │   ├── Gallery.astro
│   │   │   ├── Community.astro
│   │   │   └── Footer.astro
│   │   └── CapViewer3D.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── diseña.astro
│   │   ├── modelos.astro
│   │   ├── galeria.astro
│   │   ├── comunidad.astro
│   │   └── contacto.astro
│   └── styles/
│       └── tailwind.css
├── public/
│   └── favicon.svg
└── Configuration files (astro.config.mjs, etc)
```

---

## 🎮 Usage

### For End Users
1. Visit the home page to see the 3D cap preview
2. Navigate to `/diseña` to customize cap colors
3. Export designs or share via social media
4. Browse gallery and community creations

### For Developers
- Modify `CapViewer3D.astro` to change 3D models
- Update color options in `Customizer.astro`
- Customize styling with Tailwind CSS
- Add new pages in `src/pages/`

---

## 🚀 Deployment

### Deploy to Netlify (Free)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Netlify
# - Go to https://app.netlify.com
# - Click "New site from Git"
# - Build command: npm run build
# - Publish directory: dist

# 3. Add custom domain in Netlify settings
```

---

## 📄 License

This project is available for purchase.

---

**Made with ❤️ using Astro, Three.js, and Tailwind CSS**
