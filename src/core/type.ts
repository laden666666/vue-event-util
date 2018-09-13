import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $defer(callbackID: string, callback: Function, wait?: number): any;
        $defer(callback: Function, wait?: number): any;

        $throttle(callbackID: string, callback: Function, wait?: number): any;
        $throttle(callback: Function, wait?: number): any;

        $debounce(callbackID: string, callback: Function, wait?: number): any;
        $debounce(callback: Function, wait?: number): any;

        $after(callbackID: string, callback: Function, time?: number): any;
        $after(callback: Function, time?: number): any;

        $before(callbackID: string, callback: Function, time?: number): any;
        $before(callback: Function, time?: number): any;
    }
}
