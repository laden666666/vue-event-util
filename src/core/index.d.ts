import './type'
import './debounce'
import Vue from 'vue'

type DecoratorFunction = {
    (time: number): {
        (target: Vue, method: string, descriptor: any): any
    }
}
type VEU = {
    install(vue: Vue, options: any): any,
    version: string,
    throttle: DecoratorFunction
    after: DecoratorFunction
    before: DecoratorFunction
    defer: DecoratorFunction
}

declare const veu: VEU
declare function install(vue: Vue, options: any): any
declare const version: string
declare const debounce: DecoratorFunction
declare const debounceKey: DecoratorFunction
declare const throttle: DecoratorFunction
declare const throttleKey: DecoratorFunction
declare const after: DecoratorFunction
declare const afterKey: DecoratorFunction
declare const before: DecoratorFunction
declare const beforeKey: DecoratorFunction
declare const defer: DecoratorFunction


export default veu
export {
    debounce,
    throttle,
    after,
    before,
    debounceKey,
    throttleKey,
    afterKey,
    beforeKey,
    defer,
}
