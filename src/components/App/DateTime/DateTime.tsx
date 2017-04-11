import * as React from 'react';
import {TimeConst} from '../../../../lib/services/TimeConst';
import moment = require('moment');

// moment.localeData('en-US')._longDateFormat = 'D MMMM HH:mm';
// moment.localeData('ru-RU')._longDateFormat = 'D MMMM HH:mm';

interface DateTimeProps {
    date: Date;
    showDate?: boolean;
    showFullDate?: boolean;
    showTime?: boolean;
    showWeekDay?: boolean;
    className?: string;
}

export class DateTime extends React.Component<DateTimeProps, {}> {
    mount = false;

    componentDidMount() {
        this.mount = true;
        this.forceUpdate();
    }

    render() {
        let {date, showFullDate, showDate = true, showTime = false, showWeekDay = false, className = ''} = this.props;
        if (!showDate) {
            showTime = true;
        }
        const outDate = showDate ? moment(date).format(showFullDate ? 'D MMMM YYYY' : 'D MMMM') : null;
        const outTime = showTime ? moment(date).format('HH:mm') : null;
        const outWeekday = showWeekDay ? moment(date).format('dddd') : null;

        return (
            <div
                className={'date-time ' + (!this.mount && showTime ? 'date-time--server-render-time ' : '') + className}>
                {outDate
                    ? <span className="date-time__date">{outDate}</span>
                    : null
                }
                {outTime
                    ? <span className="date-time__time">{outTime}</span>
                    : null
                }
                {outWeekday
                    ? <span className="date-time__weekday">{outWeekday}</span>
                    : null
                }
            </div>
        );
    }
}


interface RelativeDateProps {
    date: Date;
    className?: string;
}

export class RelativeDate extends React.Component<RelativeDateProps, {}> {
    mount = false;
    timeout: any;

    componentDidMount() {
        this.mount = true;
        this.timeoutRunner();
    }

    update = () => {
        this.forceUpdate();
    };

    timeoutRunner() {
        clearTimeout(this.timeout);
        const diff = Math.abs(this.props.date.getTime() - Date.now());
        let timeoutDur = TimeConst.DAY;
        if (diff < TimeConst.HOUR) {
            timeoutDur = TimeConst.MINUTE;
        } else if (diff < TimeConst.DAY) {
            timeoutDur = TimeConst.HOUR;
        }
        this.timeout = setTimeout(this.update, timeoutDur);
    }

    componentDidUpdate() {
        this.timeoutRunner();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {date, className = ''} = this.props;
        const out = date.getTime() > Date.now() ? moment(date).fromNow() : moment(date).fromNow();
        return (
            <span className={'relative-date ' + className}>{out}</span>
        );
    }
}
