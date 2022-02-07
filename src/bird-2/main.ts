import Phaser from 'phaser';
import { Asset } from './util/Asset';
import { ParallaxImage } from './component/ParallaxImage';
import { Text } from './component/Text';
import Background from './asset/images/background.png';
import Ground from './asset/images/ground.png';

export class MainScene extends Phaser.Scene {
    private background: ParallaxImage;
    private ground: ParallaxImage;
    private fpsText: Text;

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
    }

    preload() {
        this.load.image(Asset.BACKGROUND, Background);
        this.load.image(Asset.GROUND, Ground);
    }

    create() {
        this.background.create(this);
        this.background.gameObject.setOrigin(0, 0);

        this.ground.create(this);
        this.ground.gameObject.setOrigin(0, 1);

        this.fpsText.create(this);
        this.fpsText.gameObject.setOrigin(0.5, 0.5);
        this.fpsText.gameObject.setColor('#00ff00');
    }

    update(time: number, delta: number) {
        const dt = delta / 1000;

        this.background.update(dt);
        this.ground.update(dt);
        this.fpsText.setText(Math.floor(this.game.loop.actualFps));

        this.background.render();
        this.ground.render();
        this.fpsText.render();
    }
}
