module.exports = {
    ready: () => {
        svgbot.terminal.log(":information_source: S.V.G BOT has been started.");
        for (var i in Object.keys(svgbot.serversData.workers))
            svgbot.workers.start(
                Object.keys(svgbot.serversData.workers)[i],
                svgbot.serversData.workers[Object.keys(svgbot.serversData.workers)[i]].onstart,
                svgbot.serversData.workers[Object.keys(svgbot.serversData.workers)[i]].onmessage,
                svgbot.serversData.workers[Object.keys(svgbot.serversData.workers)[i]].trytorestart
            );
        svgbot.client.channels.cache.get(svgbot.serversData.channels.welcome[0]).messages.fetch().then(m => {
            svgbot.serversData.infoparts.welcome[0] = m;
        }).catch(() => {

        });
        svgbot.client.channels.cache.get(svgbot.serversData.channels.welcome[1]).messages.fetch().then(m => {
            svgbot.serversData.infoparts.welcome[1] = m;
        }).catch(() => {

        });
        svgbot.client.channels.cache.get(svgbot.serversData.channels.servermap[0]).messages.fetch().then(m => {
            svgbot.serversData.infoparts.servermap[0] = m;
        }).catch(() => {

        });
        svgbot.client.channels.cache.get(svgbot.serversData.channels.servermap[1]).messages.fetch().then(m => {
            svgbot.serversData.infoparts.servermap[1] = m;
        }).catch(() => {

        });
        svgbot.client.user.setActivity("bit.ly/svgbotcmds", {
            type: "PLAYING"
        });
        svgbot.client.ws.on("INTERACTION_CREATE", async a => {
            if (a.data.name === "bonk") {

            }
            switch (a.data.id) {
                case "826112901160370256": // boop
                    svgbot.client.api.interactions(a.id, a.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "boop <@" + a.data.options[0].value + ">"
                            }
                        }
                    });
                    break;
                case "826410617144344634": // bonk
                    svgbot.client.api.interactions(a.id, a.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "bonk <@" + a.data.options[0].value + ">"
                            }
                        }
                    });
                    break;
                case "826424044910936064": // say
                    svgbot.client.api.interactions(a.id, a.token).callback.post({
                        data: {
                            type: 5,
                            data: {
                                embeds: [{
                                    description: "a"
                                }],
                                flags: 64
                            }
                        }
                    }).then(() => {
                        svgbot.client.guilds.cache.get(a.guild_id)
                            .channels.cache.get(a.channel_id).send(a.data.options[0].value);
                    }).catch(() => {
                        
                    });
                    break;
            }
        });
    },
    message: m => {
        if (m.channel.type === "text" && m.channel.guild) {
            var g = m.channel.guild.id;
            if (m.type === "GUILD_MEMBER_JOIN") {
                if (m.guild.id === "236928901522259968")
                    svgbot.client.guilds.cache.get("236928901522259968")
                        .channels.cache.get("236928901522259968").send({
                            embed: {
                                color: "0xff0000",
                                description: "**Добро пожаловать на сервер S.V.G-ея <@" + m.author.id +
                                    ">.**\n\nЗдесь ты можешь пообщаться с другими прекрасными людьми и провести хорошо время.\n\nЗагляни в <#365586749352837120> для информации о сервере и получении ролей.\nЗагляни в <#764137578705715220> для списка каналов и навигации."
                            }
                        });
                else if (m.guild.id === "720299122489294889") {
                    svgbot.client.guilds.cache.get("720299122489294889")
                        .channels.cache.get("720299122967707710").send({
                            embed: {
                                color: "0xff0000",
                                description: "**Welcome <@" + m.author.id +
                                    "> to S.V.G's International Server.**\n\nHere you can communicate with other good people and have fun.\n\nCheck <#720315483110244384> for server info and claim some roles.\nCheck <#764137893924306958> for channels list and navigation."
                            }
                        });
                }
            } else if (m.channel.id === svgbot.serversData.channels.terminal[g]) {
                svgbot.terminal.execute(m.content);
            } else if (m.channel.id === svgbot.serversData.channels.rpmain[g] && !m.content.indexOf("/rp-")) {
                if (!m.content.indexOf(svgbot.serversData.rpcmds[0])) {
                    svgbot.roleplay.request.create(
                        g,
                        m.content.slice(svgbot.serversData.rpcmds[0].length + 1),
                        m.author.id
                    );
                } else if (!m.content.indexOf(svgbot.serversData.rpcmds[1])) {
                    svgbot.roleplay.request.allow(m.author.id);
                } else if (!m.content.indexOf(svgbot.serversData.rpcmds[2])) {
                    svgbot.roleplay.request.forbid(m.author.id);
                }
            } else if (svgbot.serversData.rpstatus.channels.includes(m.channel.id)) {
                if (!m.content.indexOf(svgbot.serversData.rpcmds[3])) {
                    svgbot.roleplay.request.invite(
                        g,
                        m.channel.id,m.content.slice(svgbot.serversData.rpcmds[3].length + 1)
                    );
                } else if (!m.content.indexOf(svgbot.serversData.rpcmds[4])) {
                    svgbot.roleplay.request.exclude(
                        g,
                        m.channel.id,m.content.slice(svgbot.serversData.rpcmds[4].length + 1)
                    );
                } else if (!m.content.indexOf(svgbot.serversData.rpcmds[5])) {
                    svgbot.roleplay.request.close(g, m.channel.id);
                }
            } else if (m.channel.id === svgbot.serversData.channels.suggeststuff[g]) {
                m.react("👍");
                m.react("👎");
            } else if (
                parseInt(m.content[0])
             && parseInt(m.content[1])
             && svgbot.tictactoe.check(g, m.channel.id, m.author.id)
            ) {
                svgbot.tictactoe.turn(g, m.channel.id, m.author.id, m.content[0], m.content[1]);
            } else if (
                m.content.indexOf("<@!" + svgbot.serversData.bot + ">") > -1
             || m.content.indexOf("<@" + svgbot.serversData.bot + ">") > -1
            ) {
                var c = svgbot.serversData.commands,
                    d = svgbot.serversData.imgextract.sites,
                    t = true;
                for (var i in Object.keys(c))
                    if (m.content.indexOf(c[Object.keys(c)[i]][g]) > -1) {
                        svgbot.commandcenter.request[Object.keys(c)[i]](
                            g,
                            m.channel.id,
                            m.author.id,
                            m.content.substring(m.content.indexOf(c[Object.keys(c)[i]][g]) +
                            c[Object.keys(c)[i]][g].length)
                        );
                        t = false;
                        break;
                    }
                if (t)
                    svgbot.talk.request(g, m.channel.id, m.content);
                /*for (var i in d) {
                    if (m.content.indexOf(d[i]) > -1) {
                        var e = m.content.split(" "),
                            f = undefined;
                        for (var j in e)
                            if (e[j].indexOf(d[i]) > -1) {
                                f = e[j];
                                break;
                            }
                        svgbot.workers.imgextract.postMessage({
                            guild: g,
                            channel: m.channel.id,
                            url: f
                        });
                    }
                }*/
            }
            if (svgbot.aprilfoolsdata[m.channel.id] && !m.author.bot) {
                m.delete().then(m => {
                    var a = m.attachments.array(),
                        b=[];
                    for (var c in a)
                        b[c] = a[c].attachment;
                    if (svgbot.aprilfoolsdata[m.channel.id][m.author.id] instanceof svgbot.Discord.Webhook) {
                        svgbot.aprilfoolsdata[m.channel.id][m.author.id].send(m.content, {
                            username: m.member.nickname ? m.member.nickname : m.author.username,
                            avatarURL: m.author.avatarURL({
                                format: "jpg"
                            }),
                            files: b
                        });
                    } else {
                        m.channel.createWebhook(m.author.id).then(a => {
                            svgbot.aprilfoolsdata[m.channel.id][m.author.id] = a;
                            a.send(m.content, {
                                username: m.member.nickname ? m.member.nickname : m.author.username,
                                avatarURL: m.author.avatarURL({
                                    format: "jpg"
                                }),
                                files: b
                            });
                        }).catch(() => {

                        });
                    }
                }).catch(() => {

                });
            }
        }
    },
    guildMemberRemove: m => {
        if (m.guild.id === "236928901522259968")
            svgbot.client.guilds.cache.get("236928901522259968")
                .channels.cache.get("236928901522259968")
                .send(m.user.username + "#" + m.user.discriminator +
                    " покинул(-а) нас, но обещал(-а) когда-нибудь вернуться.");
        else if (m.guild.id === "720299122489294889")
            svgbot.client.guilds.cache.get("720299122489294889")
                .channels.cache.get("720299122967707710")
                .send(m.user.username + "#" + m.user.discriminator +
                    " left us but promised to return back sometime.");
    },
    guildMemberUpdate: (a, b) => {
        var g = b.guild.id === svgbot.serversData.guilds[1] ? 1 : 0,
        x = [false, false, false];
        for (var i in b._roles) {
            if (svgbot.serversData.roles.interests_roles.includes(b._roles[i]))
                x[0] = true;
            else if (svgbot.serversData.roles.hobbies_roles.includes(b._roles[i]))
                x[1] = true;
            else if (svgbot.serversData.roles.specific_roles.includes(b._roles[i]))
                x[2] = true;
        }
        if (x[0] && !b._roles.includes(svgbot.serversData.roles.interests_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.interests_role[g]);
            b.roles.add(r);
        } else if (!x[0] && b._roles.includes(svgbot.serversData.roles.interests_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.interests_role[g]);
            b.roles.remove(r);
        }
        if (x[1] && !b._roles.includes(svgbot.serversData.roles.hobbies_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.hobbies_role[g]);
            b.roles.add(r);
        } else if (!x[1] && b._roles.includes(svgbot.serversData.roles.hobbies_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.hobbies_role[g]);
            b.roles.remove(r);
        }
        if (x[2] && !b._roles.includes(svgbot.serversData.roles.specific_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.specific_role[g]);
            b.roles.add(r);
        } else if (!x[2] && b._roles.includes(svgbot.serversData.roles.specific_role[g])){
            var r = b.guild.roles.cache.get(svgbot.serversData.roles.specific_role[g]);
            b.roles.remove(r);
        }
    }
};