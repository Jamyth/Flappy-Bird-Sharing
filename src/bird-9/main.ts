import Phaser from 'phaser';
import { Asset } from './util/Asset';
import { ParallaxImage } from './component/ParallaxImage';
import { Text } from './component/Text';
import { StateMachine } from './state/StateMachine';
import { TitleState } from './state/TitleState';
import { PlayState } from './state/PlayState';
import BackgroundImage from './asset/images/background.png';
import GroundImage from './asset/images/ground.png';
import BirdImage from './asset/images/bird.png';
import PipeImage from './asset/images/pipe.png';

export class MainScene extends Phaser.Scene {
    private background: ParallaxImage;
    private ground: ParallaxImage;
    private fpsText: Text;
    private stateMachine: StateMachine;

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
            fontFamily: 'flappy-font',
        });
    }

    preload() {
        this.load.image(Asset.BACKGROUND, BackgroundImage);
        this.load.image(Asset.GROUND, GroundImage);
        this.load.image(Asset.BIRD, BirdImage);
        this.load.image(Asset.PIPE, PipeImage);
    }

    create() {
        this.background.create(this);
        this.background.gameObject.setOrigin(0, 0).setDepth(-1);

        this.ground.create(this);
        this.ground.gameObject.setOrigin(0, 1).setDepth(10);

        this.fpsText.create(this);
        this.fpsText.gameObject.setOrigin(0.5, 0.5).setColor('#00ff00');

        this.stateMachine = new StateMachine(this, {
            title: () => new TitleState(),
            play: () => new PlayState(this.ground),
        });
        this.stateMachine.change('title');
    }

    update(time: number, delta: number) {
        const dt = delta / 1000;

        this.background.update(dt);
        this.ground.update(dt);
        this.fpsText.setText(Math.floor(this.game.loop.actualFps));
        this.stateMachine.update(dt);

        this.background.render();
        this.ground.render();
        this.fpsText.render();
        this.stateMachine.render();
    }
}
