<doc>
    <title>vue-event-util</title>

    <npm-info version downloads license name="vue-event-util"></npm-info>

    <p><strong>vue-event-util</strong>，是一个扩展Vue事件的扩展插件，为Vue的事件提供了如<strong>函数节流</strong>、<strong>函数防抖</strong>、<strong>函数延时</strong>等功能。<strong>vue-event-util</strong>针对于这一情况，将<a href="https://lodash.com/">lodash</a>的很多处理函数的工具函数加入到插件中，大家可用使用<strong>vue-event-util</strong>提供的便携方法将其应用到Vue的事件中。</p>

    <h2>源码</h2>
    <p><a href="https://github.com/laden666666/vue-event-util">github</a>，<a href="https://gitee.com/laden666666/vue-event-util">码云</a></p>

    <h2>功能</h2>
    <li>对Vue的事件响应函数提供函数防抖、函数节流、延时执行等函数处理功能</li>
    <li>控件所有实例共享的事件函数处理</li>
    <li>控件实例独享的事件函数处理</li>
    <li>列表渲染的控件独享的事件函数处理</li>
    <li>实现防止按钮连击</li>
    <li>实现降低事件响应频率</li>
    <li>对typescript的支持</li>

    <h2>兼容性</h2>
    <browser-list Android=">=4.4" Firefox Chrome IE=">=9" iPhone Edge Safari/>

    <h2>插件解决的问题</h2>
    <p>当我们对函数进行<strong>柯里化</strong>、<strong>函数节流</strong>、<strong>函数防抖</strong>处理的时候，往往需要使用到高级函数语法，将原有函数传入通过以入参传入，并以返回值的形式返回的处理后的函数。如lodash库对函数防抖的实现：</p>
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
    <p>方法是死的人是活的，我们肯定能找到更优雅的方式来做函数节流或者其他类似的事情。<strong>vue-event-util</strong>就是为了解决这个事情而生的。</p>

    <h2>安装</h2>
    <code lang="javascript">{
    `npm install vue-event-util`
    }</code>
    <p>在浏览器环境中，直接将<strong>vue-event-util.js</strong>文件引入即可。</p>
    <code lang="html">{
    `<script src="vue-event-util.js"></script>`
    }</code>

    <h2>使用</h2>
    <p>具体的使用方法可以参考<a>xxx</a>，这里仅是简单介绍一下<strong>vue-event-util</strong>常用使用方式</p>
    <p><strong>vue-event-util</strong>提供了<strong>delay</strong>、<strong>throttle</strong>、<strong>debounce</strong>、<strong>after</strong>、<strong>before</strong>等方法</p>

    <li>delay: 延迟 wait 毫秒后调用 func</li>
    <li>debounce: 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。</li>
    <li>throttle: 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数</li>
    <li>after: 此方法创建一个函数，当他被调用n或更多次之后将马上触发func</li>
    <li>before: 创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次。</li>

    <h3>全局函数方法</h3>
    <p><strong>vue-event-util</strong>提供了类似lodash的函数处理方法，这种使用方法，相当于作用于原型上的函数，一旦方法进行了处理后，控件的每一个实例会共享处理后的方法，具体用法：</p>

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
        after: eventUtil.after(function(argument){
            ...
        }, 3),
        before: eventUtil.before(function(argument){
            ...
        }, 3),
    }
}
`}</code>

    <h4>eventUtil.delay</h4>
    <api>{`
    * 延迟 wait 毫秒后调用 callback
    * @param {Function} callback    延迟执行的函数
    * @param {number} wait       延迟的时间，单位毫秒
    * @return {Function}           处理后的函数
    `}</api>
    <h4>eventUtil.debounce</h4>
    <api>{`
    * 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback 方法。
    * @param {Function} callback    需要做防抖函数
    * @param {number} wait        延迟的时间，单位毫秒
    * @return {Function}           处理后的函数
    `}</api>
    <h4>eventUtil.throttle</h4>
    <api>{`
    * 创建一个节流函数，在 wait 秒内最多执行 callback 一次的函数
    * @param {Function} callback    需要做节流函数
    * @param {number} wait       节流时间，单位毫秒
    * @return {Function}           处理后的函数
    `}</api>
    <h4>eventUtil.after</h4>
    <api>{`
    * 此方法创建一个函数，当他被调用n或更多次之后将马上触发callback
    * @param {Function} callback    用来限定的函数
    * @param {number} n           方法应该在调用多少次后才执行
    * @return {Function}           处理后的函数
    `}</api>
    <h4>eventUtil.before</h4>
    <api>{`
    * 创建一个调用func的函数，通过this绑定和创建函数的参数调用callback，调用次数不超过 n 次
    * @param {Function} callback    用来限定的函数
    * @param {number} n           超过多少次不再调用callback
    * @return {Function}           处理后的函数
    `}</api>

</doc>
