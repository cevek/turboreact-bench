import * as React from 'react';

interface ReturnTopProps {
    timeToTop?: number;
    offsetTopTrigger?: number;
    className?: string;
}

interface ReturnTopState {
    hidden?: boolean;
    forceHidden?: boolean;
    shown?: boolean;
}

export class ReturnTop extends React.Component<ReturnTopProps, ReturnTopState> {
    static defaultProps: ReturnTopProps = {
        offsetTopTrigger: 500,
        timeToTop: 300,
        className: ''
    };

    state = {
        hidden: true,
        forceHidden: false,
    };

    prevScrollPos = -1;
    prevTimeStamp = -1;

    scrollTopDone = () => {
        this.setState({forceHidden: false});
    }

    scrollToTop = () => {
        this.setState({forceHidden: true});
        scrollToTop(this.props.timeToTop, this.scrollTopDone);
    }

    handleScroll = (e: MouseEvent) => {
        const offset = window.pageYOffset;
        const pxPerMs = (offset - this.prevScrollPos) / (e.timeStamp - this.prevTimeStamp);
        let hidden = this.state.hidden;
        if (this.prevTimeStamp > -1) {
            if (offset >= this.props.offsetTopTrigger && pxPerMs < -2) {
                hidden = false;
            }
            if (offset < this.props.offsetTopTrigger || pxPerMs > 1) {
                hidden = true;
            }
        }
        if (hidden !== this.state.hidden) {
            this.setState({hidden});
        }
        this.prevTimeStamp = e.timeStamp;
        this.prevScrollPos = offset;
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {hidden, forceHidden} = this.state;
        return (
            <div className={'return-top ' + this.props.className + (hidden || forceHidden ? ' return-top--hidden' : '')}
                 onClick={this.scrollToTop}>
                {this.props.children}
            </div>
        );
    }
}

function scrollToTop(timeToTop: number, callback: ()=>void) {
    if (!window.requestAnimationFrame) {
        window.scrollTo(0, 0);
        return;
    }
    const cosParameter = window.scrollY / 2;
    let scrollCount = 0;
    let oldTimestamp = window.performance ? performance.now() : Date.now();
    let frame: number;

    function step() {
        const newTimestamp = window.performance ? performance.now() : Date.now();
        scrollCount += Math.PI / (timeToTop / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) {
            callback();
            return;
        }
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        frame = window.requestAnimationFrame(step);
    }
    frame = window.requestAnimationFrame(step);
}