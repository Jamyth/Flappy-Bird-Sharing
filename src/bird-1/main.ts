import Phaser from 'phaser';
import { Asset } from 'bird-0/util/Asset';
import Background from 'bird-0/asset/images/background.png';
import Ground from 'bird-0/asset/images/ground.png';

export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image(Asset.BACKGROUND, Background);
        this.load.image(Asset.GROUND, Ground);
    }

    create() {
        this.add
            .image(0, 0, Asset.BACKGROUND)
            // Image has origin originally set to center (0.5, 0.5);
            // Set the origin to top-left
            .setOrigin(0, 0);

        this.add
            // We want the ground to be placed at the bottom of the screen
            // So We use this.scale.height as Y value
            .image(0, this.scale.height, Asset.GROUND)
            // Set the origin to bottom-left
            // We can't set to top-left, as it will go below the screen
            // When we set the y value as the screen height.
            .setOrigin(0, 1);
    }

    update(time: number, delta: number) {}
}
