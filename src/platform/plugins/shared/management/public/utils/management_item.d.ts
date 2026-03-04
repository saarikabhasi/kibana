import type { CreateManagementItemArgs } from '../types';
export declare class ManagementItem {
    readonly id: string;
    readonly title: string;
    readonly tip?: string;
    readonly order: number;
    readonly hideFromSidebar?: boolean;
    readonly hideFromGlobalSearch?: boolean;
    readonly euiIconType?: string;
    readonly icon?: string;
    readonly capabilitiesId?: string;
    readonly redirectFrom?: string;
    enabled: boolean;
    constructor({ id, title, tip, order, hideFromSidebar, hideFromGlobalSearch, euiIconType, icon, capabilitiesId, redirectFrom, }: CreateManagementItemArgs);
    disable(): void;
    enable(): void;
}
