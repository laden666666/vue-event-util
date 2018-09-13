import Vue from 'vue'
import * as eventUtil from '../../../dist/vue-event-util'

Vue.use(eventUtil)

describe('vue-event-util', () => {
    it('de', async () => {
        const Constructor = Vue.extend({
            data: function(){
                return {
                    width: '200',
                    height: '200',
                    resizeCount: 0
                }
            },
            methods: {
                resize(){
                }
            },
            template:
                `<div class="box" :style="{width: width + 'px', height: height + 'px'}" v-elresize @elresize="resize">
                    resize count : <span id="resizeCount">{{resizeCount}}</span>
                </div>`
        })
        const vm = new Constructor().$mount()
    })

    it('Elresize component test', async () => {
        const Constructor = Vue.extend({
            data: function(){
                return {
                    width: '200',
                    height: '200',
                    resizeCount: 0
                }
            },
            methods: {
                resize(){
                }
            },
            template:
                `<Elresize class="box" :style="{width: width + 'px', height: height + 'px'}" @elresize="resize">
                    resize count : <span id="resizeCount2">{{resizeCount}}</span>
                </Elresize>`
        })
        const vm = new Constructor().$mount()
    })
})
