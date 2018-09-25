import _debounce from 'lodash.debounce'
import __throttle from 'lodash.throttle'
import _delay from 'lodash.delay'

const _throttle = (fn, wait=0, options={})=>__throttle(fn, wait, {
    leading: options.leading != null ? options.leading : true,
    trailing: !!options.trailing,
})

import hash from 'hash-sum'

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
            // 如果该对象使用了veu注解，则对齐方法初始化，这样不使用该注解的方法无需循环，增加效率
            if(methods && this.$$isVEU){
                for(let methodName in methods){
                    let method = methods[methodName]
                    let veuData = method.veuData

                    //根据方法是否配置了veuData，进行veu初始化
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
    Vue.prototype.$delay = function(eventKey, fn, wait = 0, options){
        if(typeof eventKey === 'function'){
            wait = fn || 0
            fn = eventKey
        }

        return (...arg)=>_delay(fn, wait, ...arg)
    }

    var utilMethodArr = [
        [
            'throttle',
            _throttle,
        ], [
            'debounce',
            _debounce,
        ],
    ];

    // 将
    for(let i = 0; i < utilMethodArr.length; i++){
        let utilMethodName = utilMethodArr[i][0],
        utilMethod = utilMethodArr[i][1]

        Vue.prototype['$' + utilMethodName] = function(eventKey, fn, time=0, options={}){
            if(typeof eventKey === 'function'){
                options = time || {}
                time = fn || 0
                fn = eventKey
                eventKey = ''
            }

            eventKey = hash([eventKey, fn.toString(), time])
            return this.$$VEUBind(utilMethodName, eventKey, utilMethod(fn, time))
        }
    }
}

export default {
    install,
    version,
    debounce: _debounce,
    throttle: _throttle,
    delay: _delay,
}
