'use strict'
const serial = require('serialport');
const serialport = serial.SerialPort;
const process = require('process');
const SERIAL_EVENTS = require(__dirname + '/serial_events.js');

var port = null;

process.on('message',function(msg){
    let func_name = msg.func;
    let func_param = msg.param;

    //console.log(func_name);

    switch (func_name) {
        case "init":
            let path = func_param[0];
            let opts = func_param[1];
            port = new serialport(path,opts,false);
            port.on('data',(data)=>{
                //console.log(data);
                let res = {
                    eventType : SERIAL_EVENTS.data,
                    body : data
                };
                process.send(res);
            });
            port.on('open',()=>{
                //console.log("Port Open");
                let res = {
                    eventType : SERIAL_EVENTS.open,
                    body : undefined
                };
                process.send(res);
            });
            port.on('close',()=>{
                let res = {
                    eventType : SERIAL_EVENTS.close,
                    body : undefined
                };
                process.send(res);
            });
            port.open();

            break;
        case "list":
            let res;
            serial.list((err,ports)=>{
                if(err){
                    res = {
                        eventType : SERIAL_EVENTS.list_failed,
                        body : err
                    };
                }else{
                    res = {
                        eventType : SERIAL_EVENTS.list_success,
                        body : ports
                    };
                }
                process.send(res);
            });
            break;

        default:
            let callbackfunc = (e)=>{
                if(e){
                    res.eventType = SERIAL_EVENTS[func_name + "_failed"];
                    res.body = e;
                }else{
                    res.eventType = SERIAL_EVENTS[func_name + "_success"];
                    res.body = undefined;
                }
                process.send(res)
            }
            port[func_name](callbackfunc);
    }
});








//
