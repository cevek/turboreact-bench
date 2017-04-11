import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {formatEventTime, formatScore} from '../../../services/Utils';
import {TeamName} from '../TeamName/TeamName';
import {div} from '../../../../lib/components/ActionButton/Link';
import {LiveHalf} from '../LiveHalf/LiveHalf';
import {Data} from '../../../models/Data';

interface LiveEventInfoProps {
    event: MatchEvent;
    isCardBlock?: boolean;
    data: Data;
}

export class LiveEventInfo extends React.Component<LiveEventInfoProps, {}> {
    render() {
        const {event, isCardBlock, data} = this.props;

        return (
            <div className={`live-event-info ${isCardBlock ? 'live-event-info--is-card-block' : ''}`}>
                <div className="live-event-info__content">
                    <TeamName
                        data={data}
                        team={data.getTeamById(event.homeTeam.teamId)}
                        iconPosition="vertical"
                        modification="card"
                        showLastMatches
                        eventTeam={event.homeTeam}/>
                    <TeamName
                        data={data}
                        team={data.getTeamById(event.awayTeam.teamId)}
                        iconPosition="vertical"
                        modification="card"
                        showLastMatches
                        eventTeam={event.awayTeam}/>
                </div>
                <div className="live-event-info__score">
                    {formatScore(event.homeTeam.score)}:{formatScore(event.awayTeam.score)}
                </div>
            </div>
        );
    }
}


export interface LiveTimeHalfProps {
    event: MatchEvent;
    className?: string;
}

export class LiveTimeHalf extends React.Component<LiveTimeHalfProps, {}> {
    render() {
        const {event, className = ''} = this.props;
        return (
            <div className={'live-time-half ' + className}>
                <div className="live-time-half__left">
                    <LiveHalf className="live-time-half__half" half={event.half}/>
                    <div className="live-time-half__time">{formatEventTime(event.eventTime, event.eventTimePlus)}</div>
                </div>
                <div className="live-time-half__round">{event.roundName}</div>
            </div>
        );
    }
}

