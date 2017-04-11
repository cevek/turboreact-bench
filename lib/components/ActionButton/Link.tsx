import * as React from 'react';
import * as classNames from 'classnames';
import {Router} from '../Router/Router';

interface LinkProps {
    url: string;
    className?: string;
    selected?: boolean;
    parentSelected?: boolean;
    disabled?: boolean;
    stopPropagation?: boolean;
    onClick?: (e: React.MouseEvent<{}>) => void;
    onMouseEnter?: (e: React.MouseEvent<{}>) => void;
    onMouseLeave?: (e: React.MouseEvent<{}>) => void;
}

export class div extends React.Component<LinkProps, {}> {
    context: {router: Router};
    selectedClass = 'link__selected';
    parentClass = 'link__parent';
    inProgressClass = 'link__in-progress';
    mounted = false;
    inProgress = false;


    static contextTypes = {router: React.PropTypes.object};

    routerListener = () => {
        if (this.mounted) {
            this.forceUpdate();
        }
    };

    componentDidMount() {
        this.mounted = true;
        this.context.router.urlDidMount.addListener(this.routerListener);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.context.router.urlDidMount.removeListener(this.routerListener);
    }

    onClick = (e: React.MouseEvent<{}>) => {
        if (e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }
            if (this.props.disabled) {
                return;
            }
            if (this.inProgress) {
                return;
            }
            this.inProgress = true;
            this.context.router.changeUrl(this.props.url, false, false).then(() => {
                this.inProgress = false;
                if (this.mounted) {
                    this.forceUpdate();
                }
            }, err => {
                this.inProgress = false;
                if (this.mounted) {
                    this.forceUpdate();
                }
            });
            if (this.props.onClick) {
                this.props.onClick(e);
            }
            this.forceUpdate();
        }
    };

    render() {
        const url = this.props.url;
        const routerUrl = this.context.router.url;
        const sameLen = url.length == routerUrl.length;
        const partOf = routerUrl.substr(0, url.length) == url;
        const isParent = partOf && !sameLen;

        return (
            <a
                onClick={this.onClick}
                href={this.props.url}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                className={classNames(
                    this.props.className,
                    this.inProgress && this.inProgressClass,
                    (partOf && !isParent || this.props.selected) && this.selectedClass,
                    (isParent || this.props.parentSelected) && this.parentClass
                )}>
                {this.props.children}
            </a>
        );
    }
}
