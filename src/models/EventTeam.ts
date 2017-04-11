import {MatchEvent} from './MatchEvent';

export interface EventTeam {
    draw:boolean;
    eventId: number;
    isHome: boolean;
    isPenalty: boolean;
    lost: boolean;
    penaltyScore: number;
    score: number;
    teamId:number;
    win:boolean;
    lastMatches:MatchEvent[];
    lastMatchesScore:number;
}