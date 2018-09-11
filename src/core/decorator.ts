export type eventUtilFn = {(...arg: any[]): any, eventUtilData: any}

export function defer(fn: eventUtilFn | number, wait?: number) {

    if(typeof fn === 'function'){
        fn.eventUtilData = {
            defer: [wait]
        }
        return fn
    } else {
        wait = fn
    }

    return function (target: any, method: string, descriptor: any) {

        target[method].eventUtilData = {
            defer: [wait]
        }
        return descriptor
    }
}
