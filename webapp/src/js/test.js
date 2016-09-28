
import 'babel-polyfill'
import * as testModel from '../modules/testModule'
import lalala from '../modules/testModule2'
lalala()
let res = testModel.timeoutFn()

// import Vue from 'vue/dist/vue.js'
import Vue from 'vue'
import App from 'components/App'

/* eslint-disable no-new */
new Vue({
  el: '#test',
  components: { App }
  // template: '<app></app>'
})

// new Vue({
//   render: h => h(App),
// }).$mount('#test');