import * as React from 'react';

interface ShieldProps {
    primaryColor: string;
    secondaryColor: string;
    className?: string;
}

export class Shield extends React.Component<ShieldProps, {}> {
    render() {
        const {className, primaryColor, secondaryColor} = this.props;
        return (
            <svg className={`shield ${className ? className : ''}`} viewBox="0 0 143 157">
                <use xlinkHref="#shield_back_color" fill={secondaryColor}/>
                <use xlinkHref="#shield_main_color" fill={primaryColor}/>
                <use xlinkHref="#shield"/>
            </svg>
        );
    }
}


interface ShieldMiniProps {
    primaryColor: string;
    secondaryColor: string;
    className?: string;
}

export class ShieldMini extends React.Component<ShieldMiniProps, {}> {
    render() {
        const {className, primaryColor, secondaryColor} = this.props;
        return (
            <svg className={`shield-mini ${className ? className : ''}`} viewBox="0 0 126 135">
                <use xlinkHref="#shield_small_back_color" fill={secondaryColor}/>
                <use xlinkHref="#shield_small_main_color" fill={primaryColor}/>
                <use xlinkHref="#shield_small"/>
            </svg>
        );
    }
}