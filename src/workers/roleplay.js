var workerSystem = require("worker_threads");
var fileSystem = require("fs");
var data = require("./../../data/roleplay_data.json");
var ids = {
    everyone: ["236928901522259968", "720299122489294889"],
    ownerrole: ["690245557054341188", "720350403404890193"],
    botrole: ["692188817687445543", "720350833618976882"]
};
var create = (a, b, d) => {
    var p = b.split(" "),
        n = p[0],
        s = "",
        m = false,
        c = [],
        e = [],
        f = false;
        c[c.length] = {
        id: d,
        allow: 379968,
        deny: 805449745
    };
    for (var i = 1; i < p.length; i++) {
        if (!p[i].indexOf("nsfw") || !p[i].indexOf("<@")) {
            if (!p[i].indexOf("nsfw"))
                m = true;
            else {
                var u = !p[i].indexOf("<@!")
                    ? p[i].slice(3, p[i].length-1)
                    : p[i].slice(2, p[i].length-1),
                    h = false;
                for (var j in data.forbidden)
                    if (data.forbidden[j] === u) {
                        h = true;
                        break;
                    }
                if (h)
                    f = true;
                else {
                    c[c.length] = {
                        id: u,
                        allow: 379968,
                        deny: 805449745
                    };
                    e[e.length] = u;
                }
            }
        } else
            s += p[i] + " ";
    };
    c[c.length] = {
        id: ids.everyone[a],
        allow: 0,
        deny: 871890769
    };
    c[c.length] = {
        id: ids.ownerrole[a],
        allow: 805829713,
        deny: 0
    };
    c[c.length] = {
        id: ids.botrole[a],
        allow: 805829713,
        deny: 66061056
    };
    workerSystem.parentPort.postMessage({
        action: "create",
        guild: a,
        name: n,
        startMessage: s,
        permissions: c,
        nsfw: m,
        initiator: d,
        participants: e,
        forbidden: f
    });
};
var invite = (a, b, c) => {
    var d = c.split(" "),
        e = [],
        f = false;
    for (var i = 0; i < d.length; i++)
        if (!d[i].indexOf("<@")){
            var u = !d[i].indexOf("<@!")
                ? d[i].slice(3, d[i].length-1)
                : d[i].slice(2, d[i].length-1),
                h = false;
            for (var j in data.forbidden)
                if (data.forbidden[j] === u) {
                    h = true;
                    break;
                }
            if (h)
                f = true;
            else {
                data.channels[b][data.channels[b].length] = {
                    id: u,
                    allow: 379968,
                    deny: 805449745
                };
                e[e.length] = u;
            }
        }
    workerSystem.parentPort.postMessage({
        action: "invite",
        guild: a,
        id: b,
        permissions: data.channels[b],
        invited: e,
        forbidden: f
    });
};
var exclude = (a, b, c) => {
    var d = c.split(" "),
        e = [];
    for (var i = 0; i < d.length; i++)
        if (!d[i].indexOf("<@")) {
            var u = !d[i].indexOf("<@!")
                ? d[i].slice(3, d[i].length-1)
                : d[i].slice(2, d[i].length-1);
            for (var j = 0; j < data.channels[b].length; j++)
                if (data.channels[b][j].id === u) {
                    data.channels[b].splice(j, 1);
                    break;
                }
            e[e.length] = u;
        }
    workerSystem.parentPort.postMessage({
        action: "exclude",
        guild: a,
        id: b,
        permissions: data.channels[b],
        excluded: e
    });
};
var close = (a, b) => {
    delete data.channels[b];
    update();
    workerSystem.parentPort.postMessage({
        action: "close",
        guild: a,
        id: b
    });
};
var update = (a, b) => {
    if (a)
        data.forbidden = a;
    if (b)
        for (var i in Object.keys(b))
            data.channels[Object.keys(b)[i]] = b[Object.keys(b)[i]];
    fileSystem.writeFile("data/roleplay_data.json", JSON.stringify(data), e => {
        workerSystem.parentPort.postMessage({
            action: "error",
            message: ":warning: There was error in saving worker data."
        });
    });
    workerSystem.parentPort.postMessage({
        action: "update",
        forbidden: data.forbidden,
        channels: Object.keys(data.channels)
    });
};

workerSystem.parentPort.on("message", a => {
    if (a) {
        switch (a.action) {
            case "create":
                create(a.guild, a.data, a.initiator);
                break;
            case "invite":
                invite(a.guild, a.id, a.data);
                break;
            case "exclude":
                exclude(a.guild, a.id, a.data);
                break;
            case "close":
                close(a.guild, a.id);
                break;
            case "update":
                update(a.forbidden, a.channels);
                break;
        }
    }
});

workerSystem.parentPort.postMessage({
    action: "update",
    forbidden: data.forbidden,
    channels: Object.keys(data.channels)
});