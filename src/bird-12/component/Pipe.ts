import { Component } from './Component';
import { Asset } from '../util/Asset';
import type Phaser from 'phaser';

interface PipeOptions {
    speed: number;
    y: number;
    isTopPipe?: boolean;
}

export class Pipe extends Component<Phaser.GameObjects.Image> {
    static readonly HEIGHT = 288;
    static readonly WIDTH = 70;
    private speed: number;
    private isTopPipe: boolean;

    constructor({ speed, y, isTopPipe = false }: PipeOptions) {
        super({ x: 0, y: 0 });
        this.speed = speed;
        this.y = y;
        this.isTopPipe = isTopPipe;
    }

    create(scene: Phaser.Scene): void {
        this.x = scene.scale.width + 10;
        const image = scene.physics.add.image(this.x, this.y, Asset.PIPE);
        image.setOrigin(0, 0);

        if (this.isTopPipe) {
            image.flipY = true;
        }

        this.setGameObject(image);
    }

    update(dt: number): void {
        this.x -= this.speed * dt;
    }

    render(): void {
        this.gameObject.setX(this.x);
    }
}
