import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import before from 'lodash.before'
import after from 'lodash.after'
import delay from 'lodash.delay'
import hash from 'object-hash'

// 通过webpack的
const version = PLUGIN_VERSION

function install(Vue, options) {
    Vue.mixin({
        beforeCreate: function (o) {
            //保存注册事件的创建的函数
            this._eventUtilData = {}
        },
        created: function (o) {

            if(this.$options.methods){
                Object.keys(this.$options.methods).forEach(methodName=>{
                    if(this.$options.methods[methodName].eventUtilData){
                        let method = this.$options.methods[methodName]
                        var eventUtilData = method.eventUtilData
                        if(eventUtilData.isKeyMethod){
                            let fn = this[methodName]
                            var key = Object.keys(eventUtilData)[0]
                            this[methodName] = (eventKey)=>{
                                return this['$' + key](eventKey, fn(eventKey), ...eventUtilData[key])
                            }
                        } else {
                            var key = Object.keys(eventUtilData)[0]
                            this[methodName] = this['$' + key](method.bind(this), ...eventUtilData[key])
                        }
                    }
                })
            }
        },
        beforeDestroy(){
            this._eventUtilData = null
        },
    })

    /**
     * 用于绑定事件，根据eventKey将fn缓存到对应methodName的map中。这是一个私有函数，不对外暴露
     * @param {*} methodName        工具方法名
     * @param {*} eventKey          函数绑定到事件的key，用于区分不同事件对应的缓存，相当于fn的id
     * @param {*} fn                事件的callback。该函数会缓存起来，要求相同fn使用相同的eventKey，以免重复缓存
     */
    Vue.prototype.$$eventBind = function(methodName, eventKey, fn){
        // 获取对应methodName的map，用于缓存callback
        var map
        if(this._eventUtilData[methodName]){
            map = this._eventUtilData[methodName]
        } else {
            this._eventUtilData[methodName] = map = {}
        }

        // 如果已经缓存了fn，则不再缓存新fn。
        if(map[eventKey]){
            return map[eventKey]
        } else {
            var that = this
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

        return (...arg)=>delay(fn, wait, ...arg)
    }

    Vue.prototype.$throttle = function(eventKey, fn, wait=0, options={}){
        if(typeof eventKey === 'function'){
            options = wait || {}
            wait = fn || 0
            fn = eventKey
            eventKey = ''
        }
        options = {trailing: false, ...options}
        eventKey = hash([eventKey, fn.toString(), wait, options])
        return this.$$eventBind('throttle', eventKey, throttle(fn, wait, options))
    }

    Vue.prototype.$debounce = function(eventKey, fn, wait=0, options={}){
        if(typeof eventKey === 'function'){
            options = wait || {}
            wait = fn || 0
            fn = eventKey
            eventKey = ''
        }
        eventKey = hash([eventKey, fn.toString(), wait, options])
        return this.$$eventBind('debounce', eventKey, debounce(fn, wait, options))
    }

    Vue.prototype.$after = function(eventKey, fn, time=0){
        if(typeof eventKey === 'function'){
            time = fn || 0
            fn = eventKey
            eventKey = ''
        }
        eventKey = hash([eventKey, fn.toString(), time])
        return this.$$eventBind('after', eventKey, after(time, fn))
    }

    Vue.prototype.$before = function(eventKey, fn, time=0){
        if(typeof eventKey === 'function'){
            time = fn || 0
            fn = eventKey
            eventKey = ''
        }
        eventKey = hash([eventKey, fn.toString(), time])
        return this.$$eventBind('before', eventKey, before(time, fn))
    }
}

export default {
    install
}
