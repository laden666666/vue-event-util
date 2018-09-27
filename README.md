<h1 align="center">vue-event-util</h1>
<p class="mydoc_api_npm-info" align="center">
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/v/vue-event-util.svg" alt="Version"></a>
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/dm/vue-event-util.svg" alt="Downloads"></a>
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/l/vue-event-util.svg" alt="License"></a>
        </p>

`vue-event-util`，是一个扩展Vue事件的扩展插件，为Vue的事件提供了如**函数节流（throttle）**、**函数防抖（debounce）**、**函数延时（delay）**等扩展功能。`vue-event-util`将[lodash](https://lodash.com/ "") 的很多处理函数的工具函数加入到插件中，大家可用使用`vue-event-util`提供的便携方法将其应用到Vue的事件中。


## 源码

[github](https://github.com/laden666666/vue-event-util "") ，[码云](https://gitee.com/laden666666/vue-event-util "") 



## 功能
*   对Vue的事件响应函数提供**函数防抖（throttle）**、**函数节流（debounce）**、**延时执行（delay）**等函数处理功能
*   0.对某控件**所有**实例共享的函数进行函数防抖和函数节流
*   1.对某控件**各个**实例共享的函数进行函数防抖和函数节流
*   2.对**列表渲染的控件**进行函数防抖和函数节流
*   3.实现防止按钮连击
*   4.实现降低事件响应频率


## 兼容性
<center>
    <table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
        <colgroup width="100" span="7" align="center"></colgroup>
        <tr style="height: 30px;">
            <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">IE</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
        </tr>
        <tr style="color: #000;line-height: 28px;font-weight: bold;">
            <td align="center" style="background-color: #60d848">>=4.4</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">>=9</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
        </tr>
    </table>
</center>



## 插件解决的问题

当我们对函数进行**柯里化**、**函数节流**、**函数防抖**处理的时候，往往需要将原有函数以入参传入，并以返回函数的形式返回处理后的函数。如lodash库对函数防抖的实现：

```javascript
fn = _.throttle(fn, 1000)
```

但是这个处理对于Vue的template语法中的事件响应函数来说，实现起来很麻烦，我们以做**函数防抖**为例，看看我们以往在Vue中是如何实现上述操作的。Vue的事件绑定有两种方法：[方法名绑定](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95 "") 和[内联处理器](https://cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95 "") 。**内联处理器**允许我们提供一个表达式处理事件，因为Vue会生成一个匿名函数去执行绑定的表达式，每一次事件处理时候都会执行一次这个匿名函数，因此无法实现如**函数节流**、**函数防抖**这样的功能。

```html
<template>
    <button @clikc="_.throttle(fn, 1000)()">函数节流</button>
</template>
```

因为每一次点击都会执行一次_.throttle方法，所以上述代码是无法实现对事件的函数节流处理的。


另一种方法是先将函数进行处理，再通过方法名绑定或者内联处理器的方式绑定到Vue上面。

```html
<template>
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
</script>
```

这样写也存在一个问题，就是所有控件公用一个节流函数，当多个控件需要单独做函数节流的话就没有办法了。而且在列表渲染，如果列表的每一个控件都要单独做函数节流处理，这样就更麻烦了。


有时候我们甚至会借助watch来实现函数节流的功能。如：

```html
<template>
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
</script>
```

方法是死的人是活的，我们肯定能找到更优雅的方式来做函数节流或者其他类似的事情。`vue-event-util`就是为了解决这个事情而生的。



## 安装
```javascript
npm install vue-event-util
```

然后在js中执行

```javascript
import vueEventUtil from 'vue-event-util'
import Vue from 'vue'

Vue.use(vueEventUtil)
```

在浏览器环境中，直接将**vue-event-util.js**文件引入即可。

```html
<script src="vue-event-util.js"></script>
<script>
    Vue.use(vueEventUtil)
</script>
```


## 使用

具体的使用方法可以参考[xxx]( "") ，这里仅是简单介绍一下`vue-event-util`常用使用方式


`vue-event-util`提供了lodash的**delay**、**throttle**、**debounce**等方法

*   delay: 延迟 wait 毫秒后调用 func
*   debounce: 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。
*   throttle: 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数

三种函数具体用法可以参考[lodash](https://lodash.com/docs "") 。


#### delay

>
延迟 wait 毫秒后调用 callback


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|callback|Function|延迟执行的函数|
|wait|number|延迟的时间，单位毫秒|



##### 返回值
|参数类型|参数说明|
|-|-|
|Function|处理后的函数|



#### debounce

>
创建一个 debounce（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback 方法。


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|callback|Function|需要做防抖函数|
|wait|number|延迟的时间，单位毫秒|
|options|object|选项对象|
|options.leading|boolean|指定调用在延迟开始前，默认false|
|options.maxWait|number|设置 func 允许被延迟的最大值|
|options.trailing|boolean|指定调用在延迟结束后，默认true|



##### 返回值
|参数类型|参数说明|
|-|-|
|Function|处理后的函数|



#### throttle

>
创建一个节流函数，在 wait 秒内最多执行 callback 一次的函数


##### 参数
|参数名|参数类型|参数说明|
|-|-|-|
|callback|Function|需要做节流函数|
|wait|number|节流时间，单位毫秒|
|options|object|选项对象|
|options.leading|boolean|指定调用在节流开始前，默认true|
|options.trailing|boolean|指定调用在节流结束后，默认false（与lodash默认配置不同，主要是因为事件处理更常用trailing为false的情况，如防止按钮连击）|



##### 返回值
|参数类型|参数说明|
|-|-|
|Function|处理后的函数|


这些方法可以通过3种方式对Vue控件的函数进行处理：

*   1.全局函数
*   2.控件实例函数
*   3.列表渲染函数


### 全局函数

`vue-event-util`提供某控件**所有**实例共享的函数进行上述函数处理，这种使用方法，相当于作用于控件原型上的函数，一旦方法进行了处理后，控件的每一个实例会共享处理后的方法。通过`vue-event-util`上提供的这些全局处理方法，具体用法如下：

```javascript
import eventUtil from 'vue-event-util'
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
}
```


### 控件实例函数

`vue-event-util`在Vue实例的原型上提供了上述函数处理，使用原型上的方法去处理函数，处理后的结果是控件实例独享的，针对Vue事件绑定函数的方法不同，`vue-event-util`提供两种不同的方法：


可以在方法里面使用$xxx函数里调用的方式，方法名绑定，如

```html
<template>
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
    
```

可以在方法里面调用vue-event-util函数：

```javascript
export default {
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
</script>
```

也可以在内联处理器里调用vue-event-util处理函数：

```html
<template>
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
    
```


### 列表渲染函数

当出现列表循环的时候，如果希望每一个循环出的元素拥有自己的事件处理函数，可以给每个元素提供一个key，使得各个元素绑定的事件互不干扰，例：

```html
<template>
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
</script>
```



## 原理

`vue-event-util`是如何存储处理后的函数的呢？


`vue-event-util`将每一个需要处理的函数toString，然后和其他参数（key，wait，option）一起做一个hash，最后用这个hash值做key将处理后的函数缓存起来。这是一个享元模式，如果hash已经存在就从缓存里面取，如果不存在就对函数进行处理，再缓存。因为如果一个函数的key、wait、option都相同，那这个函数的hash值也相同，所以就可以缓存这个函数了。



## 例子

防止按钮连击：[docs/ButtonSafe.html](https://laden666666.github.io/vue-event-util/ButtonSafe.html "") 


事件降频触发：


事件延时触发：


