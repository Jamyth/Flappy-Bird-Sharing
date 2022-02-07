import { State } from './State';
import { Text } from '../component/Text';
import Phaser from 'phaser';

export class TitleState extends State {
    private title: Text;
    private enterText: Text;
    private enterKey: Phaser.Input.Keyboard.Key;
    private spaceKey: Phaser.Input.Keyboard.Key;

    enter(): void {
        this.title = new Text({
            text: 'Flappy Bird',
            x: 0,
            y: 64,
            centered: true,
            fontFamily: 'flappy-font',
            fontSize: 28,
        });
        this.title.create(this.scene);

        this.enterText = new Text({
            text: 'Press Enter or Space',
            x: 0,
            y: 100,
            centered: true,
            fontFamily: 'retro-font',
        });
        this.enterText.create(this.scene);

        const toCountdownState = () => {
            this.stateMachine.change('play');
        };
        this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey.on('down', toCountdownState);
        this.spaceKey.on('down', toCountdownState);
    }

    exit(): void {
        this.title.gameObject.destroy();
        this.enterText.gameObject.destroy();
        this.enterKey.destroy();
        this.spaceKey.destroy();
    }

    update(dt: number): void {}

    render(): void {}
}
