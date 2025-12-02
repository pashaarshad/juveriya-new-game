# 🎨 Quick Asset Generation Guide

## Copy these 10 essential prompts into your AI image generator

---

### 1. HERO IDLE (hero_idle.png - 128x128)
```
Paper Mario-style flat 2D character standing idle, crafted from layered paper and cardboard textures, soft shadows, thick outline, bright colorful style. The hero is a friendly, adventurous character wearing simple clothes (blue shirt, red cap). Character is facing slightly toward the camera, light smile. High-resolution sprite, transparent background, 128x128 pixels.
```

---

### 2. HERO WALKING (hero_walk.png - 128x128)
```
Paper Mario-style 2D walking animation frames. Same hero as idle (blue shirt, red cap), shown in walking cycle: step forward, mid-step, leg back. Layered paper texture, sticker-like look, thick outlines, soft shadow. Bright colors. Transparent background, evenly spaced animation frames, 128x128 pixels.
```

---

### 3. PARTNER SPARK IDLE (partner_spark_idle.png - 96x96)
```
Paper Mario-style robotic fox companion named Spark. Orange folded-paper fur, metal patches, LED eyes glowing blue. Sticker-like layered paper look with thick outline, soft shadow. Fox is sitting calmly, friendly expression, transparent background, 96x96 pixels.
```

---

### 4. ENEMY SLIME (enemy_slime_idle.png - 96x96)
```
Paper Mario-style slime enemy made from layered green paper blobs, cute but mischievous expression, glossy shine drawn with white strips. Flat 2D cutout look, thick outline, transparent background, 96x96 pixels.
```

---

### 5. GOLD COIN (item_coin.png - 48x48)
```
Paper Mario-style gold coin icon made of shiny yellow paper circle, folded edges, thick outline, slight glossy highlight. Simple clean design, embossed 'C' in middle, transparent background, 48x48 pixels.
```

---

### 6. HEALTH HEART (item_heart.png - 48x48)
```
Paper Mario-style heart icon for health. Red paper cutout heart shape, layered texture, soft highlight, thick outline, cute rounded appearance, transparent background, 48x48 pixels.
```

---

### 7. DIALOGUE BOX (ui_dialogue_box.png - 800x200)
```
Paper Mario-style dialogue box. White rounded rectangle made from slightly textured paper, thick black outline, small folded-paper corners, soft shadow. Leave empty space in center for text. Paper grain visible, transparent background, 800x200 pixels.
```

---

### 8. VILLAGE BACKGROUND (bg_village.png - 2048x1152)
```
Paper Mario-style village background. Paper houses with folded roofs, cobblestone paths made from torn paper circles, colorful flower gardens, bright cheerful atmosphere. Side-scrolling parallax background, layered paper depth, high resolution 2048x1152 pixels.
```

---

### 9. BATTLE ARENA (bg_battle_arena.png - 1280x720)
```
Paper Mario-style battle arena background. Circular stage made from layered cardboard platform, spotlight effect, curtains made of folded paper, theater-like setting. Dramatic battle atmosphere with paper texture throughout, 1280x720 pixels.
```

---

### 10. GAME LOGO (game_logo.png - 1024x512)
```
Game logo 'Juveriya Game' in playful hand-cut paper style, 3D paper layers, bright pink and purple palette, bold rounded letters with subtle fold lines and stitched paper texture, drop shadow, decorative star and flower paper cutouts, cinematic composition, high-res, clean edges, 1024x512 pixels.
```

---

## 📂 Where to Save These Files

After generating, save to these locations:

```
/public/assets/characters/
  - hero_idle.png
  - hero_walk.png
  - partner_spark_idle.png

/public/assets/enemies/
  - enemy_slime_idle.png

/public/assets/items/
  - item_coin.png
  - item_heart.png

/public/assets/ui/
  - ui_dialogue_box.png
  - game_logo.png

/public/assets/environments/
  - bg_village.png
  - bg_battle_arena.png
```

