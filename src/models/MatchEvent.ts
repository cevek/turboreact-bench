import {EventAction} from './EventAction';
import {EventTeam} from './EventTeam';

export enum MatchEventStatus {
    FINISHED,
    FINISHED_EXTRATIME,
    FINISHED_PENALTY,
    CANCELLED,
    UPCOMING,
}


export interface MatchEvent {
    id: number;
    seasonId: number;
    roundId: number;
    isLive: number;
    status: string;
    statusType: MatchEventStatus;
    date: Date;
    eventTime: number;
    eventTimePlus: boolean;
    half: number;
    details: EventAction[];
    homeTeamGoals: EventAction[];
    awayTeamGoals: EventAction[];
    results: EventTeam[];
    roundName: string;

    homeTeam: EventTeam;
    awayTeam: EventTeam;
}
