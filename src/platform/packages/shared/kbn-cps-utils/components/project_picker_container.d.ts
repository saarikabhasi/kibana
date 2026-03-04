import React from 'react';
import type { ICPSManager } from '../types';
interface ProjectPickerContainerProps {
    cpsManager: ICPSManager;
}
/**
 * Container component that connects ProjectPicker to CPSManager
 * Handles observable subscriptions and provides bound fetchProjects
 * Access control is managed by CPSManager based on current app and route
 */
export declare const ProjectPickerContainer: React.FC<ProjectPickerContainerProps>;
export {};