---

## 🎨 AI Tool Recommendations

### Best Tools for Paper Mario Style:

1. **DALL-E 3** (via ChatGPT Plus)
   - Great for paper textures
   - Consistent style
   - High quality

2. **Midjourney**
   - Excellent artistic quality
   - Good with layered looks
   - Premium results

3. **Stable Diffusion**
   - Free and open source
   - Highly customizable
   - Good for batch generation

4. **Leonardo.ai**
   - Free tier available
   - Game asset focused
   - Good consistency

---

## 🔧 After Generating Assets

### Update PreloadScene.ts

Replace the `createPlaceholderAssets()` section with:

```typescript
preload() {
  // Load actual assets
  this.load.image('hero', 'assets/characters/hero_idle.png');
  this.load.image('partner', 'assets/characters/partner_spark_idle.png');
  this.load.image('enemy', 'assets/enemies/enemy_slime_idle.png');
  this.load.image('coin', 'assets/items/item_coin.png');
  this.load.image('heart', 'assets/items/item_heart.png');
  this.load.image('bg_village', 'assets/environments/bg_village.png');
  this.load.image('bg_battle', 'assets/environments/bg_battle_arena.png');
  this.load.image('dialogue_box', 'assets/ui/ui_dialogue_box.png');
  this.load.image('logo', 'assets/ui/game_logo.png');
}
```

---

## ✅ Testing Checklist

After adding each asset:

- [ ] File is in correct folder
- [ ] Filename matches exactly (case-sensitive)
- [ ] Image has transparent background (PNG)
- [ ] Size matches specification
- [ ] Game loads without errors
- [ ] Asset displays correctly in-game

---

## 🎯 Generation Tips

### For Best Results:

1. **Be Specific** - Include "Paper Mario-style" in every prompt
2. **Mention Texture** - Always specify "paper texture" or "layered paper"
3. **Add Details** - Include "thick outline", "soft shadow"
4. **State Size** - End with exact pixel dimensions
5. **Request Transparency** - Always say "transparent background"

### Style Consistency:

Use these keywords in all prompts:
- "Paper cutout style"
- "Layered cardboard"
- "Thick black outline"
- "Sticker-like"
- "Craft paper texture"
- "Folded edges"

---

## 🚀 Quick Start Workflow

### 1. Generate First Asset (Hero)
- Copy Hero Idle prompt
- Paste into AI tool
- Generate image
- Download as PNG

### 2. Place in Project
```bash
/public/assets/characters/hero_idle.png
```

### 3. Update Code
Edit `PreloadScene.ts` to load the asset

### 4. Test
- Refresh browser
- Check if hero looks paper-like!

### 5. Repeat
Continue with remaining 9 assets

---

## 📊 Priority Order

Generate in this order for quickest visual improvement:

**Phase 1** (Most Visible):
1. Hero Idle
2. Enemy Slime
3. Coin
4. Heart

**Phase 2** (Supporting):
5. Partner Spark
6. Hero Walking
7. Battle Arena Background

**Phase 3** (Polish):
8. Village Background
9. Dialogue Box
10. Game Logo

---

## 💡 Alternative: Use Placeholder Art

If you don't want to generate assets yet, the game works perfectly with the current colored shapes! 

The gameplay is complete - assets are just visual polish.

---

## 🎨 Color Palette Reference

Match these colors for consistency:

**Characters:**
- Hero: Blue `#5B9BD5`, Red `#FF6B6B`
- Partner: Orange `#FF9F43`
- Enemy: Red `#FF6B6B`

**Items:**
- Coin: Gold `#FFD700`
- Heart: Red `#FF0000`

**Environments:**
- Sky: Light Blue `#87CEEB`
- Grass: Green `#7FD17F`
- Paper: Cream `#FFF7E6`

---

**Ready to make your game beautiful!** 🎨✨

Start with Hero Idle and work your way through the list. Each asset you add will make the game more visually appealing!
