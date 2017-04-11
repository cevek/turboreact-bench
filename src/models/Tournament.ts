import {Season} from './Season';
export interface Tournament {
    id: number;
    countryId: number;
    name: string;
    nameAbbrv: string;
    nameShort: string;
    nameFirstWord:string;
    nameSecondWord:string;
    seasons:Season[];
    path:string;
}
