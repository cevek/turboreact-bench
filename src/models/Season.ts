import {Round} from './Round';
export interface Season {
    id:number;
    name:string;
    nameAbbrv:string;
    rounds:Round[];
    path:string;
    isStarted: boolean;
    isEnded: boolean;
    tournamentId: number;
}