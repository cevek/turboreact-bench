import * as React from 'react';

interface AdaptiveNameProps {
    className: string;
    short?: React.ReactNode;
}

export class AdaptiveName extends React.Component<AdaptiveNameProps, {}> {
    render() {
        const {short, className = ''} = this.props;
        return (
            <span className={'adaptive-name ' + className} data-adaptive-name={short}>
                <span className="adaptive-name--full">{this.props.children}</span>
            </span>
        );
    }
}
