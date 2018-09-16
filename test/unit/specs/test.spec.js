import Vue from 'vue'
import Defer from './Defer'
import eventUtil from '../../../src/core'

Vue.use(eventUtil)

describe('vue-event-util', () => {
    it('defer测试', async () => {
        var defer1 = new Defer
        var defer2 = new Defer

        // 要求click在100毫秒后执行，这样setTimeout不会被清空
        var clearID = setTimeout(()=>{
            defer2.resolve()
        }, 90)

        const Constructor = Vue.extend({
            methods: {
                click(){
                    this.$defer(()=>{
                        defer1.resolve()
                        clearTimeout(clearID)
                    }, 100)()
                }
            },
            template:
                `<div>
                    <button id="btn" @click="click"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            button.click()
        })
        await Promise.all([defer1.promise, defer2.promise])
    })
    it('defer测试，表达式方式', async () => {
        var defer1 = new Defer
        var defer2 = new Defer

        var clearID = setTimeout(()=>{
            defer2.resolve()
        }, 90)

        const Constructor = Vue.extend({
            methods: {
                click(){
                    defer1.resolve()
                    clearTimeout(clearID)
                }
            },
            template:
                `<div>
                    <button id="btn" @click="$defer(click, 100)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            button.click()
        })
        await Promise.all([defer1.promise, defer2.promise])
    })
    it('throttle测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.$throttle(()=>{
                        this.clickCount++
                    }, 100)()
                }
            },
            template:
                `<div>
                    <button id="btn" @click="click"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount == 1){
                defer1.resolve()
            }
        }, 100)

        await defer1.promise
    })
    it('throttle测试，表达式方式', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn" @click="$throttle(click, 100)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount == 1){
                defer1.resolve()
            }
        }, 100)

        await defer1.promise
    })
    it('throttle测试，带callbackID', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn1" @click="$throttle('btn1', click, 100)()"></button>
                    <button id="btn2" @click="$throttle('btn2', click, 100)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //模拟分别点击按钮2次
            setTimeout(()=>{
                button1.click()
            }, 0)
            setTimeout(()=>{
                button2.click()
            }, 0)
            setTimeout(()=>{
                button1.click()
            }, 0)
            setTimeout(()=>{
                button2.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击4次，但是仅两次生效
            if(vm.clickCount == 2){
                defer1.resolve()
            }
        }, 100)

        await defer1.promise
    })
    it('debounce测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.$debounce(()=>{
                        this.clickCount++
                    }, 100)()
                }
            },
            template:
                `<div>
                    <button id="btn" @click="click"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 0){
                defer1.reject()
            }
        }, 90)

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 1){
                defer1.reject()
            } else {
                defer1.resolve()
            }
        }, 150)

        await defer1.promise
    })
    it('debounce测试，表达式方式', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn" @click="$debounce(click, 100)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
            setTimeout(()=>{
                button.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 0){
                defer1.reject()
            }
        }, 90)

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 1){
                defer1.reject()
            } else {
                defer1.resolve()
            }
        }, 150)

        await defer1.promise
    })
    it('debounce测试，带callbackID', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn1" @click="$debounce('btn1', click, 100)()"></button>
                    <button id="btn2" @click="$debounce('btn2', click, 100)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //虽然点击4次，但是仅两次生效
            setTimeout(()=>{
                button1.click()
            }, 0)
            setTimeout(()=>{
                button2.click()
            }, 0)
            setTimeout(()=>{
                button1.click()
            }, 0)
            setTimeout(()=>{
                button2.click()
            }, 0)
        })

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 0){
                defer1.reject()
            }
        }, 90)

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.clickCount != 2){
                defer1.reject()
            } else {
                defer1.resolve()
            }
        }, 150)

        await defer1.promise
    })
    it('after测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.$after(()=>{
                        this.clickCount++
                    }, 3)()
                }
            },
            template:
                `<div>
                    <button id="btn" @click="click"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount == 1){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('after测试，表达式方式', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn" @click="$after(click, 3)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount == 1){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('after测试，带callbackID', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn1" @click="$after('btn1', click, 3)()"></button>
                    <button id="btn2" @click="$after('btn2', click, 3)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //模拟点击3次
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount == 2){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })

    it('before测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.$before(()=>{
                        this.clickCount++
                    }, 3)()
                }
            },
            template:
                `<div>
                    <button id="btn" @click="click"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount == 2){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('before测试，表达式方式', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn" @click="$before(click, 3)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.clickCount == 2){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('before测试，带callbackID', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            data: function(){
                return {
                    clickCount: 0
                }
            },
            methods: {
                click(){
                    this.clickCount++
                }
            },
            template:
                `<div>
                    <button id="btn1" @click="$before('btn1', click, 3)()"></button>
                    <button id="btn2" @click="$before('btn2', click, 3)()"></button>
                </div>`
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //模拟点击3次
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount != 3){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount != 4){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.clickCount == 4){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })

})
