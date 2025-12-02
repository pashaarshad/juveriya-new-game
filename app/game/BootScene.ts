import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Display loading text
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const loadingText = this.add.text(width / 2, height / 2, 'Loading Juveriya Game...', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    loadingText.setOrigin(0.5);
  }

  create() {
    // Initialize game data
    this.registry.set('playerHP', 100);
    this.registry.set('playerMaxHP', 100);
    this.registry.set('playerAttack', 10);
    this.registry.set('playerDefense', 5);
    this.registry.set('coins', 0);
    this.registry.set('level', 1);
    this.registry.set('exp', 0);
    
    // Start preload scene
    this.scene.start('PreloadScene');
  }
}
