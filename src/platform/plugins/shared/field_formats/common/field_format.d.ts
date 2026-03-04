import type { FieldFormatsGetConfigFn, FieldFormatsContentType, FieldFormatInstanceType, FieldFormatConvert, FieldFormatConvertFunction, HtmlContextTypeOptions, TextContextTypeOptions, FieldFormatMetaParams, FieldFormatParams } from './types';
import type { HtmlContextTypeConvert, TextContextTypeConvert } from './types';
export declare abstract class FieldFormat {
    /**
     * @property {string} - Field Format Id
     * @static
     * @public
     */
    static id: string;
    /**
     * Hidden field formats can only be accessed directly by id,
     * They won't appear in field format editor UI,
     * But they can be accessed and used from code internally.
     *
     * @property {boolean} -  Is this a hidden field format
     * @static
     * @public
     */
    static hidden: boolean;
    /**
     * @property {string} -  Field Format Title
     * @static
     * @public
     */
    static title: string;
    /**
     * @property {string} - Field Format Type
     * @internal
     */
    static fieldType: string | string[];
    /**
     * @property {FieldFormatConvert}
     * @internal
     * have to remove the private because of
     * https://github.com/Microsoft/TypeScript/issues/17293
     */
    convertObject: FieldFormatConvert | undefined;
    /**
     * @property {htmlConvert}
     * @protected
     * have to remove the protected because of
     * https://github.com/Microsoft/TypeScript/issues/17293
     */
    htmlConvert: HtmlContextTypeConvert | undefined;
    /**
     * @property {textConvert}
     * @protected
     * have to remove the protected because of
     * https://github.com/Microsoft/TypeScript/issues/17293
     */
    textConvert: TextContextTypeConvert | undefined;
    /**
     * @property {Function} - ref to child class
     * @internal
     */
    type: typeof FieldFormat;
    allowsNumericalAggregations?: boolean;
    protected readonly _params: FieldFormatParams & FieldFormatMetaParams;
    protected getConfig: FieldFormatsGetConfigFn | undefined;
    constructor(_params?: FieldFormatParams & FieldFormatMetaParams, getConfig?: FieldFormatsGetConfigFn);
    /**
     * Convert a raw value to a formatted string
     * @param  {unknown} value
     * @param  {string} [contentType=text] - optional content type, the only two contentTypes
     *                                currently supported are "html" and "text", which helps
     *                                formatters adjust to different contexts
     * @return {string} - the formatted string, which is assumed to be html, safe for
     *                    injecting into the DOM or a DOM attribute
     * @public
     */
    convert(value: unknown, contentType?: FieldFormatsContentType, options?: HtmlContextTypeOptions | TextContextTypeOptions): string;
    /**
     * Get a convert function that is bound to a specific contentType
     * @param  {string} [contentType=text]
     * @return {function} - a bound converter function
     * @public
     */
    getConverterFor(contentType?: FieldFormatsContentType): FieldFormatConvertFunction;
    /**
     * Get parameter defaults
     * @return {object} - parameter defaults
     * @public
     */
    getParamDefaults(): FieldFormatParams;
    /**
     * Get the value of a param. This value may be a default value.
     *
     * @param  {string} name - the param name to fetch
     * @return {any} TODO: https://github.com/elastic/kibana/issues/108158
     * @public
     */
    param(name: string): any;
    /**
     * Get all of the params in a single object
     * @return {object}
     * @public
     */
    params(): FieldFormatParams & FieldFormatMetaParams;
    /**
     * Serialize this format to a simple POJO, with only the params
     * that are not default
     *
     * @return {object}
     * @public
     */
    toJSON(): {
        id: string;
        params: (import("@kbn/utility-types").SerializableRecord & FieldFormatMetaParams) | undefined;
    };
    static from(convertFn: FieldFormatConvertFunction): FieldFormatInstanceType;
    setupContentType(): FieldFormatConvert;
    static isInstanceOfFieldFormat(fieldFormat: unknown): fieldFormat is FieldFormat;
    protected checkForMissingValueText(val: unknown): string | void;
    protected checkForMissingValueHtml(val: unknown): string | void;
}
