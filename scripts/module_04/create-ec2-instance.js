// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg'
const keyName = 'hamster_key'
const instanceId = '/* TODO: Add the instance Id to stop */'

stopInstance(instanceId)
.then(() => createInstance(sgName, keyName))
.then((data) => console.log('Created instance with:', data))

function createInstance (sgName, keyName) {
  const params = {
    ImageId: '/* TODO: Add ami id for aws linux */',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
      sgName
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function stopInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }

  return new Promise((resolve, reject) => {
    ec2.stopInstances(params, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
