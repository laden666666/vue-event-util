export function defer(fn, wait) {

    if(typeof fn === 'function'){
        fn.eventUtilData = {
            defer: [wait]
        }
        return fn
    }

    return function (target, method, descriptor) {
        method.eventUtilData = {
            defer: [wait]
        }
        return descriptor
    }
}
