import type Phaser from 'phaser';

export interface ComponentOptions {
    x: number;
    y: number;
}

export abstract class Component<T extends Phaser.GameObjects.GameObject = never> {
    protected x: number;
    protected y: number;
    private _gameObject: T;

    constructor({ x, y }: ComponentOptions) {
        this.x = x;
        this.y = y;
    }

    get gameObject() {
        return this._gameObject;
    }

    setGameObject(gameObject: T) {
        this._gameObject = gameObject;
    }

    abstract create(scene: Phaser.Scene): void;
    abstract update(dt: number): void;
    abstract render(): void;
}
