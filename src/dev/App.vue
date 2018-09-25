<template>
    <div id="app">
        <Example/>
    </div>
</template>

<script>
import Example from './components/Example'

export default {
    name: 'App',
    components: {
        Example,
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
