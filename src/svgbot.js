var Discord = require("discord.js");

var client = new Discord.Client();
var workerControl = require("./modules/workers.js");
var workers = workerControl._w_init();
var serversData = require("./data/serverdata.js");
var terminal = require("./modules/terminal.js");
var system = require("./system.js");
var manageinfo = require("./modules/manageinfo.js");
var commandcenter = require("./modules/commandcenter.js");
var tictactoe = require("./modules/tictactoe.js");
var roleplay = require("./modules/roleplay.js");
var talk = require("./modules/talk.js");
var aprilfoolsdata = {};

client.login("...");

for(var i in Object.keys(serversData.events))
    client.on(Object.keys(serversData.events)[i], serversData.events[Object.keys(serversData.events)[i]]);

module.exports = {
    Discord,
    client,
    workers,
    serversData,
    terminal,
    system,
    manageinfo,
    commandcenter,
    tictactoe,
    roleplay,
    talk,
    aprilfoolsdata
};