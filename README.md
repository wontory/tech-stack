# tech-stack

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

![tech-stack](https://tech-stack.wontory.dev/api/orbit?text=tech-stack&slugs=typescript,simpleicons,tailwindcss,nextdotjs)

> Showcase your tech stack with beautiful animated SVGs

**tech-stack** is a web application that lets you visualize your technology stack in style. Make your GitHub profile, project README, or portfolio site stand out with eye-catching animated graphics.

🔗 [https://tech-stack.wontory.dev](https://tech-stack.wontory.dev)

## ✨ Features

### 🪐 Orbit (Orbital Animation)

- **3,200+ brand icons** supported (powered by Simple Icons)
- **Real-time customization**: Instant preview with your choice of icons and text
- **Smooth animations**: Icons orbit around center text with a glowing effect
- **Dark mode** fully supported
- **One-click embedding**: Copy markdown code and paste anywhere

### 🎯 Use Cases

- **GitHub profile enhancement**: Show your tech stack at a glance
- **Project documentation**: Visualize technologies used in your README
- **Portfolio sites**: Present your skills with personality
- **Team pages**: Showcase your team's technology in style

## 🚀 How to Use

### 1. Create on the Web

1. Visit [tech-stack.wontory.dev](https://tech-stack.wontory.dev)
2. Select your desired technology icons
3. Enter center text (e.g., "My Stack", "Tech")
4. Preview the animation in real-time
5. Copy the generated markdown code

### 2. Use the API Directly

You can generate SVGs using just the URL, without the web editor:

```markdown
![My Tech Stack](https://tech-stack.wontory.dev/api/orbit?text=MyStack&slugs=typescript,react,nextdotjs)
```

<details>
<summary>Preview</summary>

![My Tech Stack](https://tech-stack.wontory.dev/api/orbit?text=MyStack&slugs=typescript,react,nextdotjs)

</details>

#### Parameters

- `text`: Text to display in the center
- `slugs`: Simple Icons identifiers (comma-separated)

#### Examples

```markdown
![Backend](https://tech-stack.wontory.dev/api/orbit?text=Backend&slugs=nodedotjs,postgresql,redis,docker)

![Frontend](https://tech-stack.wontory.dev/api/orbit?text=Frontend&slugs=react,typescript,tailwindcss,vite)
```

<details>
<summary>Preview</summary>

![Backend](https://tech-stack.wontory.dev/api/orbit?text=Backend&slugs=nodedotjs,postgresql,redis,docker)

![Frontend](https://tech-stack.wontory.dev/api/orbit?text=Frontend&slugs=react,typescript,tailwindcss,vite)

</details>

### 3. Embed Anywhere

The generated markdown code works on:

- GitHub README.md
- GitLab documentation
- Notion pages
- Blog posts
- Any markdown-based platform

## 📸 Demo

Experience these features on the website:

- Interactive icon search and selection
- Real-time animation preview
- Dark/light theme toggle
- One-click markdown code copying

## 🛠️ Running Locally

To contribute to development or run locally:

### Prerequisites

- Node.js 18 or above
- pnpm 10 or above

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/wontory/tech-stack.git
cd tech-stack

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will run at `http://localhost:3000`.

### Build

```bash
pnpm build
```

## 🔧 Tech Stack

This project is built with:

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Simple Icons** - 3,200+ brand icons
- **Turborepo** - Monorepo management
- **Biome** - Linting and formatting

## 🗺️ Roadmap

- [x] Orbit animation SVG generation
- [x] Real-time preview and customization
- [x] API endpoint
- [x] Dark mode support
- [ ] Badge-style SVG (in development)
- [ ] More animation options

## 🤝 Contributing

Contributions are always welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the [MIT License](LICENSE).

## 👨‍💻 Author

**Seongwon Jo** ([@wontory](https://github.com/wontory))

---

⭐ If you find this project useful, please consider giving it a star!
