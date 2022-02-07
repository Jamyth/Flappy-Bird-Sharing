import { Component } from './Component';
import { Pipe } from './Pipe';
import type Phaser from 'phaser';

interface PipePairOptions {
    y: number;
}

export class PipePair extends Component<never> {
    static GAP_HEIGHT = 90;
    static PIPE_SPEED = 60;

    private topPipe: Pipe;
    private bottomPipe: Pipe;
    private removed: boolean;

    constructor({ y }: PipePairOptions) {
        super({ x: 0, y });
        this.topPipe = new Pipe({
            speed: PipePair.PIPE_SPEED,
            y,
            isTopPipe: true,
        });
        this.bottomPipe = new Pipe({
            speed: PipePair.PIPE_SPEED,
            y: y + Pipe.HEIGHT + PipePair.GAP_HEIGHT,
        });

        this.removed = false;
    }

    get isRemoved() {
        return this.removed;
    }

    forEach(callback: (pipe: Pipe) => void) {
        [this.topPipe, this.bottomPipe].forEach(callback);
    }

    create(scene: Phaser.Scene): void {
        this.x = scene.scale.width + 10;
        this.topPipe.create(scene);
        this.bottomPipe.create(scene);
    }

    destroy() {
        this.removed = true;
        this.topPipe.gameObject.destroy();
        this.bottomPipe.gameObject.destroy();
    }

    update(dt: number): void {
        if (this.x > -Pipe.WIDTH) {
            this.x -= PipePair.PIPE_SPEED * dt;
            this.topPipe.update(dt);
            this.bottomPipe.update(dt);
        } else {
            this.destroy();
        }
    }

    render(): void {
        if (!this.removed) {
            this.topPipe.render();
            this.bottomPipe.render();
        }
    }
}
