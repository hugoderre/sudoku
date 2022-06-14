/// <reference types="node" />
export default class Timer {
    time: number;
    tick: NodeJS.Timer | undefined;
    timerSpan: HTMLSpanElement;
    getTimer(): HTMLDivElement;
    start(): void;
    update(): void;
    stop(): void;
    reset(): void;
    getTime(): string;
}
