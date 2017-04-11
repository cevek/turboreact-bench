import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {formatScore} from '../../../services/Utils';
import {Tooltip} from '../../../../lib/components/Tooltip/Tooltip';
import {Data} from '../../../models/Data';

interface EventResultProps {
    event: MatchEvent;
    teamId: number;
    data: Data;
}

export class EventResult extends React.Component<EventResultProps, {}> {
    render() {
        const {teamId, event, data} = this.props;
        const eventTeam = event.homeTeam.teamId === teamId ? event.homeTeam : event.awayTeam;
        const className = eventTeam.draw ? 'form__draw' : (eventTeam.win ? 'form__win' : 'form__lose');
        const tooltip = `${data.getTeamById(event.homeTeam.teamId).name} ${formatScore(event.homeTeam.score)}:${formatScore(event.awayTeam.score)} ${data.getTeamById(event.awayTeam.teamId).name}`;
        return (
            <Tooltip tooltip={tooltip} className={className}>
                <div/>
            </Tooltip>
        );
    }
}

