declare module '*.scss'
declare module '*.svg'

declare namespace jasmine {
    import ReactElement = React.ReactElement;
    interface Matchers {
        toEqualJSX(el: ReactElement<any>): boolean;
        toIncludeJSX(el: ReactElement<any>): boolean;
    }
}

declare function fetch(...args: any[]): any;

declare function ga(action: string, value: string): void;
declare function requireRoot(module: string): any;