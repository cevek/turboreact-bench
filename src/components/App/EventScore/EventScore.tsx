import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {formatScore} from '../../../services/Utils';
import {TeamName} from '../TeamName/TeamName';
import {EventTime} from '../EventTable/EventTable';
import {Data} from '../../../models/Data';

export interface EventScoreProps {
    event: MatchEvent;
    stopPropagation?: boolean;
    data: Data;
}

export class EventScore extends React.Component<EventScoreProps, {}> {
    render() {
        const {event, data} = this.props;
        return (
            <div className="score">
                <TeamName
                    data={data}
                    iconPosition='left'
                    team={data.getTeamById(event.results[0].teamId)}/>
                <EventTime showDate={false} showTime={true} event={event} className="score__event-time-center"/>
                <div>
                    <span>{formatScore(event.results[0].score)}</span>
                    <span className="score__link-separator">:</span>
                    <span>{formatScore(event.results[1].score)}</span>
                </div>
                <TeamName
                    data={data}
                    iconPosition='right'
                    team={data.getTeamById(event.results[1].teamId)}/>
            </div>
        );
    }
}
