import {i18n} from './i18n';
export function formatDate(date: Date) {
    return date.toLocaleDateString();
}

export interface ArrayGroup<T> {
    key: string;
    item: T;
    items: T[];
}
export function arrayGroup<T>(items: T[], groupKey: (item: T) => string): ArrayGroup<T>[] {
    const map = new Map<string, T[]>();
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const key = groupKey(item);
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(item);
    }
    const arr: ArrayGroup<T>[] = [];
    map.forEach((value, key) => {
        arr.push({key, items: value, item: value[0]});
    });
    return arr;
}

export function getDayInt(date: Date) {
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

export function getUTCDayInt(date: Date) {
    return date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
}

export function formatScore(score: number | null) {
    return score == null ? '–' : score;
}

export function formatEventTime(seconds: number, withPlus: boolean) {
    const sec = (seconds % 60);
    return seconds === null ? '–' : Math.floor(seconds / 60) + (withPlus ? '+' : '') + ' ' + i18n().event_time_abbrv;
}

export function findIndex<T>(array: T[], predicate: (value: T) => boolean, notFoundValue = -1) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (predicate(item)) {
            return i;
        }
    }
    return notFoundValue;
}

export function findLastIndex<T>(array: T[], predicate: (value: T) => boolean, notFoundValue = -1) {
    let index = notFoundValue;
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (predicate(item)) {
            index = i;
        }
    }
    return index;
}

export function setLocale(locale: string) {
    document.cookie = `locale=${locale}; expires=Fri, 1 Jan 2100 00:00:00 UTC; path=/`;
    window.location.href = (window as any).originalLocationHref;
}