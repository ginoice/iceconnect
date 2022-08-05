import { IRender, IRenderStyle } from '../interface/Igwallet';
export declare class RenderStyle implements IRenderStyle {
    style(): string;
}
export declare class Render implements IRender {
    headDomElement: HTMLHeadElement | null;
    bodyDomElement: HTMLBodyElement | null;
    bodyMainElement: HTMLDivElement;
    renderStyle: IRenderStyle;
    style: HTMLStyleElement;
    render(): void;
}
