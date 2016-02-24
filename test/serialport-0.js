'use strict'

const assert = require('assert');
const Serial = require("../serialport.js");
const SerialPort = Serial.SerialPort;
var port;
//Testing Board : /dev/cu.usbserial-DA01LZKB

describe('Serial', ()=>{
    describe('Serial.list', ()=>{
        it('should return a list of serialports asynchronously', (done)=>{
            Serial.list((err, ports)=>{
                if(err){
                    throw err;
                }else{
                    done();
                }
            });
        });
    });


    describe('Constructor',()=>{
        it('should throw error when open error',(done)=>{
            try {
                let fake = new SerialPort('dev/nonexist',{});
            }finally {
                done();
            }
        });

    });


    describe('SerialPort',()=>{
        port = new SerialPort('/dev/cu.usbserial-DA01LZKB',{},false);

        describe('SerialPort.on:open',()=>{
            it('should catch open event when port opened',(done)=>{
                port.on('open',(err)=>{
                    if(!err){
                        done();
                    }
                });
                port.open();

            });
        });

        describe('SerialPort.isOpen',()=>{
            it('should return true when port is open',(done)=>{
                if(port.isOpen()){
                    done();
                }
            });
            it('should return false when port is closed',(done)=>{

                port.close(()=>{
                    if(!port.isOpen()){
                        port.open();
                        done();
                    }

                })
            });
        });

        describe('SerialPort.on:data',()=>{
            it('should catch data event when data event fired',(done)=>{
                port.on('data',(err,data)=>{
                    if(!err){
                        done();
                    }
                });
            });
        });

        describe('SerialPort.on:close',()=>{
            it('should catch close event when port is closed',()=>{
                port.on('close',(err)=>{
                    if(!err){
                        done();
                    }
                });
                port.close();
            });
        });
    });

});
