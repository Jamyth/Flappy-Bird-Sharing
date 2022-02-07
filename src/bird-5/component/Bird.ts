import { Component } from './Component';
import { Asset } from '../util/Asset';
import type Phaser from 'phaser';

interface BirdOptions {
    gravity: number;
}

export class Bird extends Component<Phaser.GameObjects.Image> {
    private gravity: number;
    private dy: number;
    private angle: number;

    constructor({ gravity }: BirdOptions) {
        super({ x: 0, y: 0 });
        this.gravity = gravity;
        this.dy = 0;
        this.angle = 0;
    }

    setDy(dy: number) {
        this.dy = dy;
    }

    setDAngle(dAngle: number) {
        this.angle = dAngle;
    }

    create(scene: Phaser.Scene): void {
        this.x = scene.scale.width / 2;
        this.y = scene.scale.height / 2;

        const image = scene.physics.add.image(this.x, this.y, Asset.BIRD);

        this.setGameObject(image);
    }

    update(dt: number): void {
        this.dy += this.gravity * dt;
        this.y += this.dy;
        this.angle += 90 * dt;
    }

    render(): void {
        this.gameObject.setY(this.y);
        this.gameObject.setAngle(this.angle);
    }
}
