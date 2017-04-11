import {inject} from '../../lib/services/Injector/Injector';
import {Locale} from '../locales/Locale';

export function i18n() {
    return inject(Locale);
}