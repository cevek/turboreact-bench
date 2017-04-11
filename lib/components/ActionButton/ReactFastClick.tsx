import * as React from 'react';

const needToEmulate = /i(phone|pad|pod)/i.test(navigator.userAgent);

const isFocused = (el: HTMLElement) => {
    return document.activeElement === el;
};

const isTag = (el: HTMLElement, tagName: string) => {
    return el && typeof el.tagName === 'string' && el.tagName.toLowerCase() === tagName.toLowerCase();
};

const isInput = (el: HTMLElement) => {
    return isTag(el, 'input');
};

const isFocusedInput = (el: HTMLElement) => {
    return isInput(el) && isFocused(el);
};

const isCheckbox = (el: HTMLInputElement) => {
    return isInput(el) && el.type && el.type.toLowerCase() === 'checkbox';
};

const isSelect = (el: HTMLElement) => {
    return isTag(el, 'select');
};

const isTextArea = (el: HTMLElement) => {
    return isTag(el, 'textarea');
};

const isFocusedTextArea = (el: HTMLElement) => {
    return isFocused(el) && isTextArea(el);
};


export interface ReactFastClickProps extends React.HTMLAttributes<{}> {
    threshold?: number;
    timeThreshold?: number;
}

export interface ReactFastClickState {
    touchId?: number,
    touchX?: number,
    touchY?: number,
    touchTime?: number
}

export class ReactFastClick extends React.Component<ReactFastClickProps, ReactFastClickState> {
    static propTypes = {
        // The number of px that the finger may move before the gesture is no longer considered a tap
        threshold: React.PropTypes.number,
        // The amount of time in ms that the finger may be down before the gesture is no longer considered a tap by this
        // component
        timeThreshold: React.PropTypes.number
    };

    static defaultProps = {
        threshold: 15,
        timeThreshold: 125
    };

    state: ReactFastClickState = {
        touchId: null,
        touchX: null,
        touchY: null,
        touchTime: null
    };

    /**
     * Clear all touch data
     * @param callback
     */
    clearTouchData(callback?: () => void) {
        this.setState({
            touchId: null,
            touchX: null,
            touchY: null,
            touchTime: null
        }, callback);
    }

    /**
     * Handle the touch start event
     * @param e
     */
    handleTouchStart = (e: React.TouchEvent<{}>) => {
        if (!needToEmulate) return;
        // one+ touches means the user isn't trying to tap this element
        if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
            this.clearTouchData();
            return;
        }

        const tch = e.targetTouches[0];

        this.setState({
            touchId: tch.identifier,
            touchX: tch.screenX,
            touchY: tch.screenY,
            touchTime: (new Date()).getTime()
        });
    }

    /**
     * Handle the touch move event
     * @param e
     */
    handleTouchMove = (e: React.TouchEvent<{}>) => {
        if (!needToEmulate) return;
        const {touchId} = this.state,
            {threshold} = this.props;

        if (touchId === null) {
            return;
        }

        if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
            this.clearTouchData();
            return;
        }

        const touch = e.targetTouches[0];
        if (touchId !== touch.identifier) {
            this.clearTouchData();
            return;
        }

        // verify that the touch did not move outside the threshold
        const dist = this.calculateTouchDistanceFromOrigin(touch);
        // if it was moved farther than the allowed amount, then we should cancel the touch
        if (dist > threshold) {
            this.clearTouchData();
        }
    }

    calculateTouchDistanceFromOrigin(touch: Touch) {
        const {touchX, touchY} = this.state,
            {screenX, screenY} = touch;

        return Math.sqrt(Math.pow(screenX - touchX, 2) + Math.pow(screenY - touchY, 2));
    }

    handleTouchEnd = (e: React.TouchEvent<{}>) => {
        if (!needToEmulate) return;
        const {touchId, touchTime} = this.state,
            {timeThreshold, threshold} = this.props;

        if (touchId === null) {
            return;
        }

        if (timeThreshold !== null) {
            // length of press exceeds the amount of time that we are doing anything for
            if (((new Date()).getTime() - touchTime > timeThreshold)) {
                this.clearTouchData();
                return;
            }
        }

        // still a touch remaining
        if (e.touches.length !== 0) {
            this.clearTouchData();
            return;
        }

        // get the touch from the list of changed touches
        let touch: Touch = null;
        for (let i = 0; i < e.changedTouches.length; i++) {
            const oneTouch = e.changedTouches[i];
            if (oneTouch.identifier === this.state.touchId) {
                touch = oneTouch;
                break;
            }
        }

        if (touch === null) {
            this.clearTouchData();
            return;
        }

        // verify that the touch did not move outside the threshold
        const dist = this.calculateTouchDistanceFromOrigin(touch);
        // if it was moved farther than the allowed amount, then we should cancel the touch
        if (dist > threshold) {
            this.clearTouchData();
            return;
        }

        const targetEl = touch.target;

        // if it's an input where typing is allowed and it's already focused,
        // don't do anything. this is probably an attempt to move the cursor
        if ((isFocusedInput(targetEl as HTMLInputElement) || isFocusedTextArea(targetEl as HTMLInputElement)) && !isCheckbox(targetEl as HTMLInputElement)) {
            this.clearTouchData();
            return;
        }

        // prevent the simulated mouse events
        e.preventDefault();
        // we don't need this touch end event to be handled multiple times if it's interpreted as a click
        e.stopPropagation();
        // clear the data and then trigger the click
        this.clearTouchData(() => {
            ReactFastClick.triggerClick(targetEl);
        });
    }

    handleTouchCancel = () => {
        if (!needToEmulate) return;
        this.clearTouchData();
    }

    static triggerClick(target: any) {
        while (target && typeof target.click !== "function") {
            target = target.parentNode;
        }

        if (!target) {
            return;
        }

        target.click();

        // if it's an input and not a checkbox, focus it
        // or if it's a select
        // or if it's a textarea
        if ((isInput(target) && !isCheckbox(target)) || isSelect(target) || isTextArea(target)) {
            target.focus();
        }
    }

    render() {
        const {children} = this.props;

        const touchProps = {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchMove,
            onTouchEnd: this.handleTouchEnd,
            onTouchCancel: this.handleTouchCancel
        };

        return <div {...touchProps}>{children}</div>
    }
}