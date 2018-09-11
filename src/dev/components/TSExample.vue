<template>
    <button @click="onClick">Click!</button>
</template>
<script lang="ts">
import Vue from 'vue'
import {defer} from '../../core/decorator'
export default class MyComponent extends Vue {
    // 初始数据可以直接声明为实例的属性
    message: string = 'Hello!'

    // 组件方法也可以直接声明为实例的方法
    @defer(1000)
    onClick (): void {
        console.log(this.message)
    }
}
</script>

<script>
import {defer} from '../../core/decorator'
export default {
    data () {
        return {
            count: 0
        }
    },
    methods: {
        counting(a){
            console.log(a)
            this.count++
        },
        defer(a){
            this.$defer((a)=>{
                this.counting(a)
            }, 1000)(a)
        },
        defer2: defer(function (a) {
            this.counting(a)
        }, 1000),
        throttle(a){
            this.$throttle((a)=>{
                this.counting(a)
            }, 1000)(a)
        },
        debounce(a){
            this.$debounce((a)=>{
                this.counting(a)
            }, 1000)(a)
        },
        after(a){
            this.$after((a)=>{
                this.counting(a)
            }, 5)(a)
        },
        before(a){
            this.$before((a)=>{
                this.counting(a)
            }, 5)(a)
        },
    },
    components:{
    }
}
</script>

<style scoped>
    .test{
        margin: 0;
        background: #e6e6e6;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
</style>
