export class UserNavigator {
    protected ua: string;
    isAndroid: boolean;
    isIOS: boolean;
    isIPad: boolean;
    isAnyMobile: boolean;

    setUserAgent(ua: string) {
        this.ua = ua || 'Chrome';
        this.isAndroid = /\bAndroid\b/.test(ua);
        this.isIOS = /(iPhone|iPos|IPad)/.test(ua);
        this.isIPad = /(IPad)/.test(ua);
        this.isAnyMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    }
}
