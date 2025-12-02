# 🎮 Juveriya Game - Paper Mario Style RPG

A beautiful Paper Mario-inspired 2D RPG built with **Next.js**, **TypeScript**, and **Phaser 3**. Features turn-based battles, partner characters, collectibles, and procedurally generated music!

![Game Status](https://img.shields.io/badge/status-playable-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Phaser](https://img.shields.io/badge/Phaser-3.80-orange)

---

## ✨ Features

### 🎯 Core Gameplay
- **Overworld Exploration** - Navigate colorful paper-craft environments
- **Turn-Based Battles** - Strategic combat system with multiple actions
- **Partner System** - Battle alongside Spark the robotic fox
- **Collectibles** - Gather coins and items throughout your adventure
- **Dynamic HUD** - Real-time HP, coins, and level tracking

### 🎨 Visual Style
- Paper Mario-inspired flat 2D aesthetic
- Layered paper textures and craft materials
- Bright, colorful cartoon style
- Smooth animations and visual effects

### 🎵 Audio
- Procedurally generated background music using Web Audio API
- No audio files required - all sounds generated in real-time
- Upbeat Paper Mario-style melodies
- Mute/unmute toggle

### ⚔️ Battle System
- **4 Action Types:**
  - Attack - Basic damage to enemies
  - Defend - Prepare for enemy attacks
  - Partner Ability - Spark's electric attack (15 damage)
  - Item - Heal 20 HP
- Turn-based combat flow
- HP bars with visual feedback
- Damage numbers with animations
- Victory/Defeat screens with rewards

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
```bash
cd juveriya-new-game
```

2. **Install dependencies:**
```bash
npm install
```

3. **Add your image (Optional):**
   - Place `me.jpg` in the `/public` folder for the loading screen

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Play

### Loading Screen
1. Wait for the loading animation (3 seconds)
2. Click **PLAY** button when it appears
3. Enjoy the procedurally generated music!

### Overworld Controls
- **Arrow Keys** - Move your character
- **SPACE** - Interact with objects and start battles
- Walk near enemies and press SPACE to battle

### Battle Controls
- Click **Attack** - Deal damage to enemy
- Click **Defend** - Protect yourself
- Click **Partner Ability** - Spark uses electric attack
- Click **Item** - Use healing potion

### Objectives
- Collect gold coins scattered around the world
- Defeat enemies to earn coins and EXP
- Explore the colorful paper world
- Level up your character

---

## 📁 Project Structure

```
juveriya-new-game/
├── app/
│   ├── components/
│   │   ├── LoadingScreen.tsx      # Initial loading screen
│   │   ├── FamilyGame.tsx         # Original simple game (backup)
│   │   └── MusicPlayer.tsx        # Music system component
│   ├── game/
│   │   ├── BootScene.ts           # Initialize game data
│   │   ├── PreloadScene.ts        # Load assets and create placeholders
│   │   ├── OverworldScene.ts      # Main exploration scene
│   │   ├── BattleScene.ts         # Turn-based battle system
│   │   ├── PhaserGame.tsx         # Phaser game wrapper
│   │   └── GameMusicPlayer.tsx    # Game music controller
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main entry point
├── public/
│   ├── assets/                    # Game assets folder
│   └── me.jpg                     # Your loading screen image
├── ASSETS_GUIDE.md                # Complete asset list with AI prompts
├── README.md                      # This file
├── package.json
└── tsconfig.json
```

---

## 🎨 Asset Creation Guide

See **[ASSETS_GUIDE.md](./ASSETS_GUIDE.md)** for:
- **61+ unique asset specifications**
- **Ready-to-use AI image prompts** for every asset
- Complete file naming conventions
- Size specifications for each sprite
- Color palette guidelines
- Paper Mario style guidelines

### Quick Asset Generation
Each asset includes a prompt like this:

```
Filename: hero_idle.png
Size: 128x128
Prompt: "Paper Mario-style flat 2D character standing idle, 
crafted from layered paper and cardboard textures..."
```

Simply paste prompts into:
- DALL-E
- Midjourney  
- Stable Diffusion
- Any AI image generator

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework |
| **TypeScript** | Type-safe development |
| **Phaser 3** | 2D game engine |
| **Tailwind CSS** | Styling |
| **Web Audio API** | Procedural music |

---

## 🎯 Game Systems

### Player Stats
- **HP** - Health points (starts at 100)
- **Attack** - Damage dealt (10 base)
- **Defense** - Damage reduction (5 base)
- **Level** - Character progression
- **EXP** - Experience points
- **Coins** - In-game currency

### Partner: Spark (Robotic Fox)
- Orange folded-paper fur
- Metal patches and LED eyes
- Special ability: Electric Spark (15 damage)
- Follows player in overworld

### Enemies
- **Slime** - Basic green blob enemy (50 HP)
- Deals 5-12 damage per attack
- Drops 10 coins on defeat
- Awards 25 EXP

---

## 🎨 Visual Features

### Paper-Craft Aesthetic
- Layered 2D sprites with depth
- Visible paper grain textures
- Fold lines and stitching details
- Soft drop shadows
- Bright saturated colors

### Color Palette
- **Paper Base:** `#FFF7E6` (cream), `#EDE0C8` (tan)
- **Hero:** `#5B9BD5` (blue), `#FF6B6B` (red)
- **Partner:** `#FF9F43` (orange)
- **Environment:** `#87CEEB` (sky), `#7FD17F` (grass)

---

## 🎵 Music System

### Procedural Generation
- No audio files required
- Real-time synthesis using Web Audio API
- Paper Mario-inspired upbeat melodies
- Bass line accompaniment
- Looping background music

### Musical Elements
- Melody: Triangle waves
- Bass: Sine waves  
- Notes: C5, E5, G5, A5 scale
- Tempo: ~100 BPM
- Volume: Adjustable (8% default)

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Shop system with items and badges
- [ ] Multiple world areas (6 planned)
- [ ] More enemy types (20 total)
- [ ] Boss battles with phases
- [ ] Quest system with NPCs
- [ ] Inventory management
- [ ] Badge equipment system
- [ ] Level progression and stat increases
- [ ] Save/Load system
- [ ] Multiple partner characters

### Art & Assets
- [ ] Replace placeholder sprites with paper-craft art
- [ ] Add sprite animations (walk, jump, attack)
- [ ] Create parallax backgrounds
- [ ] Design UI elements (buttons, menus, dialogue boxes)
- [ ] Add visual effects (sparkles, explosions, healing)
- [ ] Generate all 61+ assets from ASSETS_GUIDE.md

### Polish
- [ ] Sound effects for actions
- [ ] Particle effects
- [ ] Camera shake on impacts
- [ ] Smoother transitions
- [ ] Tutorial system
- [ ] Accessibility options

---

## 🐛 Known Issues

- Sprites are currently placeholder rectangles/circles
- No sprite animations (static graphics)
- Limited enemy variety
- Basic AI behavior
- No save system yet

---

## 📝 Development Notes

### Current Game Loop
1. **Boot** → Initialize stats
2. **Preload** → Generate placeholder assets
3. **Overworld** → Explore and collect coins
4. **Battle** → Engage enemies in turn-based combat
5. **Victory/Defeat** → Return to overworld

### Asset Pipeline
Currently using procedural graphics. To add real assets:
1. Generate images using prompts from ASSETS_GUIDE.md
2. Place in `/public/assets/` folders
3. Update PreloadScene.ts to load actual files
4. Create sprite sheet JSON files
5. Update animations in each scene

---

## 🤝 Contributing

### How to Add Assets
1. Use prompts from `ASSETS_GUIDE.md`
2. Generate images with AI tools
3. Save to appropriate `/public/assets/` subfolder
4. Update `PreloadScene.ts` loading code
5. Test in-game

### Code Contributions
1. Follow TypeScript best practices
2. Maintain Phaser scene structure
3. Keep paper-craft aesthetic consistent
4. Test all game loops
5. Document new features

---

## 📜 License

This project is open source and available for educational purposes.

---

## 🎮 Credits

- **Game Engine:** Phaser 3
- **Framework:** Next.js
- **Inspired by:** Paper Mario series (Nintendo)
- **Music:** Procedurally generated
- **Art Style:** Paper cutout / craft aesthetic

---

## 🌟 Acknowledgments

Special thanks to:
- Paper Mario series for art inspiration
- Phaser community for excellent documentation
- Web Audio API for enabling procedural music

---

## 📞 Support

Having issues? Check:
1. Node.js version (18+)
2. All dependencies installed (`npm install`)
3. Browser console for errors
4. Phaser documentation: [https://phaser.io](https://phaser.io)

---

**Enjoy playing Juveriya Game!** 🎉✨

Start your paper-craft adventure now! 🏰🦊⚔️
