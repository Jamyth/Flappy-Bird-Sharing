import { State } from './State';
import { Text } from '../component/Text';

export type ScoreStateParams = {
    score: number;
};

export class ScoreState extends State {
    private score: number;
    private loseText: Text;
    private scoreText: Text;
    private tryAgainText: Text;
    private enterKey: Phaser.Input.Keyboard.Key;

    enter(params: ScoreStateParams): void {
        this.score = params.score;
        this.loseText = new Text({
            x: 0,
            y: 64,
            centered: true,
            text: 'Oops! You Lost!',
            fontFamily: 'flappy-font',
            fontSize: 28,
        });
        this.scoreText = new Text({
            x: 0,
            y: 100,
            centered: true,
            text: `Score: ${this.score}`,
            fontFamily: 'retro-font',
            fontSize: 14,
        });
        this.tryAgainText = new Text({
            x: 0,
            y: 160,
            centered: true,
            text: 'Press Enter to Play Again!',
            fontFamily: 'retro-font',
            fontSize: 14,
        });

        this.loseText.create(this.scene);
        this.scoreText.create(this.scene);
        this.tryAgainText.create(this.scene);

        this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', () => {
            this.stateMachine.change('play');
        });
    }

    exit(): void {
        this.loseText.gameObject.destroy();
        this.scoreText.gameObject.destroy();
        this.tryAgainText.gameObject.destroy();
        this.enterKey.destroy();
    }
    update(dt: number): void {}
    render(): void {}
}
