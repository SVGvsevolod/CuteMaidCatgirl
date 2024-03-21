var {
    owner,
    bot,
    guilds,
    channels,
    roles,
    commands,
    rpcmds,
    imgextract
} = require("../../data/serversdata.json");

var workers = require("./workers.js");
var events = require("./../events.js");
var infoparts = {
    welcome: [],
    servermap: []
};
var tttstatus = [];
var rpstatus = {
    channels: [],
    forbidden: []
};

module.exports = {
    owner,
    bot,
    guilds,
    channels,
    roles,
    commands,
    rpcmds,
    imgextract,
    workers,
    events,
    infoparts,
    tttstatus,
    rpstatus
};