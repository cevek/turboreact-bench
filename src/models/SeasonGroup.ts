import {Season} from './Season';
import {Tournament} from './Tournament';
export interface SeasonGroup {
    id: string;
    name: string;
    nameAbbrv: string;
    path: string;
    seasons: Season[];
    tournaments: Tournament[];
}