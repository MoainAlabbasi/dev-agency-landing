# NEXUS - State-of-the-Art Dev Agency Landing Page

A stunning, award-worthy landing page built with Next.js 14, featuring WebGL particle effects, smooth scrolling, and cinematic animations.

![NEXUS Preview](preview.png)

## ✨ Features

### 🎆 WebGL Hero Section
- Real-time 3D particle field that reacts to mouse movement
- Magnetic fluid-like particle behavior
- Floating nebula rings with dynamic rotation
- Ambient floating orbs with gradient colors

### 🖱️ Custom Cursor
- Glowing circle cursor with smooth spring physics
- Expands and changes color on hover over interactive elements
- Mix-blend-mode for seamless integration

### 📜 Scrollytelling Experience
- Buttery smooth inertia scrolling with Lenis
- Parallax effects on hero section
- Film-like noise/grain overlay

### ✍️ Animations (Framer Motion)
- Staggered fade-up effects on viewport entry
- Character-by-character typewriter text reveal
- Smooth page transitions

### 💎 Glassmorphism Team Section
- 3D tilt cards with perspective transforms
- Frosted glass effect with backdrop blur
- Animated gradient borders on hover
- Inner glow effects

### 💬 Conversational Form
- Step-by-step chat-like interface
- Animated message bubbles
- Typing indicator
- Multiple input types (text, email, select, textarea)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **3D/WebGL:** React Three Fiber + Three.js
- **Animations:** Framer Motion
- **Smooth Scroll:** Lenis
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dev-agency-landing

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
dev-agency-landing/
├── app/
│   ├── globals.css      # Global styles, CSS variables, animations
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main landing page
├── components/
│   ├── AnimatedText.tsx     # Text animation components
│   ├── ClientProviders.tsx  # Client-side providers wrapper
│   ├── ConversationalForm.tsx # Chat-like contact form
│   ├── CustomCursor.tsx     # Custom cursor component
│   ├── Hero3D.tsx           # WebGL particle scene
│   ├── Navigation.tsx       # Header navigation
│   ├── NoiseOverlay.tsx     # Film grain effect
│   ├── SmoothScroll.tsx     # Lenis scroll wrapper
│   └── TiltCard.tsx         # 3D tilt glassmorphism cards
├── lib/
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## 🎨 Design System

### Colors
- **Space Black:** `#0a0a0a` - Primary background
- **Neon Cyan:** `#00f0ff` - Primary accent
- **Neon Purple:** `#bf00ff` - Secondary accent
- **Neon Pink:** `#ff00aa` - Tertiary accent

### Typography
- **Sans:** Inter (via Google Fonts)
- **Mono:** JetBrains Mono (via Google Fonts)

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `app/globals.css`:

```css
:root {
  --space-black: #0a0a0a;
  --neon-cyan: #00f0ff;
  --neon-purple: #bf00ff;
  --neon-pink: #ff00aa;
}
```

### Modifying Particle Field
Edit `components/Hero3D.tsx` to adjust:
- Particle count
- Movement speed
- Color gradients
- Mouse interaction strength

### Updating Content
Edit the data arrays in `app/page.tsx`:
- `services` - Service offerings
- `team` - Team members
- `projects` - Portfolio items

## 📱 Responsive Design

- Mobile-first approach
- Custom cursor disabled on touch devices
- Optimized animations for mobile
- Responsive typography with `clamp()`

## ⚡ Performance

- Dynamic imports for WebGL components
- Optimized particle count for smooth 60fps
- Lazy loading for below-fold content
- Efficient Framer Motion animations

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Credits

- [Three.js](https://threejs.org/) - 3D library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lenis](https://lenis.studiofreight.com/) - Smooth scroll library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

Built with 💜 by Moain Alabbasi
