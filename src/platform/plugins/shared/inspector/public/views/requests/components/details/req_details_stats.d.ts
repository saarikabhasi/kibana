import React, { Component } from 'react';
import type { DetailViewProps } from './types';
import type { Request } from '../../../../../common/adapters/request/types';
export declare class RequestDetailsStats extends Component<DetailViewProps> {
    static shouldShow: (request: Request) => boolean;
    render(): React.JSX.Element | null;
}
