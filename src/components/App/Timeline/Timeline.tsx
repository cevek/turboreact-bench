import * as React from 'react';
import {EventTable} from '../EventTable/EventTable';
import {i18n} from '../../../services/i18n';
import {DateTime} from '../DateTime/DateTime';
import {getDayInt} from '../../../services/Utils';
import {Season} from '../../../models/Season';
import {LiveEvents} from '../LiveEvents/LiveEvents';
import {ReturnTop} from '../../../../lib/components/ReturnTop/ReturnTop';
import {Data} from '../../../models/Data';


interface TimelineProps {
    data: Data;
}


export class Timeline extends React.Component<TimelineProps, {}> {
    render() {
        const {data} = this.props;
        const timeline = data.timeline;
        return (
            <div className="timeline">
                <ReturnTop>{i18n().return_top}</ReturnTop>
                <main className="main-content">
                    {timeline.liveEvents.events.length !== 0 &&
                    <div className="timeline__header">{i18n().timeline_live_title}</div>
                    }
                    {timeline.liveEvents.events.length !== 0 && <LiveEvents data={data} events={timeline.liveEvents.events}/>}
                    <div className="timeline__header">{i18n().timeline_title}</div>
                    {timeline.grouppedEvents.map(({key, item, items}, i) => {
                        const season = data.getSeasonById(item.seasonId);
                        const tournament = data.getTournamentById(season.tournamentId);
                        const country = data.getCountryById(tournament.countryId);
                            return <div key={key} className="content-event">
                                {i === 0 || getDayInt(timeline.grouppedEvents[i - 1].item.date) !== getDayInt(item.date)
                                    ? <DateTime className="event__time" date={item.date} showWeekDay/>
                                    : null
                                }
                                <EventTable
                                    data={data}
                                    className="event-table--fixtures"
                                    headerImageNode={
                                        <div>
                                            <img className="table__flag-img" src={country.image}
                                                 alt="flag"/>
                                        </div>
                                    }
                                    headerTitle={<div>{tournament.nameAbbrv}</div>}
                                    headerSubTitle={item.roundName}
                                    headerMenu={<SeasonLinks season={season}/>}
                                    events={items}
                                    showDate={false}
                                />
                            </div>;
                        }
                    )}
                </main>
            </div>
        );
    }
}

interface SeasonLinksProps {
    season: Season;
}

class SeasonLinks extends React.Component<SeasonLinksProps, {}> {
    render() {
        const {season} = this.props;
        return (
            <div className="table__links">
                <div>{season.name}</div>
                <div>{i18n().section_results}</div>
                <div>{i18n().section_fixtures}</div>
            </div>
        );
    }
}
