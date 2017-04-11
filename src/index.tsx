import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Timeline} from './components/App/Timeline/Timeline';
import {Data} from './models/Data';

const data = new Data({});
ReactDOM.render(<Timeline data={data}/>, document.getElementById('wrapper'));
