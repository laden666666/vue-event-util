import Vue from 'vue';
import './type';

function definedDecorator(methodName: string, isKeyMethod: boolean, ...arg: any[]){
    return function (target: Vue, method: string, descriptor: any) {
        (target as any)[method].veuData = {
            arg,
            methodName,
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
export function throttle(wait?: number) {
    return definedDecorator('throttle', false, wait)
}
export function throttleKey(wait?: number) {
    return definedDecorator('throttle', true, wait)
}
export function debounce(wait?: number) {
    return definedDecorator('debounce', false, wait)
}
export function debounceKey(wait?: number) {
    return definedDecorator('debounce', true, wait)
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
