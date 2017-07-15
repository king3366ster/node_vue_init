require('babel-register')({
  "presets": [
    ["env", {
      "targets": {
        "node": 7
      }
    }]
  ]
})

require('./server.js')