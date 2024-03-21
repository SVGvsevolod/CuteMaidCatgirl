var tttcheck = (a, b) => {
    
};
var request = {
    cmds: (a, b, c, d) => {
        svgbot.commandcenter.execute.cmds(a, b, c);
    },
    snap: (a, b, c, d) => {
        svgbot.system.detectUsers(d, a, (x, y) => {
            svgbot.workers.commandcenter.postMessage({
                command: "snap",
                guild: y,
                channel: b,
                initiator: c,
                targets: x
            });
        });
    },
    hug: (a, b, c, d) => {
        svgbot.system.detectUsers(d, a, (x, y) => {
            svgbot.workers.commandcenter.postMessage({
                command: "hug",
                guild: y,
                channel: b,
                initiator: c,
                targets: x
            });
        });
    },
    pat: (a, b, c, d) => {
        svgbot.system.detectUsers(d, a, (x, y) => {
            svgbot.workers.commandcenter.postMessage({
                command: "pat",
                guild: y,
                channel: b,
                initiator: c,
                targets: x
            });
        });
    },
    kiss: (a, b, c, d) => {
        
    },
    psex: (a, b, c, d) => {
        
    },
    fcheck: (a, b, c, d) => {
        
    },
    avatar: (a, b, c, d) => {
        svgbot.system.detectUsers(d, a, (x, y) => {
            var e = [];
            for (var i in x)
                e[e.length] = svgbot.client.guilds.cache.get(svgbot.serversData.guilds[y])
                    .members.cache.get(x[i].user).user.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 2048
                    });
            svgbot.workers.commandcenter.postMessage({
                command: "avatar",
                guild: y,
                channel: b,
                images: e
            });
        });
    },
    ttt: (a, b, c, d) => {
        svgbot.system.detectUsers(d, a, (x, y) => {
            if (c !== x[0].user)
                svgbot.workers.tictactoe.postMessage({
                    action: "start",
                    guild: y,
                    channel: b,
                    playera: c,
                    playerb: x[0].user
                });
        },1);
    }
};
var execute = {
    cmds: (a, b, c) => {
        svgbot.system.sendMessage(a, b, a
            ? "<@" + c + "> All bot commands are here: https://bit.ly/svgbotcmds"
            : "<@" + c + "> Все команды можно найти здесь: https://bit.ly/svgbotcmds");
    },
    snap: a => {
        if (a.targets.length) {
            svgbot.system.sendMessage(a.guild, a.channel, a.message).then(b => {
                var c = b.guild.members.cache.get(a.initiator).user;
                for (var i in a.targets)
                    b.guild.members.cache.get(a.targets[i].user).send({
                        embed: {
                            color: "0xff0000",
                            description: "[" + c.username + "#" + c.discriminator + "" + a.dmmessage +
                                "](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id +
                                "/" + b.id +")"
                        }
                    }).then(() => {
                        
                    }).catch(e => {
                        svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                            + e.message + "\n" + e.stack + "```");
                    });
                svgbot.terminal.log({
                    content: ":information_source: commandcenter worker: executed command `snap`.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\ncommand: " + a.command + ",\nguild: " + b.guild.id +
                            ",\nchannel: " + b.channel.id + ",\nmessage: " + b.id + ",\ninitiator: " + a.initiator +
                            "\n}\n```[Link to message](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        }
    },
    hug: a => {
        if (a.targets.length){
            svgbot.system.sendMessage(a.guild, a.channel, a.message).then(b => {
                var c = b.guild.members.cache.get(a.initiator).user;
                for (var i in a.targets)
                    b.guild.members.cache.get(a.targets[i].user).send({
                        embed: {
                            color: "0xff0000",
                            description: "[" + c.username + "#" + c.discriminator + "" + a.dmmessage +
                                "](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                        }
                    }).then(() => {
                        
                    }).catch(e => {
                        svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                            + e.message + "\n" + e.stack + "```");
                    });
                svgbot.terminal.log({
                    content: ":information_source: commandcenter worker: executed command `hug`.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\ncommand: " + a.command + ",\nguild: " + b.guild.id +
                            ",\nchannel: " + b.channel.id + ",\nmessage: " + b.id + ",\ninitiator: " + a.initiator +
                            "\n}\n```[Link to message](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        }
    },
    pat: a => {
        if (a.targets.length) {
            svgbot.system.sendMessage(a.guild, a.channel, a.message).then(b => {
                var c = b.guild.members.cache.get(a.initiator).user;
                for (var i in a.targets)
                    b.guild.members.cache.get(a.targets[i].user).send({
                        embed: {
                            color: "0xff0000",
                            description: "[" + c.username + "#" + c.discriminator + "" + a.dmmessage +
                                "](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                        }
                    }).then(() => {
                        
                    }).catch(e => {
                        svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                            + e.message + "\n" + e.stack + "```");
                    });
                svgbot.terminal.log({
                    content: ":information_source: commandcenter worker: executed command `pat`.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\ncommand: " + a.command + ",\nguild: " + b.guild.id +
                            ",\nchannel: " + b.channel.id + ",\nmessage: " + b.id + ",\ninitiator: " + a.initiator +
                            "\n}\n```[Link to message](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        }
    },
    kiss: () => {
        
    },
    psex: () => {
        
    },
    fcheck: () => {
        
    },
    avatar: a => {
        if (a.error)
            svgbot.terminal.log(":warning: commandcenter worker: something went wrong while getting color.\n```js\n"
                + a.error.message + "\n" + a.error.stack + "```");
        else
            for (var i in a.images)
                svgbot.system.sendMessage(a.guild,a.channel,{
                    embed:{
                        color: a.colors[i],
                        image: {
                            url: a.images[i]
                        }
                    }
                }).then(b => {
                    svgbot.terminal.log({
                        content: ":information_source: commandcenter worker: executed command `avatar`.",
                        embed: {
                            color: "0xff0000",
                            description: "```js\n{\ncommand: " + a.command + ",\nguild: " + b.guild.id +
                                ",\nchannel: " + b.channel.id + ",\nmessage: " + b.id +
                                "\n}\n```[Link to message](https://discord.com/channels/" + b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                        }
                    });
                }).catch(e => {
                    svgbot.terminal.log(":warning: commandcenter worker: something went wrong while sending message.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
    },
    ttt: a => {
        
    }
};

module.exports = {tttcheck, request, execute};