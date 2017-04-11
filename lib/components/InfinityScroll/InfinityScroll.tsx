import * as React from "react";

interface InfinityScrollProps {
    bottomThreshold?: number;
    action: (e: UIEvent)=>Promise<any>;
    isActive: boolean;
    className?: string;
}

export class InfinityScroll extends React.Component<InfinityScrollProps, {}> {

    loadingInProgress = false;

    listener = (e: UIEvent) => {
        if (!this.loadingInProgress && this.props.isActive) {
            const bottomThreshold = this.props.bottomThreshold || 500;
            const html = document.documentElement;
            if (window.pageYOffset + window.innerHeight + bottomThreshold > html.scrollHeight) {
                this.loadingInProgress = true;
                this.props.action(e).then(() => {
                    this.loadingInProgress = false;
                    this.forceUpdate();
                })
                this.forceUpdate();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listener);
    }

    render() {
        return (
            this.loadingInProgress && this.props.isActive
                ? <div className={this.props.className}>{this.props.children}</div>
                : null
        );
    }
}
