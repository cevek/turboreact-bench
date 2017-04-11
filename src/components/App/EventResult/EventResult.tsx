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
        const eventTeam = event.results[0].teamId === teamId ? event.results[0] : event.results[1];
        const className = eventTeam.draw ? 'form__draw' : (eventTeam.win ? 'form__win' : 'form__lose');
        const tooltip = `${data.getTeamById(event.results[0].teamId).name} ${formatScore(event.results[0].score)}:${formatScore(event.results[1].score)} ${data.getTeamById(event.results[1].teamId).name}`;
        return (
            <Tooltip tooltip={tooltip} className={className}>
                <div/>
            </Tooltip>
        );
    }
}

