import { Component } from './Component';
import { Asset } from '../util/Asset';
import type Phaser from 'phaser';
import type { ParallaxImage } from './ParallaxImage';
import type { Pipe } from './Pipe';

interface BirdOptions {
    gravity: number;
}

export class Bird extends Component<Phaser.GameObjects.Image> {
    static readonly HEIGHT = 24;
    static readonly WIDTH = 38;

    private gravity: number;
    private dy: number;
    private angle: number;

    constructor({ gravity }: BirdOptions) {
        super({ x: 0, y: 0 });
        this.gravity = gravity;
        this.dy = 0;
        this.angle = 0;
    }

    // Because We set the origin to the center of the image,
    // this.x and this.y will represent the center as well,
    // So we have to get the value of top left
    override getX() {
        return this.x - Bird.WIDTH / 2;
    }

    override getY() {
        return this.y - Bird.HEIGHT / 2;
    }

    setDy(dy: number) {
        this.dy = dy;
    }

    setDAngle(dAngle: number) {
        this.angle = dAngle;
    }

    collideWith(object: ParallaxImage | Pipe) {
        // To Make our game easier to play,
        // It would be nice to provide offset to the collision box
        const topLeftOffset = 2;
        const bottomRightOffset = 4;

        const offsetX = this.getX() + topLeftOffset;
        const offsetY = this.getY() + topLeftOffset;

        if (
            offsetX + Bird.WIDTH - bottomRightOffset >= object.getX() &&
            offsetX <= object.getX() + object.gameObject.width &&
            offsetY + Bird.HEIGHT - bottomRightOffset >= object.getY() &&
            offsetY <= object.getY() + object.gameObject.height
        ) {
            return true;
        }

        return false;
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
