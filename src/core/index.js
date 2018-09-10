import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import before from 'lodash.before'
import after from 'lodash.after'
import delay from 'lodash.delay'
var hash = require('object-hash')

window.throttle = throttle

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
                        var key = Object.keys(eventUtilData)[0]
                        this[methodName] = this['$' + key](method.bind(this), ...eventUtilData[key])
                    }
                })
            }
        },
        beforeDestroy(){
            this._eventUtilData = null
        },
    })

    Vue.prototype.$$eventBind = function(name, eventKey, fn){
        var map
        if(this._eventUtilData[name]){
            map = this._eventUtilData[name]
        } else {
            this._eventUtilData[name] = map = {}
        }

        if(map[eventKey]){
            return map[eventKey]
        } else {
            var that = this
            return map[eventKey] = function(...arg){
                fn.call(that, ...arg)
            }
        }
    }

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
