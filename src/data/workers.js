module.exports = {
    commandcenter: {
        onmessage: a => {
            switch (a.command) {
                case "snap":
                    svgbot.commandcenter.execute.snap(a);
                    break;
                case "hug":
                    svgbot.commandcenter.execute.hug(a);
                    break;
                case "pat":
                    svgbot.commandcenter.execute.pat(a);
                    break;
                case "avatar":
                    svgbot.commandcenter.execute.avatar(a);
                    break;
            }
        },
        trytorestart: true
    },
    tictactoe: {
        onmessage: a => {
            switch (a.action) {
                case "start":
                    svgbot.tictactoe.execute.start(a);
                    break;
                case "stop":
                    svgbot.tictactoe.execute.stop(a);
                    break;
                case "turn":
                    svgbot.tictactoe.execute.turn(a);
                    break;
            }
        },
        trytorestart: true
    },
    roleplay: {
        onmessage: a => {
            switch (a.action) {
                case "create":
                    svgbot.roleplay.execute.create(a);
                    break;
                case "invite":
                    svgbot.roleplay.execute.invite(a);
                    break;
                case "exclude":
                    svgbot.roleplay.execute.exclude(a);
                    break;
                case "close":
                    svgbot.roleplay.execute.close(a);
                    break;
                case "update":
                    svgbot.roleplay.execute.update(a);
                    break;
            }
        },
        trytorestart: true
    },
    /*imgextract: {
        onmessage: a => {
            if (a.files && a.files.length)
                for (var i in a.files)
                    svgbot.client.guilds.cache.get(a.guild)
                        .channels.cache.get(a.channel).send({
                            files: a.files[i]
                        }).then(b => {
                        
                        }).catch(e => {
                        
                        });
        },
        trytorestart: true
    },*/
    talk: {
        onmessage: a => {
            switch (a.action) {
                case "talk":
                    svgbot.talk.execute(a.guild, a.channel, a.message);
                    break;
            }
        },
        trytorestart: false
    },
    neptunia_reddit: {
        onmessage: a => {
            switch (a.action) {
                case "post":
                    if (!a.error) {
                        svgbot.client.guilds.cache.get(svgbot.serversData.guilds[0])
                            .channels.cache.get(svgbot.serversData.channels.neptunia_reddit[0])
                            .send({
                                embed: {
                                    title: a.url,
                                    description: a.description,
                                    url: a.url,
                                    author: {
                                        name: a.title,
                                        url: a.url,
                                        icon_url: "https://images-ext-2.discordapp.net/external/W1GmQCCcnKvt5mh0JN2U97_xzZfIePOsrN9DKUcwhfY/https/i.imgur.com/o2xV7As.png"
                                    },
                                    footer: {
                                        text: "Пост с Reddit от u/"+a.author
                                    },
                                    image: {
                                        url: a.image
                                    }
                                }
                            }).then(() => {
                            
                            }).catch(e => {
                                svgbot.terminal.log(":warning: neptunia_reddit worker: something went wrong while sending message.\n```js\n"
                                    + e.message + "\n" + e.stack + "```");
                            });
                            svgbot.client.guilds.cache.get(svgbot.serversData.guilds[1])
                                .channels.cache.get(svgbot.serversData.channels.neptunia_reddit[1])
                                .send({
                                    embed: {
                                        title: a.url,
                                        description: a.description,
                                        url: a.url,
                                        author: {
                                            name: a.title,
                                            url: a.url,
                                            icon_url: "https://images-ext-2.discordapp.net/external/W1GmQCCcnKvt5mh0JN2U97_xzZfIePOsrN9DKUcwhfY/https/i.imgur.com/o2xV7As.png"
                                        },
                                        footer: {
                                            text: "Reddit post by u/"+a.author
                                        },
                                        image: {
                                            url: a.image
                                        }
                                    }
                                }).then(() => {

                                }).catch(e => {
                                    svgbot.terminal.log(":warning: neptunia_reddit worker: something went wrong while sending message.\n```js\n"
                                        + e.message + "\n" + e.stack + "```");
                                });
                    } else if (a.error) {
                        svgbot.terminal.log(":warning: neptunia_reddit worker: something went wrong while sending message.\n```js\n"
                            + a.error.message + "\n" + a.error.stack + "```");
                    }
                    break;
            }
        },
        trytorestart: true
    }
};