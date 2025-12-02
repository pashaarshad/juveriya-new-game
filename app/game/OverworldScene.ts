import * as Phaser from 'phaser';

export default class OverworldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private partner!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hpText!: Phaser.GameObjects.Text;
  private coinText!: Phaser.GameObjects.Text;
  private enemies: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super({ key: 'OverworldScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create layered background
    this.add.image(width / 2, 200, 'bg_sky').setScale(1);
    
    // Add ground with paper texture effect
    const ground = this.add.graphics();
    ground.fillStyle(0x7FD17F, 1);
    ground.fillRect(0, height - 100, width, 100);
    ground.fillStyle(0x90EE90, 0.3);
    for (let i = 0; i < 10; i++) {
      ground.fillCircle(Phaser.Math.Between(0, width), height - Phaser.Math.Between(80, 100), Phaser.Math.Between(5, 15));
    }

    // Create player using actual sprite
    this.player = this.add.rectangle(100, height - 150, 32, 48, 0x5B9BD5);
    this.player.setAlpha(0); // Hide the rectangle, use sprite instead
    const playerSprite = this.add.image(100, height - 150, 'hero_idle');
    playerSprite.setScale(0.15); // Scale down the large sprite
    playerSprite.setData('isPlayer', true);
    
    // Create partner using actual sprite
    this.partner = this.add.rectangle(60, height - 140, 24, 24, 0xFF9F43);
    this.partner.setAlpha(0); // Hide the rectangle
    const partnerSprite = this.add.image(60, height - 140, 'fox_idle');
    partnerSprite.setScale(0.1); // Scale down the fox sprite
    partnerSprite.setData('isPartner', true);

    // Create some enemies with sprites
    for (let i = 0; i < 3; i++) {
      const enemyX = 300 + i * 150;
      const enemyY = height - 130;
      const enemy = this.add.rectangle(enemyX, enemyY, 32, 32, 0xFF6B6B);
      const enemySprite = this.add.image(enemyX, enemyY, 'enemy');
      enemySprite.setData('enemy', true);
      this.enemies.push(enemy);
      
      // Add floating animation to enemies
      this.tweens.add({
        targets: enemySprite,
        y: enemyY - 5,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Create coins with sprites
    for (let i = 0; i < 5; i++) {
      const coinX = 200 + i * 100;
      const coinY = height - 200;
      const coin = this.add.image(coinX, coinY, 'coin');
      coin.setData('type', 'coin');
      
      // Add sparkle animation to coins
      this.tweens.add({
        targets: coin,
        scale: 1.2,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      // Add rotation
      this.tweens.add({
        targets: coin,
        angle: 360,
        duration: 3000,
        repeat: -1,
        ease: 'Linear'
      });
    }

    // Store sprites for updates
    this.registry.set('playerSprite', playerSprite);
    this.registry.set('partnerSprite', partnerSprite);

    // Create HUD
    this.createHUD();

    // Set up input
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // Add interaction key
    this.input.keyboard!.on('keydown-SPACE', () => {
      this.checkInteraction();
    });

    // Instructions with better styling
    const instructionsBg = this.add.rectangle(width / 2, 30, 600, 50, 0x000000, 0.7);
    instructionsBg.setDepth(100);
    this.add.text(width / 2, 30, 'Arrow Keys: Move | SPACE: Interact/Battle', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(101);
  }

  createHUD() {
    const width = this.cameras.main.width;
    
    // HP display
    const hp = this.registry.get('playerHP');
    const maxHP = this.registry.get('playerMaxHP');
    this.hpText = this.add.text(20, 20, `HP: ${hp}/${maxHP}`, {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    });

    // Coin display
    const coins = this.registry.get('coins');
    this.coinText = this.add.text(width - 20, 20, `Coins: ${coins}`, {
      fontSize: '20px',
      color: '#FFD700',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    }).setOrigin(1, 0);

    // Level display
    const level = this.registry.get('level');
    this.add.text(20, 50, `Level: ${level}`, {
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    });
  }

  update() {
    // Player movement
    let velocityX = 0;
    let velocityY = 0;
    const speed = 3;

    if (this.cursors.left.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
    }

    this.player.x += velocityX;
    this.player.y += velocityY;

    // Keep player in bounds
    const height = this.cameras.main.height;
    const width = this.cameras.main.width;
    this.player.x = Phaser.Math.Clamp(this.player.x, 16, width - 16);
    this.player.y = Phaser.Math.Clamp(this.player.y, 100, height - 110);

    // Update player sprite position
    const playerSprite = this.registry.get('playerSprite');
    if (playerSprite) {
      playerSprite.x = this.player.x;
      playerSprite.y = this.player.y;
      // Flip sprite based on movement direction
      if (velocityX < 0) playerSprite.setFlipX(true);
      if (velocityX > 0) playerSprite.setFlipX(false);
    }

    // Partner follows player with delay
    const partnerSpeed = 0.05;
    this.partner.x += (this.player.x - 40 - this.partner.x) * partnerSpeed;
    this.partner.y += (this.player.y - this.partner.y) * partnerSpeed;

    // Update partner sprite position
    const partnerSprite = this.registry.get('partnerSprite');
    if (partnerSprite) {
      partnerSprite.x = this.partner.x;
      partnerSprite.y = this.partner.y;
    }

    // Check collision with coins
    this.checkCoinCollection();
    
    // Update HUD
    this.updateHUD();
  }

  checkCoinCollection() {
    const coins = this.children.list.filter((child: any) => 
      child.getData && child.getData('type') === 'coin'
    );

    coins.forEach((coin: any) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        coin.x,
        coin.y
      );

      if (distance < 30) {
        coin.destroy();
        const currentCoins = this.registry.get('coins');
        this.registry.set('coins', currentCoins + 1);
      }
    });
  }

  checkInteraction() {
    // Check if player is near an enemy
    for (const enemy of this.enemies) {
      if (!enemy.active) continue;
      
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        enemy.x,
        enemy.y
      );

      if (distance < 60) {
        // Start battle
        this.scene.start('BattleScene', { returnScene: 'OverworldScene' });
        return;
      }
    }
  }

  updateHUD() {
    const hp = this.registry.get('playerHP');
    const maxHP = this.registry.get('playerMaxHP');
    this.hpText.setText(`HP: ${hp}/${maxHP}`);

    const coins = this.registry.get('coins');
    this.coinText.setText(`Coins: ${coins}`);
  }
}
