/*globals it describe*/
'use strict'

const Serial = require('../serialport.js')
// const Serial = require('serialport');
const SerialPort = Serial.SerialPort

var port
var path

const noTravis = false
// Testing Board : /dev/cu.usbserial-DA01LKGI

describe('Serial Worker', () => {
  describe('Serial.list', () => {
    it('should return a list of serialports asynchronously', (done) => {
      Serial.list((err, ports) => {
        if (err) {
          throw err
        } else {
          path = ports[0]
          done()
        }
      })
    })
  })

    /*
    describe('Constructor',()=>{
        it('should throw error when open error',(done)=>{
            try {
                let fake = new SerialPort('dev/nonexist',{});
            }finally {
                done();
            }
        });
    });
    */

  if (noTravis) {
    describe('SerialPort', () => {
      port = new SerialPort('/dev/cu.usbserial-DA01LSNX', {
        baudRate: 9600
      }, false)

      describe('SerialPort.isOpen', () => {
        it('should return true when port is open', (done) => {
          port.open((err) => {
            if (!err) {
              port.isOpen((flag) => {
                if (flag) {
                  done()
                }
              })
            }
          })
        }).timeout(3000)

        it('should return false when port is closed', (done) => {
          port.close(() => {
            port.isOpen((flag) => {
              if (flag === false) {
                done()
              }
            })
          })
        })
      })

      describe('SerialPort.on:open', () => {
        it('should catch open event when port opened', (done) => {
          port.once('open', (err) => {
            if (!err) {
              port.close()
              done()
            }
          })
          port.open()
        }).timeout(3000)
      })

      describe('SerialPort.on:data', () => {
        it('should catch data event when data event fired', (done) => {
          port.once('data', (data) => {
            done()
          })
          port.open(() => {
          })
        }).timeout(3000)
      })

      describe('SerialPort.on:close', () => {
        it('should catch close event when port is closed', (done) => {
          port.once('close', (err) => {
            if (!err) {
              done()
            }
          })
          port.close()
        })
      })
    })
  }
})
