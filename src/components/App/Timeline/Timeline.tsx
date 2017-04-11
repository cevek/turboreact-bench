import * as React from 'react';
import {EventTable} from '../EventTable/EventTable';
import {i18n} from '../../../services/i18n';
import {getDayInt} from '../../../services/Utils';
import {Season} from '../../../models/Season';
import {LiveEvents} from '../LiveEvents/LiveEvents';
import {ReturnTop} from '../../../../lib/components/ReturnTop/ReturnTop';
import {Data} from '../../../models/Data';
import {Timeline as TimelineModel} from '../../../models/Timeline';
import {DateTime} from '../DateTime/DateTime';


interface TimelineProps {
    data: Data;
    timeline: TimelineModel;
}


export class Timeline extends React.Component<TimelineProps, {}> {
    render() {
        const {timeline, data} = this.props;
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
                                {i === 0 || getDayInt(new Date(timeline.grouppedEvents[i - 1].item.date * 1000)) !== getDayInt(new Date(item.date * 1000))
                                    ? <DateTime className="event__time" date={new Date(item.date * 1000)} showWeekDay/>
                                    : null
                                }
                                <EventTable
                                    data={data}
                                    className="event-table--fixtures"
                                    headerImageNode={
                                        <div>
                                            <img className="table__flag-img" src={'/images/flags/normal/' + country.id + '.jpg'}
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
                <div className="table__links-item">{season.name}</div>
                <div className="table__links-item">{i18n().section_results}</div>
                <div className="table__links-item">{i18n().section_fixtures}</div>
            </div>
        );
    }
}
