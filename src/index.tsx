import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Timeline} from './components/App/Timeline/Timeline';
import {Data} from './models/Data';
import {Timeline as TimelineModel} from './models/Timeline';
// import {data} from './data';
const {data} = require('./data')
const {events} = require('./events');
const {liveEvents} = require('./live-events');
import {arrayGroup, getUTCDayInt} from './services/Utils';
import {MatchEvent} from './models/MatchEvent';


function prepareEvent(event: MatchEvent) {
}

liveEvents.forEach(prepareEvent);
events.forEach(prepareEvent);
const d = new Data(data);
const grouppedEvents = arrayGroup(events, (event: MatchEvent) => getUTCDayInt(new Date(event.date * 1000)) + '_' + event.roundId);
const timeline:TimelineModel = {liveEvents: {events: liveEvents}, grouppedEvents};



ReactDOM.render(<Timeline data={d} timeline={timeline}/>, document.getElementById('wrapper'));
