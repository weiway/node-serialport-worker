[![Build Status](https://travis-ci.org/weiway/node-serialport-worker.svg?branch=master)](https://travis-ci.org/weiway/node-serialport-worker)
[![Dependency Status](https://david-dm.org/weiway/node-serialport-worker.svg)](https://david-dm.org/weiway/node-serialport-worker)

## Node-Serialport-Worker ##

### Run Node-serialport in a separate thread!###
Electron + SerialPort = better IOT

This module is aimed for creating a interface for using node-serialport in a seperate node thread

My goal is to have the same api as the original node-serialport.


### API ###
I'm trying to create a uniform api to make using serial-worker as easy as re-writting          ```require("serialport")``` to  ```require("serial-worker")```

Current Supported API:

-  ```Serial.SerialPort``` SerialPort Constructor
-  ```Serial.list``` List current available ports
-  ```SerialPort.isOpen(callback)``` Note this method is Async, which is different than the original ```serialport.isOpen```
-  ```SerialPort.on('open')``` SerialPort Open Event
-  ```SerialPort.on('data')``` SerialPort Data Event
-  ```SerialPort.on('close')``` SerialPort Close Event




### Usage ###
```
$ npm install serial-worker
```

Use serial worker just like the original node-serialport

```
const serial = require('serialport-worker');
var port = new serial.SerialPort(path, options,immediate);

serial.list((e,ports)=>{
    console.log(ports)
});

port.on('data',(data)=>{
  console.log(data);
});
```

###Known Issue###

Please let Me know any problem/issues




For ```serialport``` API https://github.com/voodootikigod/node-serialport

###Dev Plan###
I'm trying to figure out how to test port connection on ```travis-ci```
Right now I'm testing locally with a Arduino Uno

Currently some tests are copied from node-serialport ( https://github.com/voodootikigod/node-serialport ), in the future, hope serialport worker will pass all node-serialport tests
