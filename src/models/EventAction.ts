export enum EventActionType {
    GOAL,
    MISS,
    RED_CARD,
    YELLOW_CARD,
    SECOND_YELLOW_CARD,
    SUBSTITUTION,
}

export interface EventAction {
    isShoutout:boolean;
    isPenalty:boolean;
    isHome:boolean;
    player:string;
    playerIn:string;
    playerOut: string;
    shoutoutSequence: number;
    time:number;
    timeAdded:number;
    actionType: EventActionType;
}
