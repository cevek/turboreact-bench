import {observable} from 'mobx';
import {Tournament} from '../../models/Tournament';
export class AppModel {
    @observable drawerOpened = false;
    @observable isLoading = false;
    @observable selectedTournament: Tournament;
    @observable isBackEnabled = false;
}
