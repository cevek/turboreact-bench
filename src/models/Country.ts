import {Tournament} from './Tournament';

export interface Country {
    id: number;
    name:string;
    nameAbbrv:string
    tournaments:Tournament[];
    // imageCut:string;
    // image:string;
    path:string;
}