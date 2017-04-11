import * as Koa from 'koa';
import {createPackerInstance} from './packer.config';
import * as serve from 'koa-static';
import {Packer} from 'webbuilder';
import {renderHTML} from 'webbuilder/dist/plugins/html';
import {init} from '../src/server';
const compress = require('koa-compress');
const convert = require('koa-convert');
import _request = require('request');
(global as any).XMLHttpRequest = require('xhr2');
const port = 5000;


const app = new Koa();
const needToRender = false;

app.listen(port);
console.log('App listen http://localhost:' + port);

const packer = createPackerInstance(false);
packer.run({watch: true});


let serverPacker: Packer;
if (needToRender) {
    serverPacker = createPackerInstance(true);
    serverPacker.run({watch: true});
}


app.use(serve(packer.options.dest, needToRender ? {index: '__no_index'} : null));
let lastServerRunIteration = -1;
app.use(async(ctx) => {
    if (!ctx.path.match(/\./)) {
        const packerResult = await packer.getResult();
        let body = '';
        let statusCode = 200;
        if (needToRender) {
            const serverPackerResult = await serverPacker.getResult();
            const moduleName = require.resolve(serverPacker.options.dest + '/server.js');
            // remove require cache after changes
            if (serverPackerResult.runIteration !== lastServerRunIteration) {
                delete require.cache[moduleName];
                lastServerRunIteration = serverPackerResult.runIteration;
            }
            try {
                const module = require(moduleName);
                const res = await (module.init as typeof init)();
                body = res.body;
            } catch (e) {
                ctx.body = 'Server error';
                ctx.status = 500;
                return;
            }
        }
        ctx.status = statusCode;
        ctx.body = renderHTML('index.html', packerResult, {
            body,
        });
    }
});


