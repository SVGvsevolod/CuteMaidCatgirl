var request = {
    create: (a, b, c) => {
        svgbot.workers.roleplay.postMessage({
            action: "create",
            guild: a,
            data: b,
            initiator: c
        });
    },
    allow: a => {
        for (var i in svgbot.serversData.rpstatus.forbidden)
            if (svgbot.serversData.rpstatus.forbidden[i] === a) {
                svgbot.serversData.rpstatus.forbidden.splice(i, 1);
                break;
            }
        svgbot.workers.roleplay.postMessage({
            action: "update",
            forbidden: svgbot.serversData.rpstatus.forbidden
        });
    },
    forbid: a => {
        svgbot.serversData.rpstatus.forbidden[svgbot.serversData.rpstatus.forbidden.length] = a;
        svgbot.workers.roleplay.postMessage({
            action: "update",
            forbidden: svgbot.serversData.rpstatus.forbidden
        });
    },
    invite: (a, b, c) => {
        svgbot.workers.roleplay.postMessage({
            action: "invite",
            guild: a,
            id: b,
            data: c
        });
    },
    exclude: (a, b, c) => {
        svgbot.workers.roleplay.postMessage({
            action: "exclude",
            guild: a,
            id: b,
            data: c
        });
    },
    close: (a, b) => {
        svgbot.workers.roleplay.postMessage({
            action: "close",
            guild: a,
            id: b
        });
    }
};
var execute = {
    create: a => {
        if (a.participants.length) {
            var c = svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild]).channels;
            c.create(a.name, {
                type: "text",
                topic: a.guild
                    ? "==============================================\n\nPrivate RP commands:\n**/rp-invite** *@mentions* - Invite more participants\n**/rp-exclude** *@mentions* - Remove some participants\n**/rp-close** - Close private RP\n:exclamation: **Channel will be deleted forever**"
                    : "==============================================\n\nКоманды приватного РП:\n**/rp-invite** *@упоминания* - Пригласить участников\n**/rp-exclude** *@упоминания* - Исключить участников\n**/rp-close** - Закрыть приватный РП\n:exclamation: **Канал будет удален навсегда**",
                nsfw: a.nsfw,
                parent: svgbot.serversData.channels.rpcategory[a.guild],
                permissionOverwrites: a.permissions
            }).then(b => {
                var d = "<@" + a.initiator + ">, ";
                for (var i = 0; i < a.participants.length; i++)
                    if (i == a.permissions.length - 1)
                        d += "<@" + a.participants[i] + ">";
                    else
                        d += "<@" + a.participants[i] + ">, ";
                b.send(a.guild
                    ? "The Private RP Story starring " + d + "\n\nPrologue:\n" + a.startMessage
                    : "Приватное сюжетное РП с участием " + d + "\n\nВступление:\n" + a.startMessage);
                if (a.forbidden)
                    c.cache.get(svgbot.serversData.channels.rpmain[a.guild]).send(a.guild
                        ? "Someone has forbidden possibility to invite to private RP."
                        : "Кто-то запретил возможность приглашать в приватный РП."
                    );
                var e = {};
                e[b.id] = a.permissions;
                svgbot.workers.worker_roleplay.postMessage({
                    action: "update",
                    channels: e
                });
                svgbot.terminal.log({
                    content: ":information_source: roleplay worker: executed command `create` and created channel with ID `"
                        + b.id + "`.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\naction: " + a.action + ",\nguild: " + b.guild.id + ",\nname: " + b.name +
                            ",\nstartMessage: " + a.startMessage + ",\nnsfw: " + b.nsfw + ",\ninitiator: " + a.initiator +
                            "\n}\n```[Link to channel](https://discord.com/channels/" + b.guild.id + "/" + b.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: roleplay worker: something went wrong while creating channel.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
        } else if (a.forbidden) {
            var c = svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild]).channels;
            c.cache.get(svgbot.serversData.channels.rpmain[a.guild]).send(a.guild
                ? "Someone has forbidden possibility to invite to private RP."
                : "Кто-то запретил возможность приглашать в приватный РП."
            );
        }
    },
    invite: a => {
        if (a.invited.length) {
            svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
                .channels.cache.get(a.id)
                .overwritePermissions(a.permissions).then(b => {
                    var d = "";
                    for (var i = 0; i < a.invited.length; i++)
                        if (i == a.invited.length - 1)
                            d += "<@" + a.invited[i] + ">";
                        else
                            d += "<@" + a.invited[i] + ">, ";
                    b.send(a.guild
                        ? d + " joined the party."
                        : d + " присоединились к вечеринке.");
                    if (a.forbidden)
                        b.send(a.guild
                            ? "Someone has forbidden possibility to invite to private RP."
                            : "Кто-то запретил возможность приглашать в приватный РП."
                        );
                    var e = {};
                    e[b.id] = a.permissions;
                    svgbot.workers.roleplay.postMessage({
                        action: "update",
                        channels: e
                    });
                    svgbot.terminal.log(":information_source: roleplay worker: executed command `invite` in channel with ID `"
                        + b.id + "`.");
                }).catch(e => {
                    svgbot.terminal.log(":warning: roleplay worker: something went wrong while inviting members.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
        } else if (a.forbidden) {
            var c = svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild]).channels;
            c.cache.get(a.id).send(a.guild
                ? "Someone has forbidden possibility to invite to private RP."
                : "Кто-то запретил возможность приглашать в приватный РП."
            );
        }
    },
    exclude: a => {
        svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
            .channels.cache.get(a.id)
            .overwritePermissions(a.permissions).then(b => {
                var d = "";
                for (var i = 0; i < a.excluded.length; i++)
                    if (i == a.excluded.length-1)
                        d += "<@" + a.excluded[i] + ">";
                    else
                        d += "<@" + a.excluded[i] + ">, ";
                b.send(a.guild
                    ? d + " had to leave us."
                    : d + " пришлось покинуть нас."
                );
                var e = {};
                e[b.id] = a.permissions;
                svgbot.workers.worker_roleplay.postMessage({
                    action: "update",
                    channels: e
                });
                svgbot.terminal.log(":information_source: roleplay worker: executed command `exclude` in channel with ID `"
                    + b.id + "`.");
            }).catch((e) => {
                svgbot.terminal.log(":warning: roleplay worker: something went wrong while inviting members.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
    },
    close: a => {
        svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
            .channels.cache.get(a.id).delete().then(b => {
                svgbot.terminal.log(":information_source: roleplay worker: executed command `close` and channel with ID `"
                    + b.id + "` was deleted.");
            }).catch(e => {
                svgbot.terminal.log(":warning: roleplay worker: something went wrong while deleting channel.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
    },
    update: a => {
        var s = svgbot.serversData.rpstatus;
        if (a.forbidden)
            s.forbidden = a.forbidden;
        if (a.channels)
            s.channels = a.channels;
    }
};

module.exports = {request, execute};