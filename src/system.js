var sendMessage = (a, b, c) => {
    if (a)
        return svgbot.client.guilds.cache.get(a)
            .channels.cache.get(b).send(c);
    else
        return svgbot.client.channels.cache.get(b).send(c);
};
var detectUsers = (a, b, c, d) => {
    if (typeof a === "string") {
        var e = [],
            f = a.split(",");
        for (var i in f) {
            var g = f[i].split(" ");
            for (var j in g)
                if (g[j].indexOf("<@") > -1 && g[j].indexOf("<@&") === -1)
                    e[e.length] = g[j].indexOf("<@!") > -1
                        ? {
                            user: g[j].split("<@!")[1].split(">")[0]
                        }
                        : {
                            user: g[j].split("<@")[1].split(">")[0]
                        };
                else if (g[j].length)
                    if (typeof e[e.length-1] === "string")
                        e[e.length-1] += e[e.length-1].length ? " " + g[j] : g[j];
                    else
                        e[e.length] = g[j];
            if (typeof e[e.length-1] === "string" && i < f.length-1)
                e[e.length] = "";
        }
        if (d)
            e = e.splice(0, 1);
        svgbot.system.detectUsers(e, b, c, d);
    } else if (typeof a === "object") {
        var i = 0;
        while (i <= a.length) {
            if (typeof a[i] === "string") {
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[b]).members.fetch({
                    query: a[i],
                    limit: 1
                }).then((x) => {
                    if (x.first())
                        a[i] = {
                            user: x.first().id
                        };
                    else
                        a.splice(i, 1);
                    svgbot.system.detectUsers(a, b, c, d);
                });
                break;
            } else if (i === a.length) {
                c(a, b);
                break;
            } else
                i++;
        }
    }
};
var _detectUsers = (a, b, c) => {
    if (typeof a === "string") {
        var d = [],
            e = a.split(" ");
        for (var i in e) {
            var f = e[i].split(",");
            for (var j in f)
                if (f[j].indexOf("<@") > -1 && f[j].indexOf("<@&") === -1)
                    d[d.length] = f[j].indexOf("<@!") > -1 ? {
                        user: f[j].split("<@!")[1].split(">")[0]
                    } : {
                        user: f[j].split("<@")[1].split(">")[0]
                    };
                else if (f[j].length)
                    d[d.length] = f[j];
        }
        svgbot.system.detectUsers(d, b, c);
    } else if (typeof a === "object") {
        var i = 0;
        while (i <= a.length) {
            if (typeof a[i] === "string") {
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[b]).members.fetch({
                    query: a[i],
                    limit: 1
                }).then((x) => {
                    if (x.first())
                        a[i] = {
                            user: x.first().id
                        };
                    else
                        a.splice(i, 1);
                    svgbot.system.detectUsers(a, b, c);
                });
                break;
            } else if (i === a.length) {
                for (var i = 0; i < a.length - 1 ; i++)
                    for (var j = i + 1; j < a.length; j++)
                        if (a[j].user === a[i].user)
                            a.splice(j, 1);
                c(a, b);
                break;
            } else
                i++;
        }
    }
};

module.exports = {sendMessage, detectUsers};