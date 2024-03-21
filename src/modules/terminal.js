var functions = {
    send: a => {
        var c = svgbot.client.channels.cache,
            m = "";
        for (var i = 1; i < a.length; i++)
            m += a[i] + " ";
        c.get(a[0]).send(m).then(b => {
            svgbot.terminal.log({
                content: ":information_source: Message with ID `" + b.id + "` was sent.",
                embed: {
                    color: "0xff0000",
                    description: "```js\n{\nauthor: " + b.author.id + ",\nchannel: " + b.channel.id +
                        ",\ncontent: " + b.content + ",\ndeleted: " + b.deleted + ",\neditedAt: " + b.editedAt +
                        ",\nguild: " + b.channel.guild.id + ",\nid: " + b.id +
                        "\n}\n```[Link to message](https://discord.com/channels/" + 
                        b.channel.guild.id + "/"+b.channel.id + "/" + b.id + ")"
                }
            });
        }).catch(e => {
            svgbot.terminal.log(":warning: There was error in sending message.\n```js\n"
                + e.message + "\n" + e.stack + "```");
        });
    },
    edit: a => {
        var c = svgbot.client.channels.cache,
            m = "";
        for(var i=2;i<a.length;i++)
            m += a[i] + " ";
        c.get(a[0]).messages.fetch(a[1]).then(d => {
            d.edit(m).then(b => {
                svgbot.terminal.log({
                    content: ":information_source: Message with ID `" + b.id + "` succesfully edited.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\nauthor: " + b.author.id + ",\nchannel: " + b.channel.id +
                            ",\ncontent: " + b.content + ",\ndeleted: " + b.deleted + ",\neditedAt: " + b.editedAt +
                            ",\nguild: " + b.channel.guild.id + ",\nid: " + b.id +
                            "\n}\n```[Link to message](https://discord.com/channels/" +
                            b.channel.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: There was error editing message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        }).catch(e => {
            svgbot.terminal.log(":warning: There was error editing message.\n```js\n"
                + e.message + "\n" + e.stack + "```");
        });
    },
    delete: a => {
        var c = svgbot.client.channels.cache;
        c.get(a[0]).messages.fetch(a[1]).then(d => {
            d.delete({
                timeout: a[2]
            }).then(b => {
                svgbot.terminal.log({
                    content: ":information_source: Message with ID `" + b.id + "` succesfully deleted.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\nauthor: " + b.author.id + ",\nchannel: " + b.channel.id +
                            ",\ncontent: " + b.content + ",\ndeleted: " + b.deleted + ",\neditedAt: " + b.editedAt +
                            ",\nguild: " + b.channel.guild.id + ",\nid: " + b.id + "\n}\n```"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: There was error deleting message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        }).catch(e => {
            svgbot.terminal.log(":warning: There was error deleting message.\n```js\n"
                + e.message + "\n" + e.stack + "```");
        });
    },
    getPerms: a => {
        var b = svgbot.client.channels.cache.get(a[0]);
        if (b) {
            var c = JSON.parse(JSON.stringify(b.permissionOverwrites)),
                d = "";
            for (var i in c)
                d += JSON.stringify({
                    id: c[i].id,
                    allow: c[i].allow,
                    deny: c[i].deny
                }) + "\n";
            svgbot.terminal.log({
                content: ":information_source: Permissions of channel with ID `" + a[0] + "`:",
                embed: {
                    color: "0xff0000",
                    description: "```js\n[\n" + d + "]\n```"
                }
            });
        }
    },
    setPerms: a => {
        if (a.length >= 4) {
            var b = svgbot.client.channels.cache.get(a[0]);
            if (b && typeof b.overwritePermissions === "function") {
                var c = JSON.parse(JSON.stringify(b.permissionOverwrites)),
                    d = undefined;
                for (var i in c) {
                    delete c[i].type;
                    if (c[i].id === a[1] && !d)
                        d = i;
                }
                if (d) {
                    c[d].allow = parseInt(a[2]);
                    c[d].deny = parseInt(a[3]);
                } else
                    c[c.length] = {
                        id: a[1],
                        deny: parseInt(a[3]),
                        allow: parseInt(a[2])
                    };
                b.overwritePermissions(c).then(x => {
                    svgbot.terminal.log(":information_source: Permissions of channel with ID `"
                        + x.id + "` succesfully updated.");
                }).catch(e => {
                    svgbot.terminal.log(":warning: There was error in updating permissions.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
            }
        }
    },
    deletePerms: a => {
        if (a.length >= 2) {
            var b = svgbot.client.channels.cache.get(a[0]);
            if (b && typeof b.overwritePermissions === "function") {
                var c = JSON.parse(JSON.stringify(b.permissionOverwrites));
                for (var i in c) {
                    delete c[i].type;
                    if (c[i].id === a[1])
                        c.splice(i,1);
                }
                b.overwritePermissions(c).then(x => {
                    svgbot.terminal.log(":information_source: Permissions of channel with ID `"
                        + x.id + "` succesfully updated.");
                }).catch(e => {
                    svgbot.terminal.log(":warning: There was error in updating permissions.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
            }
        }
    }
};
var execute = a => {
    var f = functions;
    var l = a.split(" ");
    if (f[l[0]])
        f[l[0]](l.slice(1));
};
var log = a => {
    svgbot.system.sendMessage(0, svgbot.serversData.channels.terminal[0], a);
    svgbot.system.sendMessage(1, svgbot.serversData.channels.terminal[1], a);
    console.log(a);
};

module.exports = {execute, log};