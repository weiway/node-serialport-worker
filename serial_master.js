'use strict'
const events = require('events');
const cp = require('child_process');
const SERIAL_EVENTS = require('./serial_events.js');


var serial_worker = cp.fork('./serial_worker.js');



class SerialInterface extends events.EventEmitter {
    constructor(path,options){
        super();
        let $ = this;

        $.reporter = new events.EventEmitter();

        serial_worker.on('message',(msg)=>{
            $.reporter.emit(msg.eventType,msg.body);
        });

        serial_worker.send({
            func: 'init',
            param: [path,options]
        });

        $.reporter.on(SERIAL_EVENTS.data,(data)=>{
            $.emit("data",data);
        });
        $.reporter.on(SERIAL_EVENTS.open,()=>{
            $.emit("open");
        });
        $.reporter.on(SERIAL_EVENTS.close,()=>{
            $.emit("close");
        });
    }
    open(callback){
        let $ = this;
        serial_worker.send({func:"open",param:undefined});
        $.reporter.on(SERIAL_EVENTS.open_success,()=>{
            if(callback){
                callback();
            }
        });
        $.reporter.on(SERIAL_EVENTS.open_failed,(err)=>{
            if(callback){
                callback(err);
            }
        });
    }
    close(callback){
        let $ = this;
        serial_worker.send({func:"close",param:undefined});
        $.reporter.on(SERIAL_EVENTS.close_success,()=>{
            if(callback){
                callback();
            }
        });
        $.reporter.on(SERIAL_EVENTS.close_failed,(err)=>{
            if(callback){
                callback(err);
            }
        });
    }



}




process.on('exit', function() {
    serial_worker.kill();
});

module.exports = SerialInterface;










//serial_interface.init().then(()=>{},(err)=>{console.log(err)});
