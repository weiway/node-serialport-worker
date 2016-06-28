'use strict'
const path = require('path')
const Serial = require(path.join(__dirname, '/../serialport.js'))

const port = new Serial.SerialPort('/dev/cu.usbserial-DA01LSNX', {baudRate: 9600}, false, null)

// Serial.list((e,p)=>{console.log(p)});

port.on('error', (err) => {
  console.log(err)
})

port.on('open', () => {
  console.log('Port Open')
})

port.open((err) => {
  if (err) {
    console.log(err)
  } else {
    port.isOpen((f) => {
      console.log('Port Status: ' + f)
    })

    port.on('data', (d) => {
      console.log('Data Received!')
    })

    port.on('disconnect', (e) => {
      console.log('disconnected!', e)
    })

    port.on('close', () => {
      console.log('closed!')
    })
    setTimeout(() => {
      port.close()
    }, 3000)

    // port.pause()
    // console.log('pause')

    /*
    setTimeout(() => {
      port.resume()
      console.log('resume')
    }, 5000)

    setInterval(() => {
      port.flush()
      port.write(new Buffer('hello world', 'utf8'), (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Written!')
        }
      })
    }, 1000)
    */
  }
})
