import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $delay<T extends Function>(callback: T, wait?: number): T;

        $throttle<T extends Function>(callbackID: string, callback: T, wait?: number): T;
        $throttle<T extends Function>(callback: T, wait?: number): T;

        $debounce<T extends Function>(callbackID: string, callback: T, wait?: number): T;
        $debounce<T extends Function>(callback: T, wait?: number): T;

        $after<T extends Function>(callbackID: string, callback: T, time?: number): T;
        $after<T extends Function>(callback: T, time?: number): T;

        $before<T extends Function>(callbackID: string, callback: Function, time?: number): Function;
        $before<T extends Function>(callback: T, time?: number): T;
    }
}
