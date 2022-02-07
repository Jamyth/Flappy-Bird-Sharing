import { Component } from './Component';
import type Phaser from 'phaser';
import type { Asset } from '../util/Asset';

interface ParallaxImageOptions {
    texture: Asset;
    speed: number;
    loopingPoint: number;
    y: number;
}

export class ParallaxImage extends Component<Phaser.GameObjects.Image> {
    private texture: Asset;
    private speed: number;
    private loopingPoint: number;

    constructor({ texture, speed, loopingPoint, y }: ParallaxImageOptions) {
        super({
            x: 0,
            y,
        });
        this.texture = texture;
        this.speed = speed;
        this.loopingPoint = loopingPoint;
    }

    create(scene: Phaser.Scene): void {
        const image = scene.add.image(this.x, this.y, this.texture);
        this.setGameObject(image);
    }

    update(dt: number): void {
        // Remainder operator helps us to shift the image from current X back to 0
        // To create the sense of infinite scrolling
        this.x = (this.x - this.speed * dt) % this.loopingPoint;
    }

    render(): void {
        this.gameObject.setX(this.x);
    }
}
