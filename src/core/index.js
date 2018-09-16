import _debounce from 'lodash.debounce'
import _throttle from 'lodash.throttle'
import _before from 'lodash.before'
import _after from 'lodash.after'
import _delay from 'lodash.delay'
import hash from 'hash-sum'
import {
    debounce,
    debounceKey,
    defer,
    throttle,
    throttleKey,
    after,
    afterKey,
    before,
    beforeKey
} from './decorator'

// 通过webpack的
const version = PLUGIN_VERSION

function install(Vue, options) {
    Vue.mixin({
        beforeCreate: function (o) {
            //保存注册事件的创建的函数
            this._VEUData = {}
        },
        created: function (o) {
            // 检索每一个函数，通过查看veuData
            var methods = this.$options.methods
            if(methods){
                for(let methodName in methods){
                    let method = methods[methodName]
                    let veuData = method.veuData

                    if(veuData){
                        let {arg, isKeyMethod} = veuData
                        let utilMethodName = veuData.methodName

                        if(isKeyMethod){
                            let fn = this[methodName]
                            this[methodName] = (eventKey)=>{
                                return this['$' + utilMethodName](eventKey, fn(eventKey), arg[0], arg[1])
                            }
                        } else {
                            this[methodName] = this['$' + utilMethodName](method.bind(this), arg[0], arg[1])
                        }
                    }
                }
            }
        },
        beforeDestroy(){
            this._VEUData = null
        },
    })

    /**
     * 用于绑定事件，根据eventKey将fn缓存到对应methodName的map中。这是一个私有函数，不对外暴露
     * @param {*} methodName        工具方法名
     * @param {*} eventKey          函数绑定到事件的key，用于区分不同事件对应的缓存，相当于fn的id
     * @param {*} fn                事件的callback。该函数会缓存起来，要求相同fn使用相同的eventKey，以免重复缓存
     */
    Vue.prototype.$$VEUBind = function(methodName, eventKey, fn){
        // 获取对应methodName的map，用于缓存callback
        var map, veuData = this._VEUData
        if(veuData[methodName]){
            map = veuData[methodName]
        } else {
            veuData[methodName] = map = {}
        }

        // 如果已经缓存了fn，则不再缓存新fn。
        if(map[eventKey]){
            return map[eventKey]
        } else {
            let that = this
            return map[eventKey] = function(...arg){
                fn.call(that, ...arg)
            }
        }
    }

    /**
     * 延时执行函数
     * @param {*} eventKey
     * @param {*} fn
     * @param {*} wait
     */
    Vue.prototype.$defer = function(eventKey, fn, wait = 0){
        if(typeof eventKey === 'function'){
            wait = fn || 0
            fn = eventKey
        }

        return (...arg)=>_delay(fn, wait, ...arg)
    }

    var utilMethodArr = [
        [
            'throttle',
            (fn, wait=0)=>_throttle(fn, wait, {trailing: false})
        ], [
            'debounce',
            _debounce
        ], [
            'after',
            (fn, time=0)=>_after(time, fn)
        ], [
            'before',
            (fn, time=0)=>_before(time, fn)
        ]
    ];

    // 将
    for(let i = 0; i < utilMethodArr.length; i++){
        let utilMethodName = utilMethodArr[i][0],
        utilMethod = utilMethodArr[i][1]

        Vue.prototype['$' + utilMethodName] = function(eventKey, fn, time=0){
            if(typeof eventKey === 'function'){
                time = fn || 0
                fn = eventKey
                eventKey = ''
            }

            eventKey = hash([eventKey, fn.toString(), time])
            return this.$$VEUBind(utilMethodName, eventKey, utilMethod(fn, time))
        }
    }
}

export {
    install,
    hash,
    debounce,
    debounceKey,
    defer,
    throttle,
    throttleKey,
    after,
    afterKey,
    before,
    beforeKey,
    version
}

export default {
    install,
    hash,
    debounce,
    debounceKey,
    defer,
    throttle,
    throttleKey,
    after,
    afterKey,
    before,
    beforeKey,
    version
}
