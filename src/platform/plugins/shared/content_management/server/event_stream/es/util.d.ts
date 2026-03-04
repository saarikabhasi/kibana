import type { EventStreamEvent } from '../types';
import type { EsEventStreamEventDto } from './types';
export declare const eventToDto: (event: EventStreamEvent) => EsEventStreamEventDto;
export declare const dtoToEvent: (dto: EsEventStreamEventDto) => EventStreamEvent;
