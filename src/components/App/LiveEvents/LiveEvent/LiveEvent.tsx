import * as React from 'react';
import {MatchEvent} from '../../../../models/MatchEvent';
import {div} from '../../../../../lib/components/ActionButton/Link';
import {i18n} from '../../../../services/i18n';
import {Tab, Tabs} from '../../../../../lib/components/Tabs/Tabs';
import {LiveEventCaption} from '../../LiveEventCaption/LiveEventCaption';
import {LiveEventInfo, LiveTimeHalf} from '../../LiveEventInfo/LiveEventInfo';
import {LiveEventGoals} from '../../LiveEventGoals/LiveEventGoals';
import {LiveHalf} from '../../LiveHalf/LiveHalf';
import {formatEventTime} from '../../../../services/Utils';
import {Data} from '../../../../models/Data';

interface LiveEventProps {
    event: MatchEvent;
    data: Data;
}

export class LiveEvent extends React.Component<LiveEventProps, {}> {
    render() {
        const {event, data} = this.props;
        const season = data.getSeasonById(event.seasonId);
        const tournament = data.getTournamentById(season.tournamentId);
        const country = data.getCountryById(tournament.countryId);

        return (
            <div className="live-event">
                <LiveEventCaption eventDate={new Date(event.date * 1000)}/>
                <Tabs className="live-event__tabs" tabNamesClassName="live-event__tab-names"
                      activeTabClassName="live-event__active-tab">
                    <Tab title={i18n().live_event__info} className="live-event__tab">
                        <div className="live-event__tab-content">
                            <div className="live-event__tournament">
                                <div className="live-event__tournament_link">
                                    <img className="live-event__tournament-flag" src={'/images/flags/normal/' + country.id + '.jpg'} alt=""/>
                                    <div className="live-event__tournament-title">{tournament.nameAbbrv}</div>
                                </div>
                                <div className="live-event__mobile-time-half">
                                    <LiveHalf className="live-event__half" half={event.half}/>
                                    <span className="live-event__event-time">{formatEventTime(event.eventTime, false)}</span>
                                </div>
                            </div>
                            <LiveTimeHalf event={event} className="live-event__desktop-time-half"/>
                            <LiveEventInfo event={event} data={data} isCardBlock/>
                        </div>
                    </Tab>
                    <Tab title={i18n().live_event__goals} className="live-event__tab">
                        <div className="live-event__tab-content">
                            <LiveEventGoals data={data} event={event}/>
                        </div>
                    </Tab>
                </Tabs>
                <div className="live-event__go">{i18n().live_event__go}</div>
            </div>
        );
    }
}
