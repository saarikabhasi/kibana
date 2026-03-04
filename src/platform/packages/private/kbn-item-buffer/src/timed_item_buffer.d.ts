import type { ItemBufferParams } from './item_buffer';
import { ItemBuffer } from './item_buffer';
export interface TimedItemBufferParams<Item> extends ItemBufferParams<Item> {
    /**
     * Flushes buffer when oldest item reaches age specified by this parameter,
     * in milliseconds.
     */
    maxItemAge?: number;
}
export declare class TimedItemBuffer<Item> extends ItemBuffer<Item> {
    readonly params: TimedItemBufferParams<Item>;
    private timer;
    constructor(params: TimedItemBufferParams<Item>);
    write(item: Item): void;
    clear(): void;
    flush(): void;
    flushAsync(): Promise<void>;
    private onTimeout;
}
