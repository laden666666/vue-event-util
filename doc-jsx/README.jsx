<doc>
    <title>vue-event-util</title>

    <npm-info version downloads license name="vue-event-util"></npm-info>

    <p><code>vue-event-util</code>, an extension to the Vue event that provides such as <strong>function throttle</strong>, <strong>function debounce</strong>, <strong>function delay </strong>. <code>vue-event-util</code> adds the tool functions of many of the <a href="https://lodash.com/">lodash</a> handlers to the plugin. You can use <code The portable method provided by >vue-event-util</code> applies it to Vue events. </p>

    <h2>Source</h2>
    <p><a href="https://github.com/laden666666/vue-event-util">github</a>，<a href="https://gitee.com/laden666666/vue-event-util">码云</a></p>

    <h2>Features</h2>
    <li>0. Provides <strong>function throttle</strong>, <strong>function debounce</strong>, <strong>function delay </strong> for Vue's event response function </li>
    <li>1. <span> function anti-shake</span> and <span> function throttling</span> for a shared function of a control <strong>all instances</strong></li>
    <li>2. <span> function anti-shake</span> and <span> function throttling</span> for a function of a control <strong>each instance</strong></li>
    <li>3. <strong>List-wrapped control-bound functions</strong><span>function anti-shake</span> and <span> function throttling</span></li>
    <li>4. Implement anti-button combo</li>
    <li>5. Reduce the frequency of incident response</li>
    <li>6. Implementing a delayed event response</li>

    <h2>Compatibility</h2>
    <browser-list Android=">=4.4" Firefox Chrome IE=">=9" iPhone Edge Safari/>

    <h2>Example</h2>
    <p>Prevent the button from clicking continuously for a short time:<a href="https://laden666666.github.io/vue-event-util/ButtonSafe.html">docs/ButtonSafe.html</a><a href="./docs/ButtonSafe.html">View source</a></p>
    <p>Reduce the event trigger frequency:<a href="https://laden666666.github.io/vue-event-util/FrequencyReduction.html">docs/FrequencyReduction.html</a><a href="./docs/FrequencyReduction.html">View source</a></p>
    <p>Delayed execution of events:<a href="https://laden666666.github.io/vue-event-util/Delay.html">docs/Delay.html</a><a href="./docs/Delay.html">View source</a></p>

    <h2>Solved problem</h2>
    <p>When we perform <strong>Currying</strong>, <strong>function throttling</strong>, and <strong>function throttle</strong> on functions, we often need to input the original function and return a processed function. Such as the lodash library for the implementation of throttle:</p>
    <code lang="javascript">{
`fn = _.throttle(fn, 1000)`
    }</code>

    <p>The above processing is not available in Vue's event handler because Vue's event handler does not provide a cached function：</p>
    <code lang="html">{
`<template>
    <button @clikc="_.throttle(fn, 1000)()">throttle</button>
</template>`
    }</code>
    <p>Each time the button is clicked, the _.throttle method is executed once, so the above code is unable to implement the function throttling of the event.</p>

    <p>Another way is to first process the function and bind it to Vue through method name binding or inline processor.</p>
    <code lang="html">{
`<template>
    <button @clikc="fn">throttle</button>
</template>
<script>
    export deflaut {
        methods: {
            fn: _.throttle(function(){
                ...
            }, 1000)
        },
    }
</script>`
    }</code>
    <p>There is also a problem with this type of writing, that is, all controls share a throttling function. When multiple controls need to do function throttling separately, there is no way. And for list rendering, if each control of the list has to do function throttling separately, it is even more troublesome.</p>

    <p><code> VUE-Event util</code> was born to solve this problem.</p>

    <h2>Installation</h2>
    <code lang="javascript">{
    `npm install vue-event-util`
    }</code>
    <p>Then execute in js</p>
    <code lang="javascript">{
`import vueEventUtil from 'vue-event-util'
import Vue from 'vue'

Vue.use(vueEventUtil)`
    }</code>

    <p>In the browser, just import the <strong>vue-event-util.js</strong> file.</p>
    <code lang="html">{
`<script src="vue-event-util.js"></script>
<script>
    Vue.use(vueEventUtil)
</script>`
    }</code>

    <h2>Usage</h2>
    <p><code>vue-event-util</code> provides lodash's <strong>delay</strong>, <strong>throttle</strong>, <strong>debounce</strong> and more.</p>

    <li>delay: Invokes func after wait milliseconds. Any additional arguments are provided to func when it's invoked.</li>
    <li>debounce:Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.</li>
    <li>throttle: Creates a throttled function that only invokes func at most once per every wait milliseconds.</li>
    <p>For the specific usage of the three functions, please refer to <a href="https://lodash.com/docs">lodash</a>.</p>

    <h4>delay</h4>
    <api>{`
    * 延迟 wait 毫秒后调用 callback
    * @param {Function} callback    延迟执行的函数
    * @param {number} wait       延迟的时间，单位毫秒
    * @return {Function}           处理后的函数
    `}</api>
    <h4>debounce</h4>
    <api>{`
    * 创建一个 debounce（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback 方法。
    * @param {Function} callback            需要做防抖函数
    * @param {number} wait                  延迟的时间，单位毫秒
    * @param {object} options               选项对象
    * @param {boolean} options.leading      指定调用在延迟开始前，默认false
    * @param {number} options.maxWait       设置 func 允许被延迟的最大值
    * @param {boolean} options.trailing     指定调用在延迟结束后，默认true
    * @return {Function}                    处理后的函数
    `}</api>
    <h4>throttle</h4>
    <api>{`
    * Creates a throttled function that only invokes func at most once per every wait milliseconds.
    * @param {Function} callback            The function to throttle.
    * @param {number} wait                  The number of milliseconds to throttle invocations to.
    * @param {object} options               The options object.
    * @param {boolean} options.leading      Specify invoking on the leading edge of the timeout.
    * @param {boolean} options.trailing     Specify invoking on the trailing edge of the timeout.(This is different from the default configuration of lodash, mainly because event handling is more often used when the trailing is false)
    * @return {Function}                    Returns the new throttled function.
    `}</api>

    <p>These methods can handle the functions of Vue's controls in three ways:</p>
    <li>1.Global methods</li>
    <li>2.Vue control instance methods</li>
    <li>3.List rendered DOM bound functions</li>

    <h3>Global methods</h3>
    <p><code>vue-event-util</code>提供某控件<strong>所有</strong>实例共享的函数进行上述函数处理，这种使用方法，相当于作用于控件原型上的函数，一旦方法进行了处理后，控件的每一个实例会共享处理后的方法。通过<code>vue-event-util</code>上提供的这些全局处理方法，具体用法如下：</p>

    <code lang="javascript">{
`import eventUtil from 'vue-event-util'
export deflaut {
    methods: {
        delay: eventUtil.delay(function(argument){
            ...
        }, 100),
        throttle: eventUtil.throttle(function(argument){
            ...
        }, 100),
        debounce: eventUtil.debounce(function(argument){
            ...
        }, 100),
    }
}`}</code>

    <h3>控件实例函数</h3>
    <p><code>vue-event-util</code>在Vue实例的原型上提供了上述函数处理，使用原型上的方法去处理函数，处理后的结果是控件实例独享的，针对Vue事件绑定函数的方法不同，<code>vue-event-util</code>提供两种不同的方法：</p>
    <p>可以在方法里面使用$xxx函数里调用的方式，方法名绑定，如</p>
    <code lang="html">{
`<template>
    <div class="test">
        <p>方法里面调用vue-event-util处理函数</P>
        <button @click="delay(count)" >delay2</button>
        <button @click="throttle(count)" >throttle2</button>
        <button @click="debounce(count)" >debounce2</button>
        <p>内联处理器里调用vue-event-util处理函数</P>
        <button @click="$delay(method, 1000)('delay')" >delay</button>
        <button @click="$throttle(method, 1000)('throttle')" >throttle</button>
        <button @click="$debounce(method, 1000)('debounce')" >debounce</button>
    </div>
</template>
<script>
export default {
    methods: {
        method(parameter){
            console.log(parameter)
        },
        //方法里面调用vue-event-util的delay函数
        delay(parameter){
            this.$delay((parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
        //方法里面调用vue-event-util的throttle函数
        throttle(parameter){
            this.$throttle((parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
        //方法里面调用vue-event-util的debounce函数
        debounce(parameter){
            this.$debounce((parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
    },
}
</script>
    `}</code>
    <p>可以在方法里面调用vue-event-util函数：</p>
    <code lang="javascript">{
`export default {
    methods: {
        method(parameter){
            console.log(parameter)
        },
        throttle(parameter){
            //将函数真正的处理逻传入vue-event-util的$throttle函数里，实现对函数节流的效果
            this.$throttle((parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
    }
}
</script>`}</code>
    <p>也可以在内联处理器里调用vue-event-util处理函数：</p>
    <code lang="html">{
`<template>
    <div class="test">
        <button @click="$throttle(method, 1000)('throttle')" >throttle</button>
    </div>
</template>
<script>
export default {
    methods: {
        method(parameter){
            console.log(parameter)
        },
    },
}
</script>
    `}</code>

    <h3>列表渲染函数</h3>
    <p>当出现列表循环的时候，如果希望每一个循环出的元素拥有自己的事件处理函数，可以给每个元素提供一个key，使得各个元素绑定的事件互不干扰，例：</p>
    <code lang="html">{
`<template>
    <div class="test">
        <p>方法里面调用vue-event-util处理函数</P>
        <button v-for="key in 5" :key="key" @click="delay(key, count)" >delay2</button>
        <button v-for="key in 5" :key="key" @click="throttle(key, count)" >throttle2</button>
        <button v-for="key in 5" :key="key" @click="debounce(key, count)" >debounce2</button>
        <p>内联处理器里调用vue-event-util处理函数</P>
        <button v-for="key in 5" :key="key" @click="$delay(key, method, 1000)('delay')" >delay</button>
        <button v-for="key in 5" :key="key" @click="$throttle(key, method, 1000)('throttle')" >throttle</button>
        <button v-for="key in 5" :key="key" @click="$debounce(key, method, 1000)('debounce')" >debounce</button>
    </div>
</template>
<script>
export default {
    methods: {
        method(parameter){
            console.log(parameter)
        },
        //方法里面调用vue-event-util的delay函数
        delay(key, parameter){
            this.$delay(key, (parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
        //方法里面调用vue-event-util的throttle函数
        throttle(key, parameter){
            this.$throttle(key, (parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
        //方法里面调用vue-event-util的debounce函数
        debounce(key, parameter){
            this.$debounce(key, (parameter)=>{
                this.method(parameter)
            }, 1000)(parameter)
        },
    },
}
</script>`}</code>
    <h2>原理</h2>
    <p><code>vue-event-util</code>是如何存对Vue绑定的函数实现<strong>记忆</strong>呢？</p>
    <p>将每一个需要处理的函数toString，然后和其他参数（key，wait，option）一起做一个hash，最后用这个hash值做key将处理后的函数缓存起来。这是一个享元模式，如果hash已经存在就从缓存里面取，如果不存在就对函数进行处理，再缓存。因为如果一个函数的key、wait、option都相同，那这个函数的hash值也相同，所以就可以缓存这个函数了。</p>

   </doc>
