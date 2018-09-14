import Vue from 'vue'
import Component from 'vue-class-component'
import {throttle, throttleKey} from '../../core/decorator'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    // 所有的组件选项都可以放在这里
    template: `<div>
        <button @click="onClick(0)">Click1</button>
        <button @click="onClickKey(1)(1)">Click2</button>
        <button @click="onClickKey(2)(2)">Click3</button>
        <button @click="onClick(3)">Click4</button>
    </div>`
})
export default class MyComponent extends Vue {
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!'

    // 组件方法也可以直接声明为实例的方法
    @throttle(1000)
    onClick (id: any): void {
        console.log(id)
    }

    @throttleKey(1000)
    onClickKey(key: string) {
        return (id: any)=>{
            console.log(id)
        }
    }
}
