<doc>
    <title>vue-event-util</title>

    <npm-info version downloads license name="vue-event-util"></npm-info>

    <p><code>vue-event-util</code>，是一个扩展Vue事件的扩展插件，为Vue的事件提供了如<strong>函数节流（throttle）</strong>、<strong>函数防抖（debounce）</strong>、<strong>函数延时（delay）</strong>等扩展功能。<code>vue-event-util</code>将<a href="https://lodash.com/">lodash</a>的很多处理函数的工具函数加入到插件中，大家可用使用<code>vue-event-util</code>提供的便携方法将其应用到Vue的事件中。</p>

    <h2>源码</h2>
    <p><a href="https://github.com/laden666666/vue-event-util">github</a>，<a href="https://gitee.com/laden666666/vue-event-util">码云</a></p>

    <h2>功能</h2>
    <li>对Vue的事件响应函数提供<strong>函数防抖（throttle）</strong>、<strong>函数节流（debounce）</strong>、<strong>延时执行（delay）</strong>等函数处理功能</li>
    <li>0.对某控件<strong>所有</strong>实例共享的函数进行<span>函数防抖</span>和<span>函数节流</span></li>
    <li>1.对某控件<strong>各个</strong>实例共享的函数进行<span>函数防抖</span>和<span>函数节流</span></li>
    <li>2.对<strong>列表渲染的控件</strong>进行<span>函数防抖</span>和<span>函数节流</span></li>
    <li>3.实现防止按钮连击</li>
    <li>4.实现降低事件响应频率</li>

    <h2>兼容性</h2>
    <browser-list Android=">=4.4" Firefox Chrome IE=">=9" iPhone Edge Safari/>

    <h2>插件解决的问题</h2>
    <p>当我们对函数进行<strong>柯里化</strong>、<strong>函数节流</strong>、<strong>函数防抖</strong>处理的时候，往往需要将原有函数以入参传入，并以返回函数的形式返回处理后的函数。如lodash库对函数防抖的实现：</p>
    <code lang="javascript">{
`fn = _.throttle(fn, 1000)`
    }</code>

    <p>但是这个处理对于Vue的template语法中的事件响应函数来说，实现起来很麻烦，我们以做<strong>函数防抖</strong>为例，看看我们以往在Vue中是如何实现上述操作的。Vue的事件绑定有两种方法：<a href="https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95">方法名绑定</a>和<a href="https://cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95">内联处理器</a>。
    <strong>内联处理器</strong>允许我们提供一个表达式处理事件，因为Vue会生成一个匿名函数去执行绑定的表达式，每一次事件处理时候都会执行一次这个匿名函数，因此无法实现如<strong>函数节流</strong>、<strong>函数防抖</strong>这样的功能。</p>
    <code lang="html">{
`<template>
    <button @clikc="_.throttle(fn, 1000)()">函数节流</button>
</template>`
    }</code>
    <p>因为每一次点击都会执行一次_.throttle方法，所以上述代码是无法实现对事件的函数节流处理的。</p>

    <p>另一种方法是先将函数进行处理，再通过方法名绑定或者内联处理器的方式绑定到Vue上面。</p>
    <code lang="html">{
`<template>
    <button @clikc="fn">函数节流</button>
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
    <p>这样写也存在一个问题，就是所有控件公用一个节流函数，当多个控件需要单独做函数节流的话就没有办法了。而且在列表渲染，如果列表的每一个控件都要单独做函数节流处理，这样就更麻烦了。</p>
    <p>有时候我们甚至会借助watch来实现函数节流的功能。如：</p>
<code lang="html">{
`<template>
    <button @clikc="fn">函数节流</button>
</template>
<script>
    export deflaut {
        created() {
            this.$watch('clickTime', _.throttle(() => {
                ...
            }, 200))
        }
        data: {
            clickTime: 0,
        }
        methods: {
            fn: function(){
                this.clickTime++
            }
        },
    }
</script>`
}</code>
    <p>方法是死的人是活的，我们肯定能找到更优雅的方式来做函数节流或者其他类似的事情。<code>vue-event-util</code>就是为了解决这个事情而生的。</p>

    <h2>安装</h2>
    <code lang="javascript">{
    `npm install vue-event-util`
    }</code>
    <p>然后在js中执行</p>
    <code lang="javascript">{
`import vueEventUtil from 'vue-event-util'
import Vue from 'vue'

Vue.use(vueEventUtil)`
    }</code>

    <p>在浏览器环境中，直接将<strong>vue-event-util.js</strong>文件引入即可。</p>
    <code lang="html">{
`<script src="vue-event-util.js"></script>
<script>
    Vue.use(vueEventUtil)
</script>`
    }</code>

    <h2>使用</h2>
    <p>具体的使用方法可以参考<a>xxx</a>，这里仅是简单介绍一下<code>vue-event-util</code>常用使用方式</p>
    <p><code>vue-event-util</code>提供了lodash的<strong>delay</strong>、<strong>throttle</strong>、<strong>debounce</strong>等方法</p>

    <li>delay: 延迟 wait 毫秒后调用 func</li>
    <li>debounce: 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。</li>
    <li>throttle: 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数</li>
    <p>三种函数具体用法可以参考<a href="https://lodash.com/docs">lodash</a>。</p>

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
    * 创建一个节流函数，在 wait 秒内最多执行 callback 一次的函数
    * @param {Function} callback    需要做节流函数
    * @param {number} wait       节流时间，单位毫秒
    * @param {object} options               选项对象
    * @param {boolean} options.leading      指定调用在节流开始前，默认true
    * @param {boolean} options.trailing     指定调用在节流结束后，默认false（与lodash默认配置不同，主要是因为事件处理更常用trailing为false的情况，如防止按钮连击）
    * @return {Function}           处理后的函数
    `}</api>

    <p>这些方法可以通过3种方式对Vue控件的函数进行处理：</p>
    <li>1.全局函数</li>
    <li>2.控件实例函数</li>
    <li>3.列表渲染函数</li>

    <h3>全局函数</h3>
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
    <p><code>vue-event-util</code>是如何存储处理后的函数的呢？</p>
    <p><code>vue-event-util</code>将每一个需要处理的函数toString，然后和其他参数（key，wait，option）一起做一个hash，最后用这个hash值做key将处理后的函数缓存起来。这是一个享元模式，如果hash已经存在就从缓存里面取，如果不存在就对函数进行处理，再缓存。因为如果一个函数的key、wait、option都相同，那这个函数的hash值也相同，所以就可以缓存这个函数了。</p>

    <h2>例子</h2>
    <p>防止按钮连击：</p>
    <p>事件降频触发：</p>
    <p>事件延时触发：</p>
</doc>
