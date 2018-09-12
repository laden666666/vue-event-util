<template>
    <div id="app">
        <Example/>
        <TSExample/>
    </div>
</template>

<script>
import Example from './components/Example'
import TSExample from './components/TSExample.ts'

export default {
    name: 'App',
    components: {
        Example,
        TSExample
    }
}
</script>

<style>
html, body{
    padding: 0;
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
