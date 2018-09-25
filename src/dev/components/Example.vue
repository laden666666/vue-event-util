<template>
    <div class="test">
        <button @click="$delay(counting, 1000)(count)" >delay</button>
        <button @click="delay(count)" >delay2</button>
        <button @click="$throttle(counting, 1000)(count)" >throttle</button>
        <button @click="throttle(count)" >throttle2</button>
        <button @click="$debounce(counting, 1000)(count)" >debounce</button>
        <button @click="debounce(count)" >debounce2</button>
    </div>
</template>
<script>
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
        delay(a){
            this.$delay((a)=>{
                this.counting(a)
            }, 1000)(a)
        },
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
