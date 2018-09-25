import './type'
import Vue from 'vue'

type VEU = {
    install(vue: Vue, options: any): any,
    version: string,
    delay: <T extends Function>(callback: T, wait?: number)=> T
    throttle: <T extends Function>(callback: T, wait?: number, options?:{leading?: boolean, trailing?: boolean})=> T
    debounce: <T extends Function>(callback: T, wait?: number, options?:{leading?: boolean, trailing?: boolean, maxWait?: number})=> T
}

declare const veu: VEU
declare function install(vue: Vue, options: any): any
declare const version: string

export default veu
