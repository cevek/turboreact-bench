import * as React from 'react';

interface TooltipProps {
    tooltip: React.ReactNode;
    delay?: number;
    className?: string;
}

interface TooltipState {
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    opened = false;
    timeout: any;

    static defaultProps = {delay: 250};

    openTimeoutCallback = () => {
        this.opened = true;
        this.forceUpdate();
    }

    closeTimeoutCallback = () => {
        this.opened = false;
        this.forceUpdate();
    }

    onMouseEnter = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.openTimeoutCallback, this.props.delay);
    };

    onMouseLeave = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.closeTimeoutCallback, this.props.delay);
    };

    render() {
        const {tooltip, className = '', children} = this.props;
        return (
            <span className={'tooltip ' + (this.opened ? 'tooltip--opened ' : '') + className} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {children}
                {this.opened ? <div className="tooltip__content">{tooltip}</div> : null}
            </span>
        );
    }
}