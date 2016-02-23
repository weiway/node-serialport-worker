## Node-Serialport-Worker ##

### Run Node-serialport in a separate thread!###

Electron + SerialPort = better IOT

### Usage ###
Use serial worker just like the original node-serialport

```
const SerialPort = require('serialport-worker');
var serialport = new SerialPort(path, options);

serialport.on('data',(data)=>{
  console.log(data);
});
```

###Known Issue###
Event listener should be removed after SerialPort Close

For ```serialport``` API https://github.com/voodootikigod/node-serialport
