import * as React from 'react';
import {i18n} from '../../../services/i18n';

interface LiveHalfProps {
    className?: string;
    half: number;
}

export class LiveHalf extends React.Component<LiveHalfProps, {}> {
    render() {
        const {half, className} = this.props;
        return (
            <div className={className}>
                {half === 1 && <span>{i18n().live_first_half}</span>}
                {half === 2 && <span>{i18n().live_second_half}</span>}
            </div>
        );
    }
}
