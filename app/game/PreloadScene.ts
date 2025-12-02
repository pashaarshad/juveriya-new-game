import * as Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create loading bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      fontSize: '24px',
      color: '#ffffff'
    });
    loadingText.setOrigin(0.5);

    const percentText = this.add.text(width / 2, height / 2, '0%', {
      fontSize: '18px',
      color: '#ffffff'
    });
    percentText.setOrigin(0.5);

    // Loading progress
    this.load.on('progress', (value: number) => {
      percentText.setText(Math.floor(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xff69b4, 1);
      progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // Load actual sprite images
    this.load.image('hero_idle', 'assets/characters/hero_idle.png');
    this.load.image('hero_walk', 'assets/characters/hero_walk.png');
    this.load.image('hero_jump', 'assets/characters/hero_jump.png');
    this.load.image('hero_attack', 'assets/characters/hero_attack.png');
    this.load.image('hero_damage', 'assets/characters/hero_damage.png');
    this.load.image('fox_idle', 'assets/characters/fox_idle.png');

    // Create additional placeholder assets for items/enemies
    this.createPlaceholderAssets();
  }

  createPlaceholderAssets() {
    const graphics = this.add.graphics();
    
    // Hero - Paper Mario style character with details
    graphics.fillStyle(0x5B9BD5, 1); // Blue body
    graphics.fillRoundedRect(0, 12, 32, 36, 4);
    graphics.fillStyle(0xFF6B6B, 1); // Red hat
    graphics.fillCircle(16, 8, 10);
    graphics.fillStyle(0xFFE5B4, 1); // Face
    graphics.fillCircle(16, 20, 8);
    graphics.lineStyle(2, 0x000000, 1); // Outline
    graphics.strokeRoundedRect(0, 12, 32, 36, 4);
    graphics.strokeCircle(16, 8, 10);
    graphics.generateTexture('hero', 32, 48);
    graphics.clear();

    // Enemy - Slime with paper texture look
    graphics.fillStyle(0x7FD17F, 1); // Green slime
    graphics.fillEllipse(16, 20, 16, 14);
    graphics.fillStyle(0x90EE90, 1); // Highlight
    graphics.fillEllipse(12, 16, 6, 5);
    graphics.lineStyle(3, 0x000000, 1); // Thick outline
    graphics.strokeEllipse(16, 20, 16, 14);
    graphics.fillStyle(0x000000, 1); // Eyes
    graphics.fillCircle(11, 18, 2);
    graphics.fillCircle(21, 18, 2);
    graphics.generateTexture('enemy', 32, 32);
    graphics.clear();

    // Partner - Fox with robotic look
    graphics.fillStyle(0xFF9F43, 1); // Orange fox
    graphics.fillEllipse(12, 12, 10, 8);
    graphics.fillTriangle(4, 8, 8, 4, 8, 10); // Ear
    graphics.fillTriangle(16, 8, 20, 4, 20, 10); // Ear
    graphics.fillStyle(0x00BFFF, 1); // Blue LED eyes
    graphics.fillCircle(9, 12, 2);
    graphics.fillCircle(15, 12, 2);
    graphics.fillStyle(0xC0C0C0, 1); // Metal patch
    graphics.fillRect(10, 16, 4, 2);
    graphics.lineStyle(2, 0x000000, 1); // Outline
    graphics.strokeEllipse(12, 12, 10, 8);
    graphics.generateTexture('partner', 24, 24);
    graphics.clear();

    // Coin - Shiny with details
    graphics.fillStyle(0xFFD700, 1);
    graphics.fillCircle(12, 12, 11);
    graphics.fillStyle(0xFFA500, 1); // Shadow side
    graphics.fillEllipse(9, 12, 4, 11);
    graphics.fillStyle(0xFFFF00, 1); // Shine
    graphics.fillCircle(15, 9, 3);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.strokeCircle(12, 12, 11);
    graphics.generateTexture('coin', 24, 24);
    graphics.clear();

    // Heart - Detailed HP heart
    graphics.fillStyle(0xFF0000, 1);
    graphics.beginPath();
    graphics.arc(8, 8, 5, Math.PI, 0, false);
    graphics.arc(16, 8, 5, Math.PI, 0, false);
    graphics.lineTo(20, 12);
    graphics.lineTo(12, 20);
    graphics.lineTo(4, 12);
    graphics.closePath();
    graphics.fillPath();
    graphics.fillStyle(0xFF6B6B, 1); // Highlight
    graphics.fillCircle(10, 10, 2);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.strokePath();
    graphics.generateTexture('heart', 24, 24);
    graphics.clear();

    // Background elements
    graphics.fillStyle(0x87CEEB, 1); // Sky blue
    graphics.fillRect(0, 0, 1280, 400);
    graphics.fillStyle(0xFFFFFF, 0.8); // Clouds
    graphics.fillEllipse(200, 100, 60, 30);
    graphics.fillEllipse(600, 150, 80, 40);
    graphics.fillEllipse(1000, 120, 70, 35);
    graphics.generateTexture('bg_sky', 1280, 400);
    graphics.clear();

    graphics.destroy();
  }

  create() {
    // Create animations
    this.createAnimations();
    
    // Start the overworld scene
    this.scene.start('OverworldScene');
  }

  createAnimations() {
    // Placeholder animations will be created when actual sprite sheets are loaded
  }
}
