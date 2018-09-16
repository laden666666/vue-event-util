import Vue from 'vue'
import Component from 'vue-class-component'
import evu, {debounce, debounceKey} from '../../../src/core'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    // 所有的组件选项都可以放在这里
    template: `<div>
        <button id="btn" @click="click"></button>
        <button id="btn1" @click="clickKey('btn1')()"></button>
        <button id="btn2" @click="clickKey('btn2')()"></button>
    </div>`
})
export class TestDebounce extends Vue {
    clickCount: number = 0

    // 组件方法也可以直接声明为实例的方法
    @debounce(100)
    click (): void {
        this.clickCount++
    }

    @debounceKey(100)
    clickKey(key: string) {
        return (id: any)=>{
            this.clickCount++
        }
    }
}