import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $defer(eventKey: string, fn: Function, wait?: number): any;
        $defer(fn: Function, wait?: number): any;

        $throttle(eventKey: string, fn: Function, wait?: number, options?: {
            leading: boolean,
            trailing: boolean,
        }): any;
        $throttle(fn: Function, wait?: number, options?: {
            leading: boolean,
            trailing: boolean,
        }): any;

        $debounce(eventKey: string, fn: Function, wait?: number, options?: {
            leading: boolean,
            maxWait: number
            trailing: boolean,
        }): any;
        $debounce(fn: Function, wait?: number, options?: {
            leading: boolean,
            maxWait: number
            trailing: boolean,
        }): any;

        $after(eventKey: string, fn: Function, time?: number): any;
        $after(fn: Function, time?: number): any;

        $before(eventKey: string, fn: Function, time?: number): any;
        $before(fn: Function, time?: number): any;
    }
}
