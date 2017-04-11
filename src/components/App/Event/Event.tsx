import * as React from 'react';
import * as classNames from 'classnames';
import {MatchEvent, MatchEventStatus} from '../../../models/MatchEvent';
import {AppProps} from '../App';
import {EventAction} from './EventAction/EventAction';
import {EventAction as EA} from '../../../models/EventAction';
import {formatEventTime, formatScore} from '../../../services/Utils';
import {i18n} from '../../../services/i18n';
import {DateTime, RelativeDate} from '../DateTime/DateTime';
import {CordovaPlugins} from '../../../services/CordovaPlugins';
import {inject} from '../../../../lib/services/Injector/Injector';
import {EventTeam} from '../../../models/EventTeam';
import {EventScore} from '../EventScore/EventScore';
import {TeamName} from '../TeamName/TeamName';
import {processNotFound} from '../../../routes';
import {observer} from 'mobx-react';
import {Router} from '../../../../lib/components/Router/Router';
import {AppModel} from '../AppModel';
import {Socket} from '../../../../lib/services/Socket';
import {observable} from 'mobx';
import {AdaptiveName} from '../AdaptiveName/AdaptiveName';
import {LiveHalf} from '../LiveHalf/LiveHalf';
import {LiveEventGoals} from '../LiveEventGoals/LiveEventGoals';
import {LiveEventCaption} from '../LiveEventCaption/LiveEventCaption';

interface EventProps extends AppProps {
    params: { id: number }
    loadedEvent: MatchEvent;
}

@observer
export class Event extends React.Component<EventProps, {}> {
    static onEnter(props: EventProps) {
        inject(CordovaPlugins).insomniaKeepAwake();
        return MatchEvent.fetch(props.data, props.params.id).then(event => {
            props.loadedEvent = event;
        }, processNotFound);
    }

    @observable event = this.props.loadedEvent;
    socketUrl: string;

    static contextTypes = {router: React.PropTypes.object};
    context: { router: Router };

    socketCallback = (data: any) => {
        this.event = new MatchEvent(data, this.props.data);
        if (!this.event.isLive) {
            // this.unsubscribeSocket();
        }
    };

    subscribeSocket() {
        this.socketUrl = `get /api/v1/sports/soccer/events/` + this.event.id;
        inject(Socket).listen(this.socketUrl, this.socketCallback);
    }

    unsubscribeSocket() {
        if (this.socketUrl) {
            inject(Socket).unlisten(this.socketUrl, this.socketCallback);
        }
    }

    componentDidMount() {
        this.context.router.history.canBack()
            ? inject(AppModel).isBackEnabled = true
            : inject(AppModel).isBackEnabled = false;

        // if (this.event.isLive) {
        this.subscribeSocket();
        // }
    }

    componentWillUnmount() {
        inject(AppModel).isBackEnabled = false;
        inject(CordovaPlugins).insomniaAllowSleepAgain();
        this.unsubscribeSocket();
    }

