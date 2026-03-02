import type { TypeOf } from '@kbn/config-schema';
import { schema } from '@kbn/config-schema';
import type { PluginConfigDescriptor } from '@kbn/core/server';
export const configSchema = schema.object({
  enabled: schema.boolean({ defaultValue: true }),
  ui: schema.object({
    enabled: schema.boolean({ defaultValue: false }),
  }),
});

type ConfigType = TypeOf<typeof configSchema>;

export const config: PluginConfigDescriptor<ConfigType> = {
  exposeToBrowser: {
    ui: true,
  },
  schema: configSchema,
};
export type InferenceModelSettingsConfig = TypeOf<typeof configSchema>;
