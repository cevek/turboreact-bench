import {Season} from './Season';
import {SeasonGroup} from './SeasonGroup';
export interface Team {
    id: number;
    name: string;
    nameAbbrv: string;
    path: string;
    primaryColor: string;
    secondaryColor: string;
    gradient: number;
    playInSeasonsIds: number[];
    playInSeasons: Season[];

    seasonGroupsSet: Set<SeasonGroup>;
    seasonGroups: SeasonGroup[];
}
