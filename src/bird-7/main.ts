import Phaser from 'phaser';
import { Asset } from './util/Asset';
import { ParallaxImage } from './component/ParallaxImage';
import { Text } from './component/Text';
import { Bird } from './component/Bird';
import BackgroundImage from './asset/images/background.png';
import GroundImage from './asset/images/ground.png';
import BirdImage from './asset/images/bird.png';
import PipeImage from './asset/images/pipe.png';
import { Pipe } from './component/Pipe';
import { PipePair } from './component/PipePair';

export class MainScene extends Phaser.Scene {
    private background: ParallaxImage;
    private ground: ParallaxImage;
    private fpsText: Text;
    private bird: Bird;
    private spaceKey: Phaser.Input.Keyboard.Key;
    private spawnTimer: number;
    private pipePairs: PipePair[];
    private isPaused: boolean;
    private lastY: number;

    constructor() {
        super('MainScene');
    }

    init() {
        this.background = new ParallaxImage({
            texture: Asset.BACKGROUND,
            speed: 30,
            loopingPoint: 413,
            y: 0,
        });

        this.ground = new ParallaxImage({
            texture: Asset.GROUND,
            speed: 60,
            loopingPoint: 400,
            y: this.scale.height,
        });

        this.fpsText = new Text({
            x: this.scale.width - 20,
            y: 20,
            text: Math.floor(this.game.loop.actualFps),
        });

        this.bird = new Bird({ gravity: 20 });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spawnTimer = 2;
        this.pipePairs = [];

        this.lastY =
            -Pipe.HEIGHT + // lastY indicates the topY of the pair, -Pipe.Height will set the top pipe to be 0
            Math.random() * 80 + // Random value between 0 and -80
            20; // Pipe Head
    }

    preload() {
        this.load.image(Asset.BACKGROUND, BackgroundImage);
        this.load.image(Asset.GROUND, GroundImage);
        this.load.image(Asset.BIRD, BirdImage);
        this.load.image(Asset.PIPE, PipeImage);
    }

    create() {
        this.background.create(this);
        this.background.gameObject.setOrigin(0, 0);

        this.ground.create(this);
        this.ground.gameObject.setOrigin(0, 1).setDepth(10);

        this.fpsText.create(this);
        this.fpsText.gameObject.setOrigin(0.5, 0.5);
        this.fpsText.gameObject.setColor('#00ff00');

        this.bird.create(this);
        this.bird.gameObject.setDepth(5);

        this.spaceKey.on('down', () => {
            this.bird.setDy(-5);
            this.bird.setDAngle(-45);
        });

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).on('down', () => {
            this.isPaused = !this.isPaused;
        });
    }

    update(time: number, delta: number) {
        if (this.isPaused) {
            return;
        }

        const dt = delta / 1000;

        this.background.update(dt);
        this.ground.update(dt);
        this.fpsText.setText(Math.floor(this.game.loop.actualFps));
        this.bird.update(dt);

        this.spawnTimer += dt;
        if (this.spawnTimer >= 2.5) {
            this.spawnTimer %= 2.5;
            this.spawnPipePair();
        }
        this.pipePairs.forEach((pair) => {
            pair.update(dt);
            pair.render();
        });

        this.background.render();
        this.ground.render();
        this.fpsText.render();
        this.bird.render();

        this.pipePairs = this.pipePairs
            .map((pair) => {
                if (!pair.isRemoved) {
                    return pair;
                }
            })
            .filter((_): _ is PipePair => _ !== undefined);
    }

    private spawnPipePair() {
        const min = -Pipe.HEIGHT + 10;
        const max = this.scale.height - 90 - Pipe.HEIGHT;
        const y = Phaser.Math.Clamp(this.lastY + Phaser.Math.Between(-20, 20), min, max);
        const pair = new PipePair({ y });
        pair.create(this);
        this.pipePairs.push(pair);
    }
}
