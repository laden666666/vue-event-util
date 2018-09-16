# vue-event-util
<p class="mydoc_api_npm-info" align="center">
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/v/vue-event-util.svg" alt="Version"></a>
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/dm/vue-event-util.svg" alt="Downloads"></a>
            <a href="https://www.npmjs.com/package/vue-event-util"><img src="https://img.shields.io/npm/l/vue-event-util.svg" alt="License"></a>
        </p><table cellspacing="1" style="margin: 0 auto;font-size: 14px;background-color: #f9f9f9;color: #036;padding: 3px;border-radius: 4px;border: 1px solid rgba(220, 220, 220, .5);">
    <colgroup width="100" span="7" align="center"></colgroup>
    <tr style="height: 30px;">
        <th align="center">Android</td><th align="center">Firefox</td><th align="center">Chrome</td><th align="center">IE</td><th align="center">iPhone</td><th align="center">Edge</td><th align="center">Safari</td>
    </tr>
    <tr style="color: #000;line-height: 28px;font-weight: bold;">
        <td align="center" style="background-color: #60d848">>=4.4</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">>=9</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td><td align="center" style="background-color: #60d848">√</td>
    </tr>
</table> **vue-event-util** ，是一个扩展Vue事件的扩展插件，为Vue的事件提供了如 **函数节流** 、 **函数防抖** 、 **函数延时** 等功能。 **vue-event-util** 针对于这一情况，将[lodash](https://lodash.com/ "") 的很多处理函数的工具函数加入到插件中，大家可用使用 **vue-event-util** 提供的便携方法将其应用到Vue的事件中。

## 源码
[github](https://github.com/laden666666/vue-event-util "") ，[码云](https://gitee.com/laden666666/vue-event-util "") 


## 功能
*   控件所有实例共享的函数防抖、函数节流、延时执行等功能
*   控件实例独享的函数防抖、函数节流、延时执行等功能
*   列表渲染的控件独享的函数防抖、函数节流、延时执行等功能
*   实现防止按钮连击
*   实现降低事件响应频率
*   对typescript的支持

## 安装
```javascript
npm install vue-event-util
```

## 插件解决的问题
当我们对函数进行 **柯里化** 、 **函数节流** 、 **函数防抖** 处理的时候，往往需要使用到高级函数语法，将原有函数传入通过以入参传入，并以返回值的形式返回的处理后的函数。如lodash库对函数防抖的实现：

```javascript
fn = _.throttle(fn, 1000)
```
但是这个处理对于Vue的template语法中的事件响应函数来说，实现起来却很麻烦，我们以做 **函数防抖** 为例，看看我们以往在Vue中是如何实现上述操作的。Vue的事件绑定有两种方法：[方法名绑定](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95 "") 和[内联处理器](https://cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95 "") 。 **内联处理器** 允许我们提供一个表达式处理事件，因为Vue会生成一个匿名函数去执行绑定的表达式，每一次事件处理时候都会执行一次这个匿名函数，因此无法实现如 **函数节流** 、 **函数防抖** 这样的功能。

```html
<template>
    <button @clikc="_.throttle(fn, 1000)()">函数防抖</button>
</template>
```
因为每一次点击都会执行一次_.throttle方法，所以上述代码是无法实现对事件的函数防抖处理的。

另一种方法是先将函数进行处理，再通过方法名绑定或者内联处理器的方式绑定到Vue上面。

```html
<template>
    <button @clikc="fn">函数防抖</button>
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
这样写也存在一个问题，就是所有控件公用一个防抖函数，当多个控件需要单独做函数防抖的话就没有办法了。而且在列表渲染，如果列表的每一个控件都要单独做函数防抖处理，这样就更麻烦了。

有时候我们甚至会借助watch来实现函数防抖的功能。如：

```html
<template>
    <button @clikc="fn">函数防抖</button>
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
方法是死的人是活的，我们肯定能找到更优雅的方式来做函数防抖或者其他类似的事情。 **vue-event-util** 就是为了解决这个事情而生的。



