import * as React from 'react';
import * as classNames from 'classnames';
import {Drawer} from './Drawer/Drawer';
import {observer} from 'mobx-react';
import {Data} from '../../models/Data';
import {Languages} from './Languages/Languages';
import {Burger} from './Burger/Burger';
import {Obfuscator} from './Drawer/Obfuscator/Obfuscator';
import {inject} from '../../../lib/services/Injector/Injector';
import {AppModel} from './AppModel';
import {PageLoader} from './PageLoader/PageLoader';
import {div} from '../../../lib/components/ActionButton/Link';
import {i18n} from '../../services/i18n';
import {RouteProps} from '../../../lib/components/Router/Route';

export interface AppProps extends RouteProps<{}, {}> {
    data: Data;
}

export interface AppState {
    isDrawerOpen?: boolean;
}

export class App extends React.Component<AppProps, AppState> {
    render() {
        const appClassNames = classNames({
            'app': true,
            'app--no-scroll': inject(AppModel).drawerOpened || inject(AppModel).isLoading,
        });

        return (
            <div className={appClassNames}>
                <Drawer countries={this.props.data.countries}/>
                <PageLoader/>
                <Obfuscator/>
                <div className="content">
                    <div>{i18n().site_name}</div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

