import { State } from './State';
import { Bird } from '../component/Bird';
import { PipePair } from '../component/PipePair';
import { Pipe } from '../component/Pipe';
import type { ParallaxImage } from '../component/ParallaxImage';

export class PlayState extends State {
    private bird: Bird;
    private spaceKey: Phaser.Input.Keyboard.Key;
    private pipePairs: PipePair[];
    private lastY: number;
    private spawnTimer: number;
    private ground: ParallaxImage;

    constructor(ground: ParallaxImage) {
        super();
        this.ground = ground;
    }

    enter(params?: object): void {
        this.bird = new Bird({ gravity: 20 });
        this.bird.create(this.scene);

        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceKey.on('down', () => {
            this.bird.setDy(-5);
            this.bird.setDAngle(-45);
        });

        this.spawnTimer = 2;
        this.pipePairs = [];

        this.lastY =
            -Pipe.HEIGHT + // lastY indicates the topY of the pair, -Pipe.Height will set the top pipe to be 0
            Math.random() * 80 + // Random value between 0 and -80
            20; // Pipe Head
    }

    exit(): void {
        this.spaceKey.destroy();
        this.bird.gameObject.destroy();
        this.pipePairs.forEach((_) => _.destroy());
    }

    update(dt: number): void {
        this.spawnTimer += dt;
        this.bird.update(dt);
        this.pipePairs = this.pipePairs
            .map((pair) => {
                if (!pair.isRemoved) {
                    pair.update(dt);
                    return pair;
                }
            })
            .filter((_): _ is PipePair => _ !== undefined);

        if (this.spawnTimer >= 2.5) {
            this.spawnTimer %= 2.5;
            this.spawnPipePair();
        }

        this.detectCollision();
    }

    render(): void {
        this.bird.render();
        this.pipePairs.forEach((_) => _.render());
    }

    private spawnPipePair() {
        const min = -Pipe.HEIGHT + 10;
        const max = this.scene.scale.height - 90 - Pipe.HEIGHT;
        const y = Phaser.Math.Clamp(this.lastY + Phaser.Math.Between(-20, 20), min, max);
        const pair = new PipePair({ y });
        pair.create(this.scene);
        this.pipePairs.push(pair);
    }

    private detectCollision() {
        const onCollide = () => {
            this.stateMachine.change('title');
        };

        this.pipePairs.forEach((pair) => pair.forEach((pipe) => this.bird.collideWith(pipe) && onCollide()));
        if (this.bird.collideWith(this.ground)) {
            onCollide();
        }
    }
}
