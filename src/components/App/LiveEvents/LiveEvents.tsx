import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {LiveEvent} from './LiveEvent/LiveEvent';
import {Data} from '../../../models/Data';

interface LiveEventsProps {
    events: MatchEvent[];
    data: Data;
}

export class LiveEvents extends React.Component<LiveEventsProps, {}> {
    render() {
        const {data, events} = this.props;
        return (
            <div className="live-events">
                {events.map(event => <LiveEvent data={data} key={event.id} event={event}/>)}
            </div>
        );
    }
}

