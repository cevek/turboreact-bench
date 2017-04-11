import * as React from 'react';
import * as classNames from 'classnames';
import {EventAction as EA, EventActionType} from '../../../../models/EventAction';
import {i18n} from '../../../../services/i18n';
import {formatEventTime} from '../../../../services/Utils';

interface EventActionProps {
    eventAction: EA;
}

export class EventAction extends React.Component<EventActionProps, {}> {
    render() {
        const {eventAction} = this.props;
        const {isPenalty, actionType, isHome, isShoutout, player, playerIn, playerOut, shoutoutSequence, time, timeAdded} = eventAction;

        const actionMap = {
            [EventActionType.MISS]: i18n().eventaction_miss,
            [EventActionType.GOAL]: i18n().eventaction_goal,
            [EventActionType.RED_CARD]: i18n().eventaction_red_card,
            [EventActionType.YELLOW_CARD]: i18n().eventaction_yellow_card,
            [EventActionType.SECOND_YELLOW_CARD]: i18n().eventaction_second_yellow_card,
            [EventActionType.SUBSTITUTION]: i18n().eventaction_substitution,
        };

        const action = actionMap[actionType];

        const eventClassNames = classNames({
            'event': true,
            'event--team-one': isHome,
            'event--team-two': !isHome,
            'event--substitution': actionType == EventActionType.SUBSTITUTION,
            'event--yellow-card': actionType == EventActionType.YELLOW_CARD,
            'event--red-card': actionType == EventActionType.RED_CARD,
            'event--goal': !isPenalty && actionType == EventActionType.GOAL,
            'event--penalty-goal': isPenalty && actionType == EventActionType.GOAL,
            'event--penalty-missed': isPenalty && actionType !== EventActionType.GOAL,
            'event--second-yellow-card': actionType == EventActionType.SECOND_YELLOW_CARD
        });

        return (
            <div className={eventClassNames}>
                <div className="event__aligner"/>
                <div className="event__type"/>
                <div className="event__info">
                    <div className="event__info-marker"/>
                    <div className="event__info-status">{isShoutout ? i18n().eventaction_penalty_goal : action}</div>
                    {time ? <div className="event__info-time">{formatEventTime(time, false)}</div> : null}
                    {(player || playerIn || playerOut) &&
                        <div className="event__info-details">
                            <div className="event__player-one">
                                {player} {playerIn}
                                {playerIn && <span className="in"/>}
                            </div>
                            <div className="event__player-two">
                                {playerOut && playerOut}
                                {playerOut && <span className="out"/>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
