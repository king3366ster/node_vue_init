import * as testModel from 'modules/testModule'
import lalala from 'modules/testModule2'
lalala()
let res = testModel.timeoutFn()

import Vue from 'vue'
import App from 'components/App'

var app = new Vue({
  el: '#learn-vue',
  data: {
    id: 'inspect-me',
    message: 'Hello Vue!',
    seen: true,
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

// new Vue({
//   el: '#test',
//   components: { App }
//   // template: '<app></app>'
// })

// new Vue({
//   render: h => h(App),
// }).$mount('#test');
