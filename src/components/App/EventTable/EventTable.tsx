import * as React from 'react';
import {MatchEvent} from '../../../models/MatchEvent';
import {Table, TablePropsData} from '../Table/Table';
import {div} from '../../../../lib/components/ActionButton/Link';
import {DateTime} from '../DateTime/DateTime';
import {EventScore} from '../EventScore/EventScore';
import {Data} from '../../../models/Data';

interface EventTableProps {
    events: MatchEvent[];
    className: string;
    captionLeft?: React.ReactNode;
    captionRight?: React.ReactNode;
    headerImage?: string;
    headerImageNode?: React.ReactNode;
    headerTitle?: React.ReactNode;
    headerSubTitle?: React.ReactNode;
    headerMenu?: React.ReactNode;
    showDate?: boolean;
    showTime?: boolean;
    emptyMessage?: string;
    data: Data;
}

export class EventTable extends React.Component<EventTableProps, {}> {

    render() {
        const {data, events, headerImage, headerImageNode, captionLeft, captionRight, headerSubTitle, headerMenu, headerTitle, showDate, showTime, emptyMessage, className = ''} = this.props;
        const cols = [
            {
                title: '',
                classNames: 'table__time',
            },
            {
                title: '',
                classNames: 'table__game',
            },
            {
                title: '',
                classNames: 'table__status',
            },
        ];

        const tableData:TablePropsData[] = events.map(event => ({
            className: '',
            cols: [
                <EventTime showDate={showDate} showTime={showTime} event={event}/>,
                <EventScore data={data} event={event} stopPropagation={true}/>,
                <EventStatus event={event}/>
            ]
        }));

        return (
            <div className={'event-table ' + className}>
                <Table
                    captionLeft={captionLeft}
                    captionRight={captionRight}
                    headerCols={cols}
                    headerImage={headerImage}
                    headerImageNode={headerImageNode}
                    headerTitle={headerTitle}
                    headerSubTitle={headerSubTitle}
                    headerMenu={headerMenu}
                    emptyMessage={emptyMessage}
                    data={tableData}
                />
            </div>
        );
    }
}

interface EventTimeProps {
    event: MatchEvent;
    showDate: boolean;
    showTime: boolean;
    className?: string;
}

export class EventTime extends React.Component<EventTimeProps, {}> {
    render() {
        const {event, showDate, showTime, className = ''} = this.props;
        return (
            <div className={'table__time-link ' + className}>
                <DateTime date={new Date(event.date * 1000)} showDate={showDate} showTime={showTime}/>
            </div>
        );
    }
}

interface EventStatusProps {
    event: MatchEvent;
}

class EventStatus extends React.Component<EventStatusProps, {}> {
    render() {
        const {event} = this.props;
        return (
            <div className="table__status-link">
                <div className="status-link--upcoming"/>
            </div>
        );
    }
}
