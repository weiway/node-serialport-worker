'use strict'

const assert = require('assert');
describe('SerialPort', function() {
  describe('SerialPort.list', function () {
    it('should return a list of serialports asynchronously', function (done) {
        var serialPort = require("serialport");
        serialPort.list(function (err, ports) {
            if(err){
                throw err;
            }else{
                done();
            }
        });
    });
  });
});
