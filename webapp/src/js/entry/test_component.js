import Vue from 'vue'
import App from 'components/App'
import Test from 'components/Test'

// Vue.component('anchored-heading', {
//   template: '#anchored-heading-template',
//   props: {
//     level: {
//       type: Number,
//       required: true
//     }
//   }
// })

var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
Vue.component('anchored-heading', {
  render: function (createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

new Vue({
  el: '#learn-vue',
  components: { Test }
  // template: '<app></app>'
})

new Vue({
  el: '#learn-component',
  render (h) {
    return (
      <Test></Test>
    )
  }
})
