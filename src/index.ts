import Phaser from 'phaser';
// import { MainScene } from 'bird-0/main';
// import { MainScene } from 'bird-1/main';
// import { MainScene } from 'bird-2/main';
// import { MainScene } from 'bird-3/main';
// import { MainScene } from 'bird-4/main';
// import { MainScene } from 'bird-5/main';
// import { MainScene } from 'bird-6/main';
// import { MainScene } from 'bird-7/main';
// import { MainScene } from 'bird-8/main';
import { MainScene } from 'bird-9/main';
// import { MainScene } from 'bird-10/main';

// Actual Canvas Scale
const WIDTH = 1280;
const HEIGHT = 720;

// "Resolution"
const VIRTUAL_WIDTH = 512;
const VIRTUAL_HEIGHT = 288;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, // Use WebGL or Canvas
    title: 'Flappy Bird Sharing', // Appear in Debug Console
    scene: MainScene, // (Level | Page) of the game
    width: WIDTH,
    height: HEIGHT,
    // Physic Systems: (Arcade | Matter.js)
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60, // minium fps
            debug: true,
        },
    },
    fps: {
        target: 60, // target limit
        forceSetTimeOut: true, // Using setTimeout to force the fps to be 60
    },
    pixelArt: true, // Disable Antialias to get a rough look
    // Resize our game
    scale: {
        mode: Phaser.Scale.FIT,
        width: VIRTUAL_WIDTH,
        height: VIRTUAL_HEIGHT,
    },
    parent: document.getElementById('container') ?? undefined,
};

// Start a new game instance
new Phaser.Game(config);
