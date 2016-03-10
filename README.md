[![Build Status](https://travis-ci.org/weiway/node-serialport-worker.svg?branch=master)](https://travis-ci.org/weiway/node-serialport-worker)
[![Dependency Status](https://david-dm.org/weiway/node-serialport-worker.svg)](https://david-dm.org/weiway/node-serialport-worker)

## Node-Serialport-Worker ##

### Run Node-serialport in a separate thread!###

Extremely high CPU usage inside Electron? https://github.com/atom/electron/issues/2928

Try this module. Electron + SerialPort = better IOT

This module is aimed for creating a interface for using node-serialport in a seperate node thread

My goal is to have the same api as the original node-serialport https://github.com/voodootikigod/node-serialport.


### API ###
I'm trying to create a uniform api to make using serial-worker as easy as re-writting          ```require("serialport")``` to  ```require("serial-worker")```

Current Supported API:

-  ```Serial.SerialPort``` SerialPort Constructor
-  ```Serial.list``` List current available ports
-  ```Serial.parser``` Original serialport parsers
-  ```SerialPort.isOpen(callback)``` Note this method is Async, which is different than the original ```serialport.isOpen```
-  ```SerialPort.on('open')``` SerialPort Open Event
-  ```SerialPort.on('data')``` SerialPort Data Event
-  ```SerialPort.on('close')``` SerialPort Close Event
- ```SerialPort.pause()``` Pause Connection
- ```SerialPort.resume()``` Resume Connection
-  ```SerialPort.close(callback)``` Close port
-  ```SerialPort.open(callback)``` Open port
-  ```SerialPort.set(options,callback)```
-  ```SerialPort.write(buffer,callback)``` Writes data to the SerialPort.




### Usage ###
```
$ npm install serial-worker
```

Use serial worker just like the original node-serialport

```
const serial = require('serialport-worker');
var port = new serial.SerialPort(path, options, immediate, callback);

serial.list((e,ports)=>{
    console.log(ports)
});

port.on('data',(data)=>{
  console.log(data);
});

port.open(()=>{
    port.write(new Buffer('Hello!','utf8'),()=>{
        console.log('Written!');
    });
})
```

###Known Issue###

Please let Me know any problem/issues


For ```serialport``` API https://github.com/voodootikigod/node-serialport

###Pending API###

- ```SerialPort.flush(callback)```
- ```SerialPort.drain(callback)```
- ```SerialPort.on('error',callback)```

###Testing###

I'm trying to figure out how to test port connection on ```travis-ci```
Right now I'm testing locally with a Arduino Uno

If you want to test locally, please set ```noTravis``` to ```true``` in ```test/serialport-0.js```






Currently some tests are copied from node-serialport ( https://github.com/voodootikigod/node-serialport ), in the future, hope serialport worker will pass all node-serialport tests
