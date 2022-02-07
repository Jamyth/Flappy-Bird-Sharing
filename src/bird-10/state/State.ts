import type Phaser from 'phaser';
import type { StateMachine } from './StateMachine';

export abstract class State {
    protected scene: Phaser.Scene;
    protected stateMachine: StateMachine;

    setStateMachine(stateMachine: StateMachine) {
        this.stateMachine = stateMachine;
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene;
    }

    abstract enter(params?: object): void;
    abstract exit(): void;
    abstract update(dt: number): void;
    abstract render(): void;
}
