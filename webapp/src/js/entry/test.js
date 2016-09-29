import * as testModel from 'modules/testModule'
import lalala from 'modules/testModule2'
lalala()
let res = testModel.timeoutFn()

import Vue from 'vue'
import App from 'components/App'

/**
 * test basic fn
 */

Vue.component('todo', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app = new Vue({
  el: '#learn-vue',
  data: {
    id: 'inspect-me',
    message: 'hello vue! ok',
    watchedValue: 'computed message',
    url: 'httptest',
    number: 12,
    seen: true,
    classA: 'cla',
    classB: 'clb',
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    objs: {
      obja: 1,
      objb: 2,
      objc: 3
    }
  },
  // methods calculating realtime
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    keyupFn: function () {
      console.log('key up')
    }
  },
  // computed properties are cached based on its dependencies
  computed: {
    reverseMessageCp: function () {
      return this.message + Date.parse(new Date())
    }
  },
  // When you have some data that needs to change based on some other data, it is tempting to overuse watch
  // However, it is often a better idea to use a computed property rather than an imperative watch callback.
  watch: {
    message: function (val) {
      this.watchedValue = val.slice(2, 10)
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created: function () {
    console.log(`a is ${this.seen}`)
  },
  mounted: function () {
    console.log(`b is mounted`)
  },
  updated: function () {
    console.log(`c is updated`)
  },
  destroyed: function () {
    console.log(`d is destroyed`)
  }
})

Vue.set(app.todos, 2, {text: 'reset value'})

/**
 * test components
 */

var Foo = Vue.component('simple-counter', {
  template:
    '<div><button @click="increment">{{ counter }}</button><p>{{propC}}</p></div>',
  props: {
    propC: {
      type: String,
      required: false
    },
    // a number with default value
    propD: {
      type: Number,
      default: 100
    },
    // object/array defaults should be returned from a
    // factory function
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // custom validator function
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  },
  data: function () {
    return {
       counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  }
})

new Vue({
  el: '#test-component',
  data: {
    fdata: 'parent data',
    total: 0,
    currentView: 'App',
    testList: [{id:3},{id:2},{id:4}]
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    },
    reorder () {
      this.testList.sort((a, b) => {
        return a.id > b.id
      })
    }
  },
  components: { App, Foo }
  // template: '<app></app>'
})

// new Vue({
//   render: h => h(App),
// }).$mount('#test');