    render() {
        const {event} = this;
        const matchClassNames = classNames({
            'match': true,
            'match--future': event.details.length == 0,
            'match--live': event.isLive == 1
        });

        return (
            <div className={matchClassNames}>
                <div className="match__info">
                    {event.isLive
                        ? <LiveEventCaption className="match__live-event-caption-mobile" eventDate={event.date}/>
                        : null
                    }
                    <div className="match__inner">
                        {(event.isLive || event.statusType !== MatchEventStatus.UPCOMING)
                            ? <div className="match__caption">
                                <DateTime className="match__date" date={event.date}/>
                                {event.isLive
                                    ? <div className="match__mobile-time-half">
                                        <LiveHalf className="match__mobile-half" half={event.half}/>
                                        <div className="match__mobile-time">{formatEventTime(event.eventTime, event.eventTimePlus)}</div>
                                    </div>
                                    : null
                                }
                                <div className="match__round">{event.getRound().name}</div>
                            </div>
                            : null
                        }
                        <div className="match__header">
                            <TeamName
                                team={event.homeTeam.getTeam()}
                                modification="event"
                                iconPosition="left"
                                bigImage
                                showLastMatches
                                eventTeam={event.homeTeam}/>
                            <div className="match__header-info">
                                {event.isLive
                                    ? <div className="match__live-info">
                                        <div className="match__live-score">
                                            {formatScore(event.homeTeam.score)}:{formatScore(event.awayTeam.score)}
                                        </div>
                                        <div className="match__live-details">
                                            <LiveHalf className="match__live-half" half={event.half}/>
                                            <div className="match__live-time">
                                                {formatEventTime(event.eventTime, event.eventTimePlus)}
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="match__live-info">
                                        {event.statusType === MatchEventStatus.UPCOMING
                                            ? <div className="match__time">
                                                <DateTime date={event.date} showTime={true} showDate={true}/>
                                                <div className="match__time-left">
                                                    <RelativeDate date={event.date}/>
                                                </div>
                                            </div>
                                            : <span className="match__live-score">
                                            {formatScore(event.homeTeam.score)}:{formatScore(event.awayTeam.score)}
                                          </span>
                                        }
                                    </div>
                                }
                            </div>
                            <TeamName
                                team={event.awayTeam.getTeam()}
                                modification="event"
                                iconPosition="right"
                                bigImage={true}
                                showLastMatches
                                eventTeam={event.awayTeam}/>
                        </div>
                        {((event.isLive || event.statusType !== MatchEventStatus.UPCOMING) && (event.homeTeam.score || event.awayTeam.score))
                            ?
                            <div>
                                <div className="match__results">
                                    <MatchResults goals={event.homeTeamGoals} eventTeam={event.homeTeam}/>
                                    <MatchResults goals={event.awayTeamGoals} eventTeam={event.awayTeam}/>
                                </div>
                                {event.isLive
                                    ? <div>
                                        <div className="match__goals-title-mobile">{i18n().live_event__goals}</div>
                                        <LiveEventGoals event={event} className="match__results-mobile"/>
                                    </div>
                                    : null
                                }
                            </div>
                            : null
                        }
                        {event.statusType === MatchEventStatus.UPCOMING
                            ? <div className="match__last-games">
                                <TeamLastMatches eventTeam={event.homeTeam}/>
                                <TeamLastMatches eventTeam={event.awayTeam}/>
                            </div>
                            : null
                        }
                    </div>
                </div>

                {event.details.length !== 0 &&
                    <div className="match__content">
                        {event.isLive
                            ? <div className="match__live-teams-mobile">
                                <div className="match__live-team-name-mobile">{event.homeTeam.getTeam().nameAbbrv}</div>
                                <div className="match__live-team-name-mobile">{event.awayTeam.getTeam().nameAbbrv}</div>
                            </div>
                            : null
                        }
                        {event.details.length !== 0 && <div className="match__content-backline"/>}
                        {event.details.map((eventAction, i) =>
                            <EventAction key={i} eventAction={eventAction}/>
                        )}
                    </div>
                }
            </div>
        );
    }
}

interface MatchResultsProps {
    goals: EA[];
    eventTeam: EventTeam;
}

class MatchResults extends React.Component<MatchResultsProps, {}> {
    render() {
        const {eventTeam, goals} = this.props;
        const {score} = eventTeam;
        return (
            <div className="results">
                <AdaptiveName className="results__title" short={eventTeam.getTeam().nameAbbrv}>
                    {eventTeam.getTeam().name}
                </AdaptiveName>
                <div className="results__scored">
                    {i18n().eventpage_goals_scored_plural(score)}
                </div>
                <div className="results__info">
                    {goals.map((goal: EA, i: number) =>
                        <div className="results__info-who" key={i}>
                            <span className="info-who__time">{formatEventTime(goal.time, false)}</span>
                            <span className="info-who__who">{goal.player ? goal.player.split(' ')[0] : ''}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

interface TeamLastMatchesProps {
    eventTeam: EventTeam;
}

class TeamLastMatches extends React.Component<TeamLastMatchesProps, {}> {
    render() {
        const {eventTeam} = this.props;
        const {lastMatchesScore} = eventTeam;
        return (
            <div className="last-games">
                <div className="last-games__title">
                    <AdaptiveName className="last-games__title-name" short={eventTeam.getTeam().nameAbbrv}>
                        {eventTeam.getTeam().name}
                    </AdaptiveName>
                    <div className="last-games__title-content">
                        {i18n().eventpage_goals_scored_plural(lastMatchesScore)}
                    </div>
                    <div className="last-games__title-last">
                        {i18n().eventpage_last_games}
                    </div>
                </div>
                <div className="last-games__matches">
                    {eventTeam.lastMatches.map(event =>
                        <EventScore key={event.id} event={event}/>
                    )}
                </div>
            </div>
        );
    }
}

