import type { Type, ValidationError } from '@kbn/config-schema';
/**
 * Validate an object based on a schema.
 *
 * @param obj The object to validate
 * @param objSchema The schema to validate the object against
 * @returns null or ValidationError
 */
export declare const validateObj: (obj: unknown, objSchema?: Type<any>) => ValidationError | null;
export { validateVersion } from '@kbn/object-versioning-utils';
