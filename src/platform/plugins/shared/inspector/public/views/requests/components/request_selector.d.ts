import React, { Component } from 'react';
import PropTypes from 'prop-types';
import type { EuiComboBoxOptionOption } from '@elastic/eui';
import type { Request } from '../../../../common/adapters/request/types';
interface RequestSelectorProps {
    requests: Request[];
    selectedRequest: Request;
    onRequestChanged: (request: Request) => void;
}
export declare class RequestSelector extends Component<RequestSelectorProps> {
    static propTypes: {
        requests: PropTypes.Validator<any[]>;
        selectedRequest: PropTypes.Validator<object>;
        onRequestChanged: PropTypes.Requireable<(...args: any[]) => any>;
    };
    handleSelected: (selectedOptions: Array<EuiComboBoxOptionOption<string>>) => void;
    renderRequestCombobox(): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
