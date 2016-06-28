'use strict'
const path = require('path')
const serial = require('serialport')
const SerialPort = serial.SerialPort
const processModule = require('process')
const SERIAL_EVENTS = require(path.join(__dirname, '/serial_events.js'))

var port = null

processModule.on('message', function (msg) {
  let funcName = msg.func
  let funcParam = msg.param

  switch (funcName) {
  case 'init':
    let path = funcParam[0]
    let opts = funcParam[1]
    let immediate = funcParam[2]

    port = new SerialPort(path, opts, false)
    port.on('data', (data) => {
      let res = {
        eventType: SERIAL_EVENTS.data,
        body: data
      }
      processModule.send(res)
    })

    // This event sometimes fired sometimes not fired
    // Ommiting Original Open Event to avoid firing issue
    // New Open Event will be fired in open() callback
    port.on('open', () => {
      let res = {
        eventType: SERIAL_EVENTS.open,
        body: undefined
      }

      processModule.send(res)
    })

    port.on('close', () => {
      let res = {
        eventType: SERIAL_EVENTS.close,
        body: undefined
      }
      processModule.send(res)
    })

    port.on('error', (err) => {
      let res = {
        eventType: SERIAL_EVENTS.error,
        body: err.message
      }
      processModule.send(res)
    })

    port.on('disconnect', (err) => {
      let res = {
        eventType: SERIAL_EVENTS.disconnect,
        body: err.message
      }
      processModule.send(res)
    })

    // Open Immediate
    if (immediate !== false) {
      port.open()
    };

    break
  case 'list':
    let listRes
    serial.list((err, ports) => {
      if (err) {
        listRes = {
          eventType: SERIAL_EVENTS.list_failed,
          body: err
        }
      } else {
        listRes = {
          eventType: SERIAL_EVENTS.list_success,
          body: ports
        }
      }
      processModule.send(listRes)
    })
    break

  case 'isOpen':
    let isRes = {
      eventType: SERIAL_EVENTS.is_open,
      body: port.isOpen()
    }
    processModule.send(isRes)
    break

  default:
    let res = {}
    let callbackfunc = (e) => {
      if (e) {
        res.eventType = SERIAL_EVENTS[funcName + '_failed']
        res.body = e.message
      } else {
        res.eventType = SERIAL_EVENTS[funcName + '_success']
        res.body = undefined

        // fix open event not fired by ommiting original open event
        /*
        if(funcName === "open"){
            processModule.send({
                eventType : SERIAL_EVENTS.open,
                body : undefined
            });
        }
        */
      }
      processModule.send(res)
    }
    if (funcParam) {
      port[funcName](funcParam, callbackfunc)
    } else {
      port[funcName](callbackfunc)
    }

  }
})

//
