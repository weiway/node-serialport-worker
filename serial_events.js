'use strict'
module.exports = {
    //Static Method Events
    list_success: "serial-list-sucess",
    list_failed : "serial-list-failed",

    //Sync Serial Instance Method Events
    is_open : "serial-is-open",

    //Serial Internal Events
    open_success : "serial-open-success",
    open_failed : "serial-open-failed",
    close_success : "serial-close-success",
    close_failed : "serial-close-failed",
    write_success : "serial-write-success",
    write_failed : "serial-write-failed",

    //Public Serial Port Events
    data : "serial-data",
    open : "serial-open",
    close : "serial-close",
};
