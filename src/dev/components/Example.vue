<template>
    <div class="test">
        <button @click="$defer(counting, 1000)(count)" >defer</button>
        <button @click="defer(count)" >defer2</button>
        <button @click="defer2(count)" >defer3</button>
        <button @click="$throttle(counting, 1000)(count)" >throttle</button>
        <button @click="throttle(count)" >throttle2</button>
        <button @click="$debounce(counting, 1000)(count)" >debounce</button>
        <button @click="debounce(count)" >debounce2</button>
        <button @click="$after(counting, 5)(count)" >after</button>
        <button @click="after(count)" >after</button>
        <button @click="$before(counting, 5)(count)" >before</button>
        <button @click="before(count)" >before</button>
    </div>
</template>

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
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
</style>
