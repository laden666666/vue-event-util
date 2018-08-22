<template>
    <div class="test">
        <button @click="$eventUtil.fun(test)()">btn</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        test(){
            console.log(1)

            return function(){
                console.log(2)
            }
        }
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
