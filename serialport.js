
const SerialInterface = require( __dirname + '/serial_master.js')
const SerialPort = require( 'serialport')

module.exports={
    list : SerialInterface.list,
    parsers : SerialPort.parsers,
    SerialPort : SerialInterface
}
