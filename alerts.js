// Send email alerts when server is not reachable

var request = require('request');
var exec = require('child_process').exec
var fs = require('fs')

var lastSent = 0
var backoffTime = 0
var maxBackoff = 24*60*60*1000
var checkInterval = 3*60*1000
var recipients = [
  'example_user@gmail.com',
]

function checkServer () {
  request('https://example.com', function (err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log('Server is alive. All good here...')
      backoffTime = 0
    } else if (Date.now() - lastSent > backoffTime) {
      console.log('Raising the alarm!')
      createAlert(err, res)
      lastSent = Date.now()
      if (backoffTime <= maxBackoff) backoffTime += 60*60*1000
    }
  })
}

function createAlert (err, res) {
  var message = err ? err : 'Status code: ' + res.statusCode
  fs.writeFile('message', message, () => sendAlerts())
}

function sendAlerts () {
  var cmd = 'mail -s "Server at mars.mu is down" ' + recipients.join(',') + ' < message'
  exec(cmd, function (err, stdout, stderr) {
    console.log(`err: ${err}`)
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

checkServer()
setInterval(checkServer, checkInterval)

