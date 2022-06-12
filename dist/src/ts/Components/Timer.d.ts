/// <reference types="node" />
export default class Timer {
    time: number;
    timerSpan: HTMLSpanElement;
    tick: NodeJS.Timer;
    constructor();
    getTimer(): HTMLDivElement;
    start(): void;
    update(): void;
    stop(): void;
    reset(): void;
    getTime(): string;
}
