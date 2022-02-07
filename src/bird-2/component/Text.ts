import { Component } from './Component';
import type { ComponentOptions } from './Component';
import type Phaser from 'phaser';

interface TextOptions extends ComponentOptions {
    text: string | number;
    centered?: boolean;
}

export class Text extends Component<Phaser.GameObjects.Text> {
    private value: string;
    private centered: boolean;

    constructor({ x, y, text, centered = false }: TextOptions) {
        super({ x, y });
        this.value = `${text}`;
        this.centered = centered;
    }

    setText(value: string | number) {
        this.value = `${value}`;
    }

    create(scene: Phaser.Scene): void {
        const x = this.centered ? 0 : this.x;
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = this.centered
            ? {
                  fixedWidth: scene.scale.width,
                  align: 'center',
              }
            : {};
        const text = scene.add.text(x, this.y, this.value, textStyle);
        this.setGameObject(text);
    }

    update(dt: number): void {}

    render(): void {
        this.gameObject.setText(this.value);
    }
}
