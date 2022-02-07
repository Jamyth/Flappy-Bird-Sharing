import { State } from './State';
import { Text } from '../component/Text';

export class CountdownState extends State {
    private static readonly INTERVAL = 0.75;

    private timer: number;
    private count: number;
    private text: Text;

    enter(): void {
        this.timer = 0;
        this.count = 3;
        this.text = new Text({
            x: 0,
            y: 120,
            centered: true,
            text: this.count,
            fontFamily: 'flappy-font',
            fontSize: 56,
        });
        this.text.create(this.scene);
    }

    exit(): void {
        this.text.gameObject.destroy();
    }

    update(dt: number): void {
        this.timer += dt;

        if (this.timer >= CountdownState.INTERVAL) {
            this.timer %= CountdownState.INTERVAL;
            this.text.setText(--this.count);
        }

        if (this.count === 0) {
            this.stateMachine.change('play');
        }
    }

    render(): void {
        this.text.render();
    }
}
