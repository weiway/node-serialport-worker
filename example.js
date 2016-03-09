'use strict'
const Serial = require(__dirname + "/serialport.js");
const port = new Serial.SerialPort('/dev/cu.usbserial-DA01LKGI',null,false,null);

//Serial.list((e,p)=>{console.log(p)});

port.on('open',()=>{
    console.log("Port Open");
});

port.open(()=>{
    let first = true;
    port.isOpen((f)=>{
        console.log("Port Status: " + f);
    });

    port.on('data',(d)=>{
        if(first && d){
            first = !first;
            console.log(d);
        }
    });



});
