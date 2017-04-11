import {Packer, combineJS, combineCSS, copy, hash, conditional, replaceCode, src, cleanDist} from 'webbuilder';
import {ts} from 'webbuilder/dist/plugins/ts';
import {html} from 'webbuilder/dist/plugins/html';
import {sass} from 'webbuilder/dist/plugins/sass';
// const transformFastReact = require('turboreact/ts-transformer');
const autoprefixer = require('autoprefixer');

export function createPackerInstance(serverSide: boolean) {
    if (serverSide) {
        const packerConfig = {
            dest: '../server_dist',
            sourceMap: false,
            publicPath: '/',
            context: __dirname + '/../src/',
            alias: {
                // react: 'turboreact',
                // 'react-dom': 'turboreact',
                // 'react-dom/server': 'turboreact/server',
            }
        };
        return new Packer(packerConfig, promise => promise
            .then(ts({}/*, {after: [transformFastReact]}*/))
            .then(combineJS('server.js', 'server.js'))
        );

    } else {
        const packerConfig = {
            dest: '../dist',
            context: __dirname + '/../src/',
            skipNodeModulesWatch: false,
            logLevel: 2,
            alias: {
                // react: 'turboreact',
                // 'react-dom': 'turboreact',
            }
        };
        return new Packer(packerConfig, promise => promise
            .then(ts({}/*, {after: [transformFastReact]}*/))
            // .then(babel(null))
            // .then(reactHot())
            .then(sass('index.scss'))
            .then(copy('components/App/images/flags/normal/*', path=>path.replace('components/App/', '')))
            .then(combineJS('index.js', 'js/bundle.js'))
            // .then(uglifyjs('../dist/bundle.js'))
            .then(combineCSS('styles/style.css'))
            .then(html({
                file: 'index.html',
                destFile: 'index.html',
                params: {
                    body: '',
                    appConfig: `<script>var APP_CONFIG = ${JSON.stringify({})}</script>`,
                }
            }))
        );
    }
}

