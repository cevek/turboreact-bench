import * as React from 'react';
import * as classNames from 'classnames';
import {AdaptiveName} from '../AdaptiveName/AdaptiveName';
import {Team} from '../../../models/Team';
import {Shield, ShieldMini} from '../Shield/Shield';
import {EventTeam} from '../../../models/EventTeam';
import {EventResult} from '../EventResult/EventResult';
import {Data} from '../../../models/Data';

interface TeamNameProps {
    team: Team;
    iconPosition: 'left' | 'right' | 'vertical';
    infoLinkClassName?: string;
    imgLinkClassName?: string;
    bigImage?: boolean;
    modification?: 'card' | 'event';
    showLastMatches?: boolean;
    eventTeam?: EventTeam;
    data: Data;
}


export class TeamName extends React.Component<TeamNameProps, {}> {
    render() {
        const {data, bigImage, modification, showLastMatches, team, iconPosition, eventTeam, infoLinkClassName = '', imgLinkClassName = ''} = this.props;
        const {name, nameAbbrv, primaryColor, secondaryColor} = team;

        const teamClassName = classNames({
            'team': true,
            'team--icon-right': iconPosition == 'right',
            'team--icon-left': iconPosition == 'left',
            'team--vertical': iconPosition == 'vertical',
            'team--card-version': modification == 'card',
            'team--event-version': modification == 'event',
        });

        return (
            <div className={teamClassName}>
                <div className="team__info">
                    <div className={'team__link team__info-link ' + infoLinkClassName}>
                        <AdaptiveName className='team__info--adaptive-name' short={nameAbbrv}>
                            {modification == 'card' ? nameAbbrv : name}
                        </AdaptiveName>
                    </div>
                    {showLastMatches && eventTeam
                        ? <TeamLastMatchesResults data={data} eventTeam={eventTeam}/>
                        : null
                    }
                </div>
                <div className={'team__link team__img-link' + imgLinkClassName}>
                    {modification == 'card' ?
                        <div>
                            <Shield className="team__image--big" primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}/>
                            <ShieldMini className="team__image" primaryColor={primaryColor}
                                        secondaryColor={secondaryColor}/>
                        </div>
                        : bigImage
                            ? <Shield className="team__image--big" primaryColor={primaryColor}
                                      secondaryColor={secondaryColor}/>
                            : <ShieldMini className="team__image" primaryColor={primaryColor}
                                          secondaryColor={secondaryColor}/>
                    }
                </div>
            </div>
        );
    }
}


interface TeamLastMatchesResultsProps {
    eventTeam: EventTeam;
    data: Data;
}

class TeamLastMatchesResults extends React.Component<TeamLastMatchesResultsProps, {}> {
    render() {
        const {eventTeam, data} = this.props;
        return (
            <div className="last-results">
                {eventTeam.lastMatches.map(event =>
                    <EventResult data={data} key={event.id} teamId={eventTeam.teamId} event={event}/>
                )}
            </div>
        );
    }
}
