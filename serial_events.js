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
    flush_success: "serial-flush-success",
    flush_failed : "serial-flush-failed",
    drain_success: "serial-drain-success",
    drain_failed : "serial-drain-failed",

    set_success : "serial-set-success",
    set_failed : "serial-set-failed",

    //Public Serial Port Events
    data : "serial-data",
    open : "serial-open",
    close : "serial-close",
    error : "serial-error"
};
