export type RisonValue = boolean | string | number | RisonValue[] | {
    [key: string]: RisonValue;
} | null;
export declare function encodeUnknown(obj: any): string | undefined;
/**
 * rison-encode a javascript structure
 */
export declare function encode(obj: any): string;
/**
 * parse a rison string into a javascript structure.
 */
export declare function decode(rison: string): RisonValue;
/**
 * safely parse a rison string into a javascript structure, never throws
 */
export declare function safeDecode(rison: string): RisonValue;
/**
 * rison-encode a javascript array without surrounding parens
 */
export declare function encodeArray(array: any[]): any;
/**
 * parse an a-rison string into a javascript structure.
 *
 * this simply adds array markup around the string before parsing.
 */
export declare function decodeArray(rison: string): RisonValue[];
