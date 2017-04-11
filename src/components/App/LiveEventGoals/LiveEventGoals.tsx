import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {EventTeam} from '../../../models/EventTeam';
import {formatEventTime} from '../../../services/Utils';
import {EventAction} from '../../../models/EventAction';
import {Data} from '../../../models/Data';

interface LiveEventGoalsProps {
    event: MatchEvent;
    className?: string;
    data: Data;
}

export class LiveEventGoals extends React.Component<LiveEventGoalsProps, {}> {
    render() {
        const {data, event, className = ''} = this.props;
        const {homeTeamGoals, awayTeamGoals} = event;

        return (
            <div className={'live-event__goals ' + className}>
                <TeamGoals data={data} team={event.results[0]} teamGoals={homeTeamGoals} teamClassName="goals--home-team"/>
                <TeamGoals data={data} team={event.results[1]} teamGoals={awayTeamGoals} teamClassName="goals--away-team"/>
            </div>
        );
    }
}

interface GoalsMarkerProps {
    team: EventTeam;
    data: Data;
}

class GoalsMarker extends React.Component<GoalsMarkerProps, {}> {
    render() {
        const {team, data} = this.props;

        return (
            <div className="goals__marker">
                <div className="marker__top" style={{backgroundColor: data.getTeamById(team.teamId).primaryColor}}/>
                <div className="marker__bottom" style={{backgroundColor: data.getTeamById(team.teamId).secondaryColor}}/>
            </div>
        );
    }
}

interface TeamGoalsProps {
    team: EventTeam;
    teamGoals: EventAction[];
    teamClassName?: string;
    data: Data;
}

class TeamGoals extends React.Component<TeamGoalsProps, {}> {
    render() {
        const {data, team, teamGoals, teamClassName = ''} = this.props;

        return (
            <div className={'goals ' + teamClassName}>
                {teamGoals.length > 0 && <GoalsMarker data={data} team={team}/>}
                {teamGoals.length > 0 &&
                    <div className="goals__content">
                        {teamGoals.map((goal: EventAction, i: number) =>
                            <div className="goals__info" key={i}>
                                <span className="goals__info-time">{formatEventTime(goal.time, false)}</span>
                                <span className="goals__info-who">{goal.player}</span>
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}
