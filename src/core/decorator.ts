import Vue from 'vue';
import './type';

function definedDecorator(methodName: string, isKeyMethod: boolean, ...arg: any[]){
    return function (target: Vue, method: string, descriptor: any) {
        (target as any)[method].eventUtilData = {
            [methodName]: arg,
            isKeyMethod
        }
        return descriptor
    }
}

export function defer(wait: number) {
    return definedDecorator('defer', false, wait)
}
export function deferKey(wait: number) {
    return definedDecorator('defer', true, wait)
}
export function throttle(wait?: number, options?: {
    leading: boolean,
    trailing: boolean,
}) {
    return definedDecorator('throttle', false, wait, options)
}
export function throttleKey(wait?: number, options?: {
    leading: boolean,
    trailing: boolean,
}) {
    return definedDecorator('throttle', true, wait, options)
}
export function debounce(wait?: number, options?: {
    leading: boolean,
    trailing: boolean,
    maxWait: number
}) {
    return definedDecorator('debounce', false, wait, options)
}
export function debounceKey(wait?: number, options?: {
    leading: boolean,
    trailing: boolean,
    maxWait: number
}) {
    return definedDecorator('debounce', true, wait, options)
}

export function after(time: number) {
    return definedDecorator('after', false, time)
}
export function afterKey(time: number) {
    return definedDecorator('after', true, time)
}
export function before(time: number) {
    return definedDecorator('before', false, time)
}
export function beforeKey(time: number) {
    return definedDecorator('before', true, time)
}
