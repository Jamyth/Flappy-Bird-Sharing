import { Component } from './Component';
import { Asset } from '../util/Asset';
import type Phaser from 'phaser';

export class Bird extends Component<Phaser.GameObjects.Image> {
    constructor() {
        super({ x: 0, y: 0 });
    }

    create(scene: Phaser.Scene): void {
        this.x = scene.scale.width / 2;
        this.y = scene.scale.height / 2;

        const image = scene.physics.add.image(this.x, this.y, Asset.BIRD);

        this.setGameObject(image);
    }

    update(dt: number): void {}

    render(): void {}
}
