import {MatchEvent} from './MatchEvent';
import {ArrayGroup} from '../services/Utils';
import {Events} from './Events';


export interface Timeline extends Events {
    grouppedEvents: ArrayGroup<MatchEvent>[];
    liveEvents: Events;
}
