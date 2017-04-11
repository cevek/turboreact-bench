import * as React from 'react';
import {DateTime} from '../DateTime/DateTime';

interface LiveEventCaptionProps {
    eventDate: Date;
    className?: string;
}

export class LiveEventCaption extends React.Component<LiveEventCaptionProps, {}> {
    render() {
        const {eventDate, className = ''} = this.props;
        return (
            <div className={'live-event__caption ' + className}>
                <DateTime className="live-event__caption-time" date={eventDate} showDate={false}/>
                <DateTime className="live-event__caption-date" date={eventDate}/>
            </div>
        );
    }
}
