<template>
    <div class="test">
        <button @click="$defer(counting, 1000)(count)" >defer</button>
        <button @click="defer(count)" >defer</button>
        <button @click="$throttle(counting, 1000)(count)" >throttle</button>
        <button @click="throttle(count)" >throttle</button>
        <button @click="$debounce(counting, 1000)(count)" >debounce</button>
        <button @click="$after(counting, 5)(count)" >after</button>
        <button @click="$before(counting, 5)(count)" >before</button>
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
        defer(a){
            this.$defer((a)=>{
                this.counting(a)
            })(a)
        },
        throttle(a){
            this.$throttle((a)=>{
                this.counting(a)
            }, 1000)(a)
        },
        debounce(a){
            console.log(a)
            this.count++
        },
        after(a){
            console.log(a)
            this.count++
        },
        before(a){
            console.log(a)
            this.count++
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
