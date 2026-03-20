# Artisanal Roastery & Cafe Menu

A premium, immersive digital menu experience for an artisanal coffee roastery. Built with Angular 21, this application features a bilingual interface (English & Amharic), high-end typography, and a "Swiss-Modern" aesthetic designed to elevate the customer's selection process.

![App Preview](https://picsum.photos/seed/coffee-hero/1200/600)

## ✨ Key Features

- **🌍 Bilingual Support:** Seamless toggle between English and Amharic (Ethiopic) languages.
- **☕ Immersive UI:** A "Technical Dashboard" meets "Editorial Magazine" aesthetic, featuring bento-grid layouts and glassmorphism accents.
- **🖼️ Visual-First Selection:** Floating "Add to Selection" buttons integrated directly onto high-quality item imagery for a streamlined UX.
- **🔍 Smart Discovery:** Real-time search and category filtering to explore the artisanal collection.
- **⭐ Interactive Ratings:** Customer-driven rating system with smooth animations and instant feedback.
- **🛒 Selection Management:** A premium "My Selection" summary with subtotal calculation and order review capabilities.
- **📱 Responsive Design:** Fully optimized for all devices, from ultra-wide desktops to mobile touchscreens.
- **🎭 Motion & Energy:** Powered by the `motion` library for fluid transitions, stagger animations, and interactive hover states.

## 🛠️ Tech Stack

- **Framework:** [Angular 21](https://angular.dev/) (Zoneless, Standalone Components, Signals)
- **Styling:** [Tailwind CSS 4+](https://tailwindcss.com/)
- **Animations:** [Motion](https://motion.dev/) (Vanilla JS)
- **Icons:** [Angular Material Icons](https://material.angular.io/components/icon/overview)
- **Typography:** Inter (Sans), Playfair Display (Serif), JetBrains Mono (Technical)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/artisanal-cafe-menu.git
   ```
2. Navigate to the project directory:
   ```bash
   cd artisanal-cafe-menu
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the following command to start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

### Build

To build the project for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 📂 Project Structure

```text
src/
├── app/
│   ├── core/           # Services, Models, and Mock Data
│   ├── features/       # Main application features (Home, Detail)
│   ├── layout/         # Shared layout components (Header, Footer)
│   └── shared/         # Reusable UI components
├── assets/             # Static assets
└── styles.css          # Global styles and Tailwind configuration
```

## 🎨 Design Philosophy

The application follows a **Hardware/Specialist Tool** mood combined with **Editorial Luxury**:
- **Typography:** Intentional pairings of light-weight serifs for elegance and monospace for technical precision.
- **Color Palette:** A warm `cafe-cream` background contrasted with `cafe-dark` ink and `cafe-gold` accents.
- **Interaction:** High-energy feedback through scale transforms, rotations, and staggered reveal animations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Crafted with passion for the ultimate coffee experience.*
