var Discord = require("discord.js");
var Vibrant = require("node-vibrant");
var { Worker } = require("worker_threads");
var client = new Discord.Client();
var welcome = {
    actions: {}
};
var commands = {};
var events = {};
var servers = {};
var channels = {};
var strings = {};
var tictactoe = [];
var workers = {};
welcome.actions.createWelcome = function(a) {
    switch (a) {
        case 0:
            var b = require("../data/welcome_ru.json");
            for (var i = 0; i < b.length; i++) {
                svgbot.client.channels.cache.get("365586749352837120").send(b[i]);
            }
            break;
        case 1:
            var b = require("../data/welcome_en.json");
            for (var i = 0; i < b.length; i++) {
                svgbot.client.channels.cache.get("720315483110244384").send(b[i]);
            }
            break;
    }
};
commands.map = {
    "236928901522259968" : [
        {
            name:"команды",
            function:"doc"
        },
        {
            name:"дать щелбан",
            function:"snap"
        },
        {
            name:"обнять",
            function:"hug"
        },
        {
            name:"проверить на пидора",
            function:"fagcheck"
        },
        {
            name:"скамуниздить аватарку",
            function:"avatar"
        },
        {
            name:"крестики-нолики",
            function:"tictactoe"
        }
    ],
    "720299122489294889" : [
        {
            name:"commands",
            function:"doc"
        },
        {
            name:"snap",
            function:"snap"
        },
        {
            name:"hug",
            function:"hug"
        },
        {
            name:"gaycheck",
            function:"fagcheck"
        },
        {
            name:"steal avatar",
            function:"avatar"
        },
        {
            name:"tic-tac-toe",
            function:"tictactoe"
        }
    ]
};
commands.doc = function(a, b) {
    switch (svgbot.servers[a]) {
        case 0:
            var c = require("../data/doc_ru.json");
            b.send(c);
            break;
        case 1:
            var c = require("../data/doc_en.json");
            b.send(c);
            break;
    }
};
commands.snap = function(a, b, c, e) {
    var l = svgbot.strings.snapLog(svgbot.servers[a], c.id),
        d = svgbot.strings.snapDirect(svgbot.servers[a], c.username, c.discriminator);
    for (var i = 0; i < e.length; i++) {
        if (e[i].indexOf("<@!") > -1) {
            e[i] = svgbot.client.guilds.cache.get(a)
                .members.cache.get(e[i].split("<@!")[1].split(">")[0]).user;
        } else if (e[i].indexOf("<@") > -1) {
            e[i] = svgbot.client.guilds.cache.get(a)
                .members.cache.get(e[i].split("<@")[1].split(">")[0]).user;
        }
        if (!e[i].bot && e[i].id !== "690342724335173823") {
            e[i].send(d);
            if (i === e.length-1)
                l += "<@" + e[i].id + ">";
            else
                l += "<@" + e[i].id + ">, ";
        }
    }
    b.send(l);
};
commands.hug = function(a, b, c, e) {
    var l = svgbot.strings.hugLog(svgbot.servers[a], c.id),
        d = svgbot.strings.hugDirect(svgbot.servers[a], c.username, c.discriminator);
    for (var i = 0; i < e.length; i++) {
        if (e[i].indexOf("<@!") > -1) {
            e[i] = svgbot.client.guilds.cache.get(a)
                .members.cache.get(e[i].split("<@!")[1].split(">")[0]).user;
        } else if (e[i].indexOf("<@") > -1) {
            e[i] = svgbot.client.guilds.cache.get(a)
                .members.cache.get(e[i].split("<@")[1].split(">")[0]).user;
        }
        if (!e[i].bot && e[i].id !== "690342724335173823") {
            e[i].send(d);
            if (i === e.length-1)
                l += "<@" + e[i].id + ">";
            else
                l += "<@" + e[i].id + ">, ";
        }
    }
    b.send(l);
};
commands.fagcheck = function(a, b, c) {
    var e = Math.random() * 100;
    if (c.indexOf("<@!") > -1 || c.indexOf("<@") > -1) {
        b.send(svgbot.strings.fagLog(svgbot.servers[a], c, e.toFixed(2), (100 - e).toFixed(2)));
    } else {
        svgbot.client.guilds.cache.get(a).members.fetch({
            query: c,
            limit: 1
        }).then(d => {
            b.send(svgbot.strings.fagLog(
                svgbot.servers[a],
                "<@" + d.first().user.id + ">",
                e.toFixed(2),
                (100 - e).toFixed(2)
            ));
        });
    }
};
commands.avatar = function(g, a, b) {
    if (b.indexOf("<@!") > -1) {
        var b = svgbot.client.guilds.cache.get(g)
            .members.cache.get(b.split("<@!")[1].split(">")[0]).user;
        var c = b.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 2048
        }),
            d = svgbot.Vibrant.from(c);
        d.getPalette().then(e => {
            a.send({
                "embed": {
                    "color": "0x" + svgbot.Vibrant.Util.rgbToHex(
                        e.Vibrant._rgb[0],
                        e.Vibrant._rgb[1],
                        e.Vibrant._rgb[2]
                    ).split("#")[1],
                    "image": {
                        "url": c
                    }
                }
            });
        });
    } else if (b.indexOf("<@") > -1) {
        var b = svgbot.client.guilds.cache.get(g)
            .members.cache.get(b.split("<@")[1].split(">")[0]).user;
        var c = b.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 2048
        }),
            d = svgbot.Vibrant.from(c);
        d.getPalette().then(e => {
            a.send({
                "embed": {
                    "color": "0x" + svgbot.Vibrant.Util.rgbToHex(
                        e.Vibrant._rgb[0],
                        e.Vibrant._rgb[1],
                        e.Vibrant._rgb[2]
                    ).split("#")[1],
                    "image": {
                        "url": c
                    }
                }
            });
        });
    } else {
        svgbot.client.guilds.cache.get(g).members.fetch({
            query: b,
            limit: 1
        }).then(b => {
            var c = b.first().user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 2048
            }),
                d = svgbot.Vibrant.from(c);
            d.getPalette().then(e => {
                a.send({
                    "embed": {
                        "color": "0x" + svgbot.Vibrant.Util.rgbToHex(
                            e.Vibrant._rgb[0],
                            e.Vibrant._rgb[1],
                            e.Vibrant._rgb[2]
                        ).split("#")[1],
                        "image": {
                            "url": c
                        }
                    }
                });
            });
        });
    }
};
commands.tictactoe = function(a, b, c, d) {
    if (d.indexOf("<@!") > -1) {
        var f = svgbot.client.guilds.cache.get(a)
            .members.cache.get(d.split("<@!")[1].split(">")[0]).user;
    } else if (d.indexOf("<@") > -1) {
        var f = svgbot.client.guilds.cache.get(a)
            .members.cache.get(d.split("<@")[1].split(">")[0]).user;
    }
    var g = svgbot.tictactoe;
    var h = g.length;
    if (f && f instanceof svgbot.Discord.User) {
        var e = g[h] = {
            players: [c, f],
            board: b,
            cells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            turn: 0,
            time: setTimeout(function() {
                svgbot.tictactoe.pop(h);
            }, 60000)
        };
    }
};
commands.center = function(a, b, c, d, e) {
    switch (b.function) {
        case "doc":
            commands.doc(a, d);
            break;
        case "snap":
            commands.snap(a, c, d, commands.getUsers(a, e.split(b.name)[1], true));
            break;
        case "hug":
            commands.hug(a, c, d, commands.getUsers(a, e.split(b.name)[1], true));
            break;
        case "fagcheck":
            commands.fagcheck(a, c, commands.getUsers(a, e.split(b.name)[1], false)[0]);
            break;
        case "avatar":
            commands.avatar(a, c, commands.getUsers(a, e.split(b.name)[1], false)[0]);
            break;
        case "tictactoe":
            commands.tictactoe(a, c, d, commands.getUsers(a, e.split(b.name)[1], false)[0]);
            break;
    }
};
commands.getUsers = function(a, b, f) {
    var c = [];
    var d = b.split(" ");
    for (var i = 0; i < d.length; i++) {
        var e = d[i].split(",");
        for (var j = 0; j < e.length; j++) {
            if (e[j].indexOf("<@!") > -1) {
                c[c.length] = e[j];
            } else if (e[j].indexOf("<@") > -1) {
                c[c.length] = e[j];
            } else if (!f && e[j].length) {
                c[c.length] = e[j];
            }
        }
    }
    return c;
};
events.message = function(m) {
    var c = svgbot.commands,
        f = false,
        g = svgbot.tictactoe;
    if (m.channel.type === "text"
     && m.channel.guild
     && (
        m.content.indexOf("<@!690342724335173823>") > -1 ||
        m.content.indexOf("<@690342724335173823>") > -1
        )
    ) {
        for (var i = 0; i < c.map[m.channel.guild.id].length; i++) {
            if (m.content.indexOf(c.map[m.channel.guild.id][i].name) > -1) {
                f = true;
                c.center(
                    m.channel.guild.id,
                    c.map[m.channel.guild.id][i],
                    m.channel,
                    m.author,
                    m.content
                );
                break;
            }
        }
    } else if (m.channel.type === "dm" && !m.author.bot && m.author.id!=="690342724335173823") {
        for (var i = 0; i < c.map["236928901522259968"].length; i++) {
            if (m.content.indexOf(c.map["236928901522259968"][i].name) > -1) {
                f = true;
                c.center(
                    "236928901522259968",
                    c.map["236928901522259968"][i],
                    m.channel,
                    m.author,
                    m.content
                );
                break;
            } else if (m.content.indexOf(c.map["720299122489294889"][i].name) > -1) {
                f = true;
                c.center(
                    "720299122489294889",
                    c.map["720299122489294889"][i],
                    m.channel,
                    m.author,
                    m.content
                );
                break;
            }
        }
    }
    for (var i = 0; i < g.length; i++) {
        if ((g[i].turn === 0 && g[i].players[0] === m.author)
         || (g[i].turn === 1 && g[i].players[1] === m.author)) {
            svgbot.tictactoe.act(g[i], m.content);
            break;
        }
    }
}
events.messageDelete = function(m) {
    // 
}
events.reactionAdd = function(r, u) {
    //
};
events.reactionRemove = function(r, u) {
    //
};
events.newMember = function(m) {
    m.guild.channels.cache.get(svgbot.channels.general[m.guild.id])
        .send(svgbot.strings.newMemberMsg(
            svgbot.servers[m.guild.id],
            m.id,
            svgbot.channels.welcome[m.guild.id]
        ));
};
events.memberLeave = function(m) {
    m.guild.channels.cache.get(svgbot.channels.general[m.guild.id])
        .send(svgbot.strings.memberLeaveMsg(
            svgbot.servers[m.guild.id],
            m.user.username,
            m.user.discriminator
        ));
};
servers["236928901522259968"] = 0;
servers["720299122489294889"] = 1;
channels.welcome = {
    "236928901522259968": "365586749352837120",
    "720299122489294889": "720315483110244384"
};
channels.general = {
    "236928901522259968": "236928901522259968",
    "720299122489294889": "720299122967707710"
};
strings.newMemberMsg = function(a, b, c) {
    switch (a) {
        case 0:
            return "<@" + b +
                ">, приветствую тебя и добро пожаловать на сервер S.V.G-ея.\nЗдесь ты можешь пообщаться с другими прекрасными людьми и провести хорошо время.\nНе забудь ознакомиться с <#"
                + c + ">, если ты этого еще не сделал.";
            break;
        case 1:
            return "Welcome <@" + b +
                "> to S.V.G's International Server.\nHere you can communicate with other good people and have fun.\nDon't forget to check <#"
                + c + "> if you haven't done.";
            break;
    }
};
strings.memberLeaveMsg = function(a, b, c) {
    switch (a) {
        case 0:
            return b + "#" + c + " покинул(-а) нас, но обещал(-а) когда-нибудь вернуться.";
            break;
        case 1:
            return b + "#" + c + " left us but promised to return back sometime.";
            break;
    }
};
strings.snapLog = function(a, b) {
    switch (a) {
        case 0:
            return "<@" + b + "> дал(а) щелбан ";
            break;
        case 1:
            return "<@" + b + "> snapped ";
            break;
    }
};
strings.snapDirect = function(a, b, c) {
    switch (a) {
        case 0:
            return b + "#" + c + " дал(а) вам щелбан";
            break;
        case 1:
            return b + "#" + c + " snapped you";
            break;
    }
};
strings.hugLog = function(a, b) {
    switch (a) {
        case 0:
            return "<@" + b + "> обнял(а) ";
            break;
        case 1:
            return "<@" + b + "> hugged ";
            break;
    }
};
strings.hugDirect = function(a, b, c) {
    switch (a) {
        case 0:
            return b + "#" + c + " обнял(а) вас";
            break;
        case 1:
            return b + "#" + c + " hugged you";
            break;
    }
};
strings.fagLog = function(a, b, c, d) {
    switch (a) {
        case 0:
            return "При помощи особых подсчетов по специальным формулам,\nбыло выяснено, что " + b + " на "
                + c + "% является пидором.\n> ну а остальные " + d + "%, тут уже простите, куда деваться";
            break;
        case 1:
            return "By using complicated calculations and special formulas\nwere detected that " + b + " is "
                + c + "% gay";
            break;
    }
};
tictactoe.act = function(a, b) {
    var c = "";
    switch (a.turn) {
        case 0:
            if (b && b.length === 2) {
                if (b[0] === "1") {
                    if (b[1] === "1" && !a.cells[0]) {
                        a.cells[0] = 1;
                    } else if (b[1] === "2" && !a.cells[1]) {
                        a.cells[1] = 1;
                    } else if (b[1] === "3" && !a.cells[2]) {
                        a.cells[2] = 1;
                    }
                } else if (b[0] === "2") {
                    if (b[1] === "1" && !a.cells[3]) {
                        a.cells[3] = 1;
                    } else if (b[1] === "2" && !a.cells[4]) {
                        a.cells[4] = 1;
                    } else if (b[1] === "3" && !a.cells[5]) {
                        a.cells[5] = 1;
                    }
                } else if (b[0] === "3") {
                    if (b[1] === "1" && !a.cells[6]) {
                        a.cells[6] = 1;
                    } else if (b[1] === "2" && !a.cells[7]) {
                        a.cells[7] = 1;
                    } else if (b[1] === "3" && !a.cells[8]) {
                        a.cells[8] = 1;
                    }
                }
                a.turn = 1;
                if (svgbot.tictactoe.check(a, 1)) {
                    a.board.send(svgbot.tictactoe.log(
                        svgbot.servers[a.board.guild.id],
                        a.players[0].id
                    ));
                    clearTimeout(a.time);
                    for (var i = 0; i < svgbot.tictactoe.length; i++) {
                        if (svgbot.tictactoe[i] === a) {
                            svgbot.tictactoe.pop(i);
                            break;
                        }
                    }
                }
            }
            for (var i = 0; i < a.cells.length; i++) {
                switch (a.cells[i]) {
                    case 0:
                        c += ":black_large_square:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                    case 1:
                        c += ":o:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                    case 2:
                        c += ":x:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                }
            }
            a.board.send("<@" + a.players[0].id + "> vs <@" + a.players[1].id + ">");
            a.board.send(c);
            break;
        case 1:
            if (b && b.length === 2) {
                if (b[0] === "1") {
                    if (b[1] === "1" && !a.cells[0]) {
                        a.cells[0] = 2;
                    } else if (b[1] === "2" && !a.cells[1]) {
                        a.cells[1] = 2;
                    } else if (b[1] === "3" && !a.cells[2]) {
                        a.cells[2] = 2;
                    }
                } else if (b[0] === "2") {
                    if (b[1] === "1" && !a.cells[3]) {
                        a.cells[3] = 2;
                    } else if (b[1] === "2" && !a.cells[4]) {
                        a.cells[4] = 2;
                    } else if (b[1] === "3" && !a.cells[5]) {
                        a.cells[5] = 2;
                    }
                } else if (b[0] === "3") {
                    if (b[1] === "1" && !a.cells[6]) {
                        a.cells[6] = 2;
                    } else if (b[1] === "2" && !a.cells[7]) {
                        a.cells[7] = 2;
                    } else if (b[1] === "3" && !a.cells[8]) {
                        a.cells[8] = 2;
                    }
                }
                a.turn = 0;
                if (svgbot.tictactoe.check(a, 2)) {
                    a.board.send(svgbot.tictactoe.log(
                        svgbot.servers[a.board.guild.id],
                        a.players[1].id
                    ));
                    clearTimeout(a.time);
                    for (var i = 0; i < svgbot.tictactoe.length; i++) {
                        if (svgbot.tictactoe[i] === a) {
                            svgbot.tictactoe.pop(i);
                            break;
                        }
                    }
                }
            }
            for (var i = 0; i < a.cells.length; i++) {
                switch (a.cells[i]) {
                    case 0:
                        c += ":black_large_square:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                    case 1:
                        c += ":o:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                    case 2:
                        c += ":x:";
                        if (i === 2 || i === 5 || i === 8) {
                            c += "\n";
                        }
                        break;
                }
            }
            a.board.send("<@" + a.players[0].id + "> vs <@" + a.players[1].id + ">");
            a.board.send(c);
            break;
    }
};
tictactoe.check = function(a, c) {
    var b = a.cells;
    if (b[0] === c && b[4] === c && b[8] === c) {
        return true;
    } else if (b[2] === c && b[4] === c && b[6] === c) {
        return true;
    } else if (b[0] === c && b[1] === c && b[2] === c) {
        return true;
    } else if (b[3] === c && b[4] === c && b[5] === c) {
        return true;
    } else if (b[6] === c && b[7] === c && b[8] === c) {
        return true;
    } else if (b[0] === c && b[3] === c && b[6] === c) {
        return true;
    } else if (b[1] === c && b[4] === c && b[7] === c) {
        return true;
    } else if (b[2] === c && b[5] === c && b[8] === c) {
        return true;
    } else {
        return false;
    }
};
tictactoe.log = function(a, b) {
    switch(a) {
        case 0:
            return "<@" + b + "> выиграл(а)!";
            break;
        case 1:
            return "<@" + b + "> won!";
            break;
    }
};
client.login("...");
client.on("message", events.message);
client.on("messageDelete", events.messageDelete);
client.on("messageReactionAdd", events.reactionAdd);
client.on("messageReactionRemove", events.reactionRemove);
client.on("guildMemberAdd", events.newMember);
client.on("guildMemberRemove", events.memberLeave);
workers.neptunia_reddit = new Worker("./neptunia_reddit.js");
workers.neptunia_reddit.on("error", () => {
    svgbot.workers.restart_worker("neptunia_reddit");
});
workers.restart_worker = function(a) {
    delete svgbot.workers[a];
    svgbot.workers[a] = new svgbot.Worker("./src/" + a + ".js");
    svgbot.workers[a].on("error", () => {
        svgbot.workers.restart_worker(a);
    });
};
module.exports = {
    Discord,
    Vibrant,
    Worker,
    client,
    welcome,
    commands,
    events,
    servers,
    channels,
    strings,
    tictactoe,
    workers
};