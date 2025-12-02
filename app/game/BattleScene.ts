import * as Phaser from 'phaser';

interface BattleAction {
  type: 'attack' | 'defend' | 'item' | 'partner';
  target?: string;
}

export default class BattleScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private partner!: Phaser.GameObjects.Rectangle;
  private enemy!: Phaser.GameObjects.Rectangle;
  private playerHP!: number;
  private enemyHP!: number;
  private enemyMaxHP: number = 50;
  private turnText!: Phaser.GameObjects.Text;
  private actionButtons: Phaser.GameObjects.Text[] = [];
  private playerTurn: boolean = true;
  private battleLog: string[] = [];

  constructor() {
    super({ key: 'BattleScene' });
  }

  create(data: any) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Battle background with paper texture
    this.add.rectangle(0, 0, width, height, 0xFFF7E6).setOrigin(0);
    
    // Add stage platform
    const stage = this.add.graphics();
    stage.fillStyle(0xEDE0C8, 1);
    stage.fillEllipse(width / 2, height - 150, 400, 100);
    stage.lineStyle(3, 0x000000, 1);
    stage.strokeEllipse(width / 2, height - 150, 400, 100);

    // Add decorative curtains
    const curtainLeft = this.add.graphics();
    curtainLeft.fillStyle(0xFF69B4, 1);
    curtainLeft.fillRect(0, 0, 100, height);
    curtainLeft.fillStyle(0xFF1493, 0.5);
    for (let i = 0; i < 5; i++) {
      curtainLeft.fillRect(i * 20, 0, 10, height);
    }

    const curtainRight = this.add.graphics();
    curtainRight.fillStyle(0xFF69B4, 1);
    curtainRight.fillRect(width - 100, 0, 100, height);
    curtainRight.fillStyle(0xFF1493, 0.5);
    for (let i = 0; i < 5; i++) {
      curtainRight.fillRect(width - 100 + i * 20, 0, 10, height);
    }

    // Title with shadow
    this.add.text(width / 2 + 3, 43, 'BATTLE!', {
      fontSize: '48px',
      color: '#000000',
      fontStyle: 'bold',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    this.add.text(width / 2, 40, 'BATTLE!', {
      fontSize: '48px',
      color: '#FF69B4',
      fontStyle: 'bold',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Create player with actual sprite
    this.player = this.add.rectangle(200, height - 350, 48, 64, 0x5B9BD5);
    this.player.setAlpha(0); // Hide rectangle
    const playerSprite = this.add.image(200, height - 350, 'hero_idle');
    playerSprite.setScale(0.2); // Scale to fit battle scene
    playerSprite.setData('isPlayer', true);
    this.add.text(200, height - 280, 'Hero', {
      fontSize: '20px',
      color: '#000000',
      fontStyle: 'bold',
      backgroundColor: '#ffffff',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    // Add idle animation to player
    this.tweens.add({
      targets: playerSprite,
      y: height - 355,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Create partner with actual sprite
    this.partner = this.add.rectangle(150, height - 320, 36, 36, 0xFF9F43);
    this.partner.setAlpha(0); // Hide rectangle
    const partnerSprite = this.add.image(150, height - 320, 'fox_idle');
    partnerSprite.setScale(0.13); // Scale fox for battle
    partnerSprite.setData('isPartner', true);
    this.add.text(150, height - 270, 'Spark', {
      fontSize: '18px',
      color: '#000000',
      fontStyle: 'bold',
      backgroundColor: '#ffffff',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5);

    // Add idle animation to partner
    this.tweens.add({
      targets: partnerSprite,
      y: height - 325,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Create enemy with sprite
    this.enemy = this.add.rectangle(width - 200, height - 350, 48, 48, 0xFF6B6B);
    const enemySprite = this.add.image(width - 200, height - 350, 'enemy').setScale(1.8);
    this.add.text(width - 200, height - 280, 'Slime', {
      fontSize: '20px',
      color: '#000000',
      fontStyle: 'bold',
      backgroundColor: '#ffffff',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    // Add menacing animation to enemy
    this.tweens.add({
      targets: enemySprite,
      scale: 1.9,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Initialize HP
    this.playerHP = this.registry.get('playerHP');
    this.enemyHP = this.enemyMaxHP;

    // Create HP bars
    this.createHPBars();

    // Create action menu
    this.createActionMenu();

    // Turn indicator with animation
    this.turnText = this.add.text(width / 2, 100, 'Your Turn!', {
      fontSize: '28px',
      color: '#00AA00',
      fontStyle: 'bold',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.turnText,
      scale: 1.1,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createHPBars() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Player HP
    this.add.rectangle(180, height - 240, 104, 24, 0x000000).setOrigin(0);
    const playerHPBar = this.add.rectangle(182, height - 238, 100, 20, 0x00FF00).setOrigin(0);
    playerHPBar.setData('maxWidth', 100);
    playerHPBar.setData('type', 'playerHP');

    this.add.text(182, height - 235, `${this.playerHP}`, {
      fontSize: '14px',
      color: '#ffffff'
    });

    // Enemy HP
    this.add.rectangle(width - 224, height - 240, 104, 24, 0x000000).setOrigin(0);
    const enemyHPBar = this.add.rectangle(width - 222, height - 238, 100, 20, 0xFF0000).setOrigin(0);
    enemyHPBar.setData('maxWidth', 100);
    enemyHPBar.setData('type', 'enemyHP');

    this.add.text(width - 222, height - 235, `${this.enemyHP}`, {
      fontSize: '14px',
      color: '#ffffff'
    });
  }

  createActionMenu() {
    const height = this.cameras.main.height;
    const actions = ['Attack', 'Defend', 'Partner Ability', 'Item'];
    
    actions.forEach((action, index) => {
      const button = this.add.text(
        50 + (index * 150),
        height - 120,
        action,
        {
          fontSize: '20px',
          color: '#000000',
          backgroundColor: '#FFE5B4',
          padding: { x: 15, y: 10 }
        }
      );
      button.setInteractive({ useHandCursor: true });
      button.on('pointerover', () => button.setBackgroundColor('#FFD166'));
      button.on('pointerout', () => button.setBackgroundColor('#FFE5B4'));
      button.on('pointerdown', () => this.handleAction(action.toLowerCase().replace(' ', '_')));
      
      this.actionButtons.push(button);
    });
  }

  handleAction(action: string) {
    if (!this.playerTurn) return;

    this.playerTurn = false;
    this.turnText.setText('Enemy Turn...');

    switch (action) {
      case 'attack':
        this.playerAttack();
        break;
      case 'defend':
        this.playerDefend();
        break;
      case 'partner_ability':
        this.partnerAbility();
        break;
      case 'item':
        this.useItem();
        break;
    }

    // Enemy turn after delay
    this.time.delayedCall(1500, () => {
      if (this.enemyHP > 0) {
        this.enemyAttack();
      }
    });
  }

  playerAttack() {
    const attack = this.registry.get('playerAttack');
    const damage = Phaser.Math.Between(attack - 2, attack + 2);
    this.enemyHP = Math.max(0, this.enemyHP - damage);

    // Get player sprite and change to attack animation
    const playerSprites = this.children.list.filter((child: any) => 
      child.getData && child.getData('isPlayer')
    );

    if (playerSprites.length > 0) {
      const playerSprite: any = playerSprites[0];
      const originalTexture = playerSprite.texture.key;
      playerSprite.setTexture('hero_attack');
      
      // Visual feedback - move toward enemy
      this.tweens.add({
        targets: [this.player, playerSprite],
        x: this.enemy.x - 100,
        duration: 200,
        yoyo: true,
        onComplete: () => {
          playerSprite.setTexture('hero_idle');
          this.showDamage(this.enemy, damage);
          this.updateHPBar('enemyHP', this.enemyHP, this.enemyMaxHP);
          this.checkBattleEnd();
        }
      });
    } else {
      // Fallback if sprite not found
      this.tweens.add({
        targets: this.player,
        x: this.enemy.x - 100,
        duration: 200,
        yoyo: true,
        onComplete: () => {
          this.showDamage(this.enemy, damage);
          this.updateHPBar('enemyHP', this.enemyHP, this.enemyMaxHP);
          this.checkBattleEnd();
        }
      });
    }
  }

  playerDefend() {
    this.add.text(this.player.x, this.player.y - 50, 'Defending!', {
      fontSize: '16px',
      color: '#0000FF'
    }).setOrigin(0.5);

    this.time.delayedCall(1000, () => {
      this.playerTurn = true;
      this.turnText.setText('Your Turn!');
    });
  }

  partnerAbility() {
    const damage = 15;
    this.enemyHP = Math.max(0, this.enemyHP - damage);

    this.tweens.add({
      targets: this.partner,
      x: this.enemy.x - 80,
      duration: 300,
      yoyo: true,
      onComplete: () => {
        this.showDamage(this.enemy, damage, '⚡');
        this.updateHPBar('enemyHP', this.enemyHP, this.enemyMaxHP);
        this.checkBattleEnd();
      }
    });
  }

  useItem() {
    const heal = 20;
    this.playerHP = Math.min(this.registry.get('playerMaxHP'), this.playerHP + heal);
    this.registry.set('playerHP', this.playerHP);

    this.showDamage(this.player, heal, '❤️', '#00FF00');
    this.updateHPBar('playerHP', this.playerHP, this.registry.get('playerMaxHP'));

    this.time.delayedCall(1000, () => {
      this.playerTurn = true;
      this.turnText.setText('Your Turn!');
    });
  }

  enemyAttack() {
    const damage = Phaser.Math.Between(5, 12);
    this.playerHP = Math.max(0, this.playerHP - damage);
    this.registry.set('playerHP', this.playerHP);

    this.tweens.add({
      targets: this.enemy,
      x: this.player.x + 100,
      duration: 200,
      yoyo: true,
      onComplete: () => {
        this.showDamage(this.player, damage);
        this.updateHPBar('playerHP', this.playerHP, this.registry.get('playerMaxHP'));
        this.checkBattleEnd();
        
        if (this.playerHP > 0 && this.enemyHP > 0) {
          this.playerTurn = true;
          this.turnText.setText('Your Turn!');
        }
      }
    });
  }

  showDamage(target: Phaser.GameObjects.Rectangle, amount: number, prefix: string = '', color: string = '#FF0000') {
    const text = this.add.text(target.x, target.y - 30, `${prefix}${amount}`, {
      fontSize: '24px',
      color: color,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: text,
      y: target.y - 80,
      alpha: 0,
      duration: 1000,
      onComplete: () => text.destroy()
    });
  }

  updateHPBar(type: string, current: number, max: number) {
    const bars = this.children.list.filter((child: any) => 
      child.getData && child.getData('type') === type
    );

    bars.forEach((bar: any) => {
      const maxWidth = bar.getData('maxWidth');
      const newWidth = (current / max) * maxWidth;
      bar.width = Math.max(0, newWidth);
    });
  }

  checkBattleEnd() {
    if (this.enemyHP <= 0) {
      this.victory();
    } else if (this.playerHP <= 0) {
      this.defeat();
    }
  }

  victory() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
    this.add.text(width / 2, height / 2 - 50, 'VICTORY!', {
      fontSize: '64px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const coinsEarned = 10;
    const expGained = 25;
    this.registry.set('coins', this.registry.get('coins') + coinsEarned);

    this.add.text(width / 2, height / 2 + 30, `Earned: ${coinsEarned} coins\nEXP: +${expGained}`, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    this.time.delayedCall(3000, () => {
      this.scene.start('OverworldScene');
    });
  }

  defeat() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
    this.add.text(width / 2, height / 2, 'DEFEATED...', {
      fontSize: '64px',
      color: '#FF0000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.time.delayedCall(3000, () => {
      this.registry.set('playerHP', this.registry.get('playerMaxHP'));
      this.scene.start('OverworldScene');
    });
  }
}
