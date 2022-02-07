import { Component } from './Component';
import type { ComponentOptions } from './Component';
import type Phaser from 'phaser';

type FontFamily = 'flappy-font' | 'retro-font';

interface TextOptions extends ComponentOptions {
    text: string | number;
    centered?: boolean;
    fontFamily?: FontFamily;
    fontSize?: 8 | 14 | 28 | 56;
}

export class Text extends Component<Phaser.GameObjects.Text> {
    private value: string;
    private centered: boolean;
    private fontFamily: FontFamily;
    private fontSize: string;

    constructor({ x, y, text, centered = false, fontFamily = 'flappy-font', fontSize = 14 }: TextOptions) {
        super({ x, y });
        this.value = `${text}`;
        this.centered = centered;
        this.fontFamily = fontFamily;
        this.fontSize = `${fontSize}px`;
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
                  fontFamily: this.fontFamily,
                  fontSize: this.fontSize,
              }
            : {
                  fontFamily: this.fontFamily,
                  fontSize: this.fontSize,
              };
        const text = scene.add.text(x, this.y, this.value, textStyle);
        this.setGameObject(text);
    }

    update(dt: number): void {}

    render(): void {
        this.gameObject.setText(this.value);
    }
}
