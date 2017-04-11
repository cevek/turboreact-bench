import * as React from 'react';
import FastPromise from "fast-promise";
export abstract class AbstactActionButton<T> extends React.Component<T, {}> {
    disabled = false;
    mounted: boolean;

    abstract getPromise(): Promise<any>;

    componentDidMount(): void {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    protected click() {
        if (this.disabled) {
            return;
        }
        this.disabled = true;
        let called = false;
        this.getPromise().then(() => {
            this.disabled = false;
            called = true;
            if (this.mounted) {
                this.forceUpdate();
            }
        }, err => {
            this.disabled = false;
            called = true;
            if (this.mounted) {
                this.forceUpdate();
            }
            return FastPromise.reject(err);
        });
        if (!called) {
            if (this.mounted) {
                this.forceUpdate();
            }
        }
    };
}
