import Phaser from 'phaser';
import { Component } from './Component';
import { Asset } from '../util/Asset';

interface PipeOptions {
    speed: number;
}

export class Pipe extends Component<Phaser.GameObjects.Image> {
    static readonly HEIGHT = 288;
    static readonly WIDTH = 70;
    private speed: number;

    constructor({ speed }: PipeOptions) {
        super({ x: 0, y: 0 });
        this.speed = speed;
    }

    create(scene: Phaser.Scene): void {
        this.x = scene.scale.width + 10;
        this.y = Phaser.Math.Between(scene.scale.height * 0.6, scene.scale.height - 20);
        const image = scene.physics.add.image(this.x, this.y, Asset.PIPE);
        image.setOrigin(0, 0);

        this.setGameObject(image);
    }

    update(dt: number): void {
        this.x -= this.speed * dt;
    }

    render(): void {
        this.gameObject.setX(this.x);
    }
}
