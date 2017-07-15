require('babel-register')({
  "presets": [
    ["env", {
      "targets": {
        "node": 7
      }
    }]
  ]
})

process.env.NODE_ENV = 'test'

require('./server.js')