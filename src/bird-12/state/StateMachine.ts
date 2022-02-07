import { State } from './State';
import type Phaser from 'phaser';

export class StateMachine {
    static readonly emptyState: State = new (class extends State {
        enter(params?: object): void {}
        exit(): void {}
        update(dt: number): void {}
        render(): void {}
    })();

    private readonly scene: Phaser.Scene;
    private readonly stateMap: Record<string, () => State>;
    private currentState: State;
    private currentKey: string;

    constructor(scene: Phaser.Scene, stateMap: Record<string, () => State>) {
        this.scene = scene;
        this.stateMap = stateMap;
        this.currentKey = 'empty';
        this.currentState = StateMachine.emptyState;
    }

    change(key: string, params?: object) {
        this.assert(key);
        console.info(`[StateMachine]: change state: ${this.currentKey} -> ${key}`);
        this.currentKey = key;
        this.currentState.exit();
        this.currentState = this.stateMap[key]();
        this.currentState.setScene(this.scene);
        this.currentState.setStateMachine(this);
        this.currentState.enter(params);
    }

    update(dt: number) {
        this.currentState.update(dt);
    }

    render() {
        this.currentState.render();
    }

    private assert(stateKey: string) {
        if (!this.stateMap[stateKey]) {
            throw new Error(`[StateMachine]: state with key "${stateKey}" is not defined.`);
        }
    }
}
