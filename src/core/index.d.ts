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
    delay: <T extends Function>(callback: T, wait?: number)=> T
    throttle: <T extends Function>(callback: T, wait?: number)=> T
    debounce: <T extends Function>(callback: T, wait?: number)=> T
    after: <T extends Function>(callback: T, time?: number)=> T
    before: <T extends Function>(callback: T, time?: number)=> T
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
declare const delay: DecoratorFunction


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
    delay,
}
