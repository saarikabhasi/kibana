import type { CoreSetup } from '@kbn/core/server';
import type { EventStreamClient, EventStreamClientFactory, EventStreamClientFilterOptions, EventStreamClientFilterResult, EventStreamEvent, EventStreamEventPartial, EventStreamLogger } from './types';
export interface EventStreamInitializerContext {
    logger: EventStreamLogger;
    clientFactory: EventStreamClientFactory;
}
export interface EventStreamSetup {
    core: CoreSetup;
}
export declare class EventStreamService {
    #private;
    private readonly ctx;
    protected client?: EventStreamClient;
    constructor(ctx: EventStreamInitializerContext);
    /** Called during "setup" plugin life-cycle. */
    setup({ core }: EventStreamSetup): void;
    /** Called during "start" plugin life-cycle. */
    start(): void;
    /** Called during "stop" plugin life-cycle. */
    stop(): Promise<void>;
    /**
     * Validates a single event. Throws an error if the event is invalid.
     *
     * @param event A partial event to validate.
     */
    protected validatePartialEvent(event: EventStreamEventPartial): void;
    /**
     * Queues an event to be written to the Event Stream. The event is appended to
     * a buffer and written to the Event Stream periodically.
     *
     * Events are flushed once the buffer reaches 100 items or 250ms has passed,
     * whichever comes first. To force a flush, call `.flush()`.
     *
     * @param event Event to add to the Event Stream.
     */
    addEvent(event: EventStreamEventPartial): void;
    /**
     * Same as `.addEvent()` but accepts an array of events.
     *
     * @param events Events to add to the Event Stream.
     */
    addEvents(events: EventStreamEventPartial[]): void;
    /**
     * Flushes the event buffer, writing all events to the Event Stream.
     */
    flush(): void;
    /**
     * Read latest events from the Event Stream.
     *
     * @param limit Number of events to return. Defaults to 100.
     * @returns Latest events from the Event Stream.
     */
    tail(limit?: number): Promise<EventStreamEvent[]>;
    /**
     * Retrieves events from the Event Stream which match the specified filter
     * options.
     *
     * @param options Filtering options.
     * @returns Paginated results of events matching the filter.
     */
    filter(options: EventStreamClientFilterOptions): Promise<EventStreamClientFilterResult>;
}
