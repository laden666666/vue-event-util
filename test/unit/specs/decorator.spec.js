import Vue from 'vue'
import Defer from './Defer'
import eventUtil from '../../../src/core'
import {TestThrottle} from './TestThrottle'
import {TestDelay} from './TestDelay'
import {TestDebounce} from './TestDebounce'
import {TestAfter} from './TestAfter'
import {TestBefore} from './TestBefore'

Vue.use(eventUtil)

describe('vue-event-util', () => {
    it('delay注解测试', async () => {
        var defer1 = new Defer
        var defer2 = new Defer

        var time = Date.now()

        // 要求click在100毫秒后执行，这样setTimeout不会被清空
        setTimeout(()=>{
            if(vm.$refs.test.time == 0){
                defer2.resolve()
            } else {
                defer2.reject()
            }
        }, 90)

        const Constructor = Vue.extend({
            template: '<TestDelay ref="test"/>',
            components:{
                TestDelay
            }
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            button.click()
        })
        setTimeout(()=>{
            if(vm.$refs.test.time - time >= 1000){
                defer1.resolve()
            } else {
                defer1.reject()
            }
        }, 1100)
        await Promise.all([defer1.promise, defer2.promise])
    })
    it('throttle注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestThrottle ref="test"/>',
            components:{
                TestThrottle
            }
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
            if(vm.$refs.test.clickCount == 1){
                defer1.resolve()
            } else {
                defer1.reject()
            }
        }, 100)

        await defer1.promise
    })
    it('throttleKey注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestThrottle ref="test"/>',
            components:{
                TestThrottle
            }
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
            if(vm.$refs.test.clickCount == 2){
                defer1.resolve()
            } else {
                defer1.reject()
            }
        }, 100)

        await defer1.promise
    })
    it('debounce注解注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestDebounce ref="test"/>',
            components:{
                TestDebounce
            }
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
            if(vm.$refs.test.clickCount != 0){
                defer1.reject()
            }
        }, 90)

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.$refs.test.clickCount != 1){
                defer1.reject()
            } else {
                defer1.resolve()
            }
        }, 150)

        await defer1.promise
    })
    it('debounceKey注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestDebounce ref="test"/>',
            components:{
                TestDebounce
            }
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
            if(vm.$refs.test.clickCount != 0){
                defer1.reject()
            }
        }, 90)

        setTimeout(()=>{
            //虽然点击3次，但是仅一次生效
            if(vm.$refs.test.clickCount != 2){
                defer1.reject()
            } else {
                defer1.resolve()
            }
        }, 150)

        await defer1.promise
    })
    it('after注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestAfter ref="test"/>',
            components:{
                TestAfter
            }
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount == 1){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('afterKey注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestAfter ref="test"/>',
            components:{
                TestAfter
            }
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //模拟点击3次
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 0){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount == 2){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })

    it('before注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestBefore ref="test"/>',
            components:{
                TestBefore
            }
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button = vm.$el.querySelector('button')
            //模拟点击3次
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button.click()
                if(vm.$refs.test.clickCount == 2){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })
    it('beforeKey注解测试', async () => {
        var defer1 = new Defer
        const Constructor = Vue.extend({
            template: '<TestBefore ref="test"/>',
            components:{
                TestBefore
            }
        })
        var div = document.createElement('div')
        const vm = new Constructor().$mount(div)
        setTimeout(()=>{
            let button1 = vm.$el.querySelector('#btn1')
            let button2 = vm.$el.querySelector('#btn2')
            //模拟点击3次
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 1){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button1.click()
                if(vm.$refs.test.clickCount != 2){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount != 3){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount != 4){
                    defer1.reject()
                }
            }, 0)
            setTimeout(()=>{
                button2.click()
                if(vm.$refs.test.clickCount == 4){
                    defer1.resolve()
                } else {
                    defer1.reject()
                }
            }, 0)
        })

        await defer1.promise
    })

})
