import React, { Component } from 'react';
import PropTypes from 'prop-types';
import type { InspectorViewDescription } from '../types';
interface Props {
    views: InspectorViewDescription[];
    onViewSelected: (view: InspectorViewDescription) => void;
    selectedView: InspectorViewDescription;
}
interface State {
    isSelectorOpen: boolean;
}
export declare class InspectorViewChooser extends Component<Props, State> {
    static propTypes: {
        views: PropTypes.Validator<any[]>;
        onViewSelected: PropTypes.Validator<(...args: any[]) => any>;
        selectedView: PropTypes.Validator<object>;
    };
    state: State;
    toggleSelector: () => void;
    closeSelector: () => void;
    renderView: (view: InspectorViewDescription, index: number) => React.JSX.Element;
    renderViewButton(): React.JSX.Element;
    renderSingleView(): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
