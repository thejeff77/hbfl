// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const kinesis = new AWS.Kinesis()
const streamName = 'hamster-race-results'

createKinesisStream(streamName)
.then(data => console.log(data))

function createKinesisStream (streamName) {
  const params = {
    ShardCount: 1,
    StreamName: streamName
  }

  return new Promise((resolve, reject) => {
    kinesis.createStream(params, (err, data) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
