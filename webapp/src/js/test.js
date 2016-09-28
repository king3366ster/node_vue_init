
import 'babel-polyfill'
import * as testModel from '../modules/testModule'
import lalala from '../modules/testModule2'
lalala()
let res = testModel.timeoutFn()

import Vue from 'vue'
import App from 'components/App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
