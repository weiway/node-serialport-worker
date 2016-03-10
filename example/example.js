'use strict'
const Serial = require(__dirname + "/../serialport.js");
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
        console.log("Data Received!");
    });

    port.pause();
    console.log("pause");

    setTimeout(()=>{
        port.resume();
        console.log("resume")
    },5000);

    setInterval(()=>{
        port.write(new Buffer('hello world','utf8'), ()=>{
            console.log("Written!");
        });
    },1000);

});
