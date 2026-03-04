import type { CoreSetup, CoreStart, Plugin, PluginInitializerContext } from '@kbn/core/public';
import type { CPSPluginSetup, CPSPluginStart, CPSConfigType } from './types';
export declare class CpsPlugin implements Plugin<CPSPluginSetup, CPSPluginStart> {
    private readonly initializerContext;
    constructor(initializerContext: PluginInitializerContext<CPSConfigType>);
    setup(core: CoreSetup): CPSPluginSetup;
    start(core: CoreStart): CPSPluginStart;
    stop(): void;
}
