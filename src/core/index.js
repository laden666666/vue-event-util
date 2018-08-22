let uid = 1

function install(Vue, options) {
    Vue.prototype.$throttle = {
        fun(fn){
            fn.$eventUtilID = uid++
            if(this._eventUtilData){
                if(!this._eventUtilData[fn.$eventUtilID + '|' + this._uid]){
                    this._eventUtilData[fn.$eventUtilID + '|' + this._uid] = fn
                }
                return fn
            } else {
                throw new Error('')
            }
        }
    }

    Vue.mixin({
        beforeCreate: function () {
            this._eventUtilData = {}

            console.log(this)
        },
    })
}

export default {
    install
}
