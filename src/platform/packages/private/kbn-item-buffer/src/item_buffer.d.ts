export interface ItemBufferParams<Item> {
    /**
     * Flushes buffer automatically if number of items in the buffer reaches
     * this number. Omit it or set to `Infinity` to never flush on max buffer
     * size automatically.
     */
    flushOnMaxItems?: number;
    /**
     * Callback that is called every time buffer is flushed. It receives a single
     * argument which is a list of all buffered items. If `.flush()` is called
     * when buffer is empty, `.onflush` is called with empty array.
     */
    onFlush: (items: Item[]) => void | Promise<void>;
}
/**
 * A simple buffer that collects items. Can be cleared or flushed; and can
 * automatically flush when specified number of items is reached.
 */
export declare class ItemBuffer<Item> {
    readonly params: ItemBufferParams<Item>;
    private list;
    constructor(params: ItemBufferParams<Item>);
    /**
     * Get current buffer size.
     */
    get length(): number;
    /**
     * Add item to the buffer.
     */
    write(item: Item): void;
    /**
     * Remove all items from the buffer.
     */
    clear(): void;
    /**
     * Call `.onFlush` method and clear buffer.
     */
    flush(): void;
    /**
     * Same as `.flush()` but asynchronous, and returns a promise, which
     * rejects if `.onFlush` throws.
     */
    flushAsync(): Promise<void>;
}
