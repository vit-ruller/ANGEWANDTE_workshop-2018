import 'styles/index.scss';

import Phaser from 'phaser';
import pad from 'pad';
import poem from './poem.js';

const config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0,
    transparent: true,
    pixelArt: true,
    resolution:	1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let cursors;
let player;
let score = 0;

function preload() {
    this.load.tilemapTiledJSON('map', 'assets/multiple-tile-sizes-collision.json');

    this.load.image('ground_1x1', 'assets/ground_1x1.png');
    this.load.image('walls_64x64', 'assets/walls_64x64.png');
    this.load.image('death_32x32', 'assets/death_32x32.png');
    this.load.spritesheet('player', 'assets/player.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet('coins', 'assets/coins.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}

function create() {
    let map = this.add.tilemap('map');

    // Big 64x64 walls
    let bigWallsTiles = map.addTilesetImage('walls_64x64');
    let bigWalls64x64Layer = map.createStaticLayer('Walls 64x64 Layer', bigWallsTiles);
    bigWalls64x64Layer.setCollisionByExclusion([-1]);
    //bigWalls64x64Layer.setTileIndexCallback(73, hit, this);

    // Small 32x32walls
    let ground32x32Tiles = map.addTilesetImage('ground_1x1');
    let ground32x32Layer = map.createStaticLayer('Ground 32x32 Layer', ground32x32Tiles);
    ground32x32Layer.setCollisionByExclusion([-1]);

    // Death 32x32walls
    let death32x32Tiles = map.addTilesetImage('death_32x32');
    let death32x32Layer = map.createStaticLayer('Death 32x32 Layer', death32x32Tiles);
    death32x32Layer.setCollisionByExclusion([-1]);

    console.log(death32x32Layer.layer.collideIndexes);
    death32x32Layer.setTileIndexCallback(death32x32Layer.layer.collideIndexes, hit, this);

    let coinTiles = map.addTilesetImage('coins');
    let coin32x32Layer = map.createStaticLayer('Coins 32x32 Layer', coinTiles);

    player = this.physics.add.sprite(190, 400, 'player').setBounce(0.1);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'coins animation',
        frames: this.anims.generateFrameNumbers('coins', {
            start: 0,
            end: 2
        }),
        frameRate: 10,
        repeat: -1
    });

    let stars = this.physics.add.group();

    // needs to be fixed
    let rowIndex = 0;
    let coins = [];
    coin32x32Layer.layer.data.map((row)=> {
      let collIndex = 0;
      row.map((tile) => {
        if (tile.index > 0 ) {
          coins.push(tile);
        }
        collIndex++;
      });
      rowIndex++;
    });

    console.log(coins.length);
    coins.forEach((tile) => {
      let trope = this.physics.add.sprite(tile.x * 32 + 16, tile.y * 32 + 16, 'player').setBounce(1);
      trope.play('coins animation', true);
      this.physics.add.collider(trope, bigWalls64x64Layer);
            this.physics.add.collider(trope, ground32x32Layer);
            this.physics.add.overlap(player, trope, collectCoin, null, this);
        });

        coin32x32Layer.visible = false;

    this.physics.add.collider(player, ground32x32Layer);
    this.physics.add.collider(player, bigWalls64x64Layer);
    this.physics.add.collider(player, death32x32Layer);
    this.physics.add.collider(stars, bigWalls64x64Layer);

    this.physics.add.overlap(player, stars, collectCoin, null, this);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);

    cursors = this.input.keyboard.createCursorKeys();

    player.anims.play('left', true);
}

function update(time, delta) {

    // Horizontal movement
    player.body.setVelocityX(0);
    if (cursors.left.isDown) {
        player.body.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(200);
    }

    // Jumping
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
        player.body.setVelocityY(-300);
    }
}

function collectCoin(sprite, tile) {
    tile.disableBody(true, true);
    updateText(score);
    score++;
    let scoreDom = document.querySelector('.score');
    scoreDom.innerHTML = pad(4, '' + score, '0');
}

function hit(x, y, z) {
    console.log('Game restarted');
    this.scene.pause();
    score = 0;
    let scoreDom = document.querySelector('.score');
    scoreDom.innerHTML = '0000';
    this.scene.restart();

}

function updateText(index) {
  let textDom = document.querySelector('.text');
  let poemArray = poem.split(' ');
  if (index < poemArray.length ) {
    console.log(poem.split(' ',index));
      textDom.innerHTML = poem.split(' ',index).join(' ');
  }
}
