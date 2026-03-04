import type { ChromeBreadcrumb, ChromeSetProjectBreadcrumbsParams, NavigationTreeDefinition, SolutionId } from '@kbn/core-chrome-browser';
import type { CloudSetup, CloudStart } from '@kbn/cloud-plugin/public';
import type { Observable } from 'rxjs';
import type { CardNavExtensionDefinition } from '@kbn/management-cards-navigation';
export interface ServerlessPluginSetup {
}
export interface ServerlessPluginStart {
    setBreadcrumbs: (breadcrumbs: ChromeBreadcrumb | ChromeBreadcrumb[], params?: Partial<ChromeSetProjectBreadcrumbsParams>) => void;
    setProjectHome(homeHref: string): void;
    initNavigation(id: SolutionId, navigationTree$: Observable<NavigationTreeDefinition>, config?: {
        dataTestSubj?: string;
    }): void;
    getNavigationCards(roleManagementEnabled?: boolean, extendCardNavDefinitions?: Record<string, CardNavExtensionDefinition>): Record<string, CardNavExtensionDefinition> | undefined;
}
export interface ServerlessPluginSetupDependencies {
    cloud: CloudSetup;
}
export interface ServerlessPluginStartDependencies {
    cloud: CloudStart;
}
