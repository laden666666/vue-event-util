import Vue from 'vue';
import './type';

function definedDecorator(methodName: string, isKeyMethod: boolean, ...arg: any[]){
    return function (target: Vue, method: string, descriptor: any) {
        (target as any)[method].veuData = {
            arg,
            methodName,
            isKeyMethod
        };
        //标记一下该对象是一个使用了veu注解的对象
        (target as any).constructor.prototype['$$isVEU'] = ()=>{}
        return descriptor
    }
}

export function delay(wait: number) {
    return definedDecorator('delay', false, wait)
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
