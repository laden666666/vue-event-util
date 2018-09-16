import Vue from 'vue'
import Component from 'vue-class-component'
import evu, {defer} from '../../../src/core'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    // 所有的组件选项都可以放在这里
    template: `<div>
        <button id="btn" @click="click"></button>
    </div>`
})
export class TestDefer extends Vue {
    time: number = 0

    // 组件方法也可以直接声明为实例的方法
    @defer(1000)
    click (): void {
        this.time = Date.now()
    }
}
