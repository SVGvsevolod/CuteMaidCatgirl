var workerSystem = require("worker_threads");
var Vibrant = require("node-vibrant");
var patterns = {
    snap: [
        {
            pattern: ["targets", "string1", "initiator", "string2"],
            strings: [
                [" получили в лоб от ", " got hit in their foreheads from "],
                [".", "."]
            ]
        }, {
            pattern: ["initiator", "string1", "targets", "string2"],
            strings: [
                [" применил скилл `дать щелбан` на ", " used skill `snap` on "],
                [".", "."]
            ]
        }, {
            pattern: ["string1", "targets", "string2", "initiator", "string3"],
            strings: [
                ["Шокирующие новости: ", "Breaking news: "],
                [" были жестоко избиты щелбанами.\n", " were brutally snapped.\n"],
                [" подозревается в содеянном, но отказывается признаваться.", 
                " were suspected on this activity but refuse to confess."]
            ]
        }
    ],
    hug: [
        {
            pattern: ["targets", "string1", "initiator", "string2"],
            strings: [
                [" пострадали от безжалостных обнимашек от ", " were suffered from merciless hugs of "],
                [".", "."]
            ]
        }, {
            pattern: ["initiator", "string1", "targets", "string2"],
            strings: [
                [" совершил атаку обнимашками на ", " performed a hug attack on "],
                [".\nНикто не выжил.", ".\nThere is no survivors."]
            ]
        }, {
            pattern: ["targets", "string1", "initiator", "string2"],
            strings: [
                [" были взяты в заложники обнимашек ", " became a hostages of "],
                [".", " hugs."]
            ]
        }
    ],
    pat: [
        {
            pattern: ["initiator", "string1", "targets", "string2"],
            strings: [
                [" нежно погладил ", " gently patted "],
                [" по голове.", " on their heads."]
            ]
        }, {
            pattern: ["targets", "string1", "initiator", "string2"],
            strings: [
                [" почувствовади нежное прикосновение по голове от ", " is feeling gently touch on their heads from "],
                [".", "."]
            ]
        }
    ]
};
var getAvatarColors = (a, b, c, d) => {
    if (c < a.length)
        Vibrant.from(a[c]).getPalette().then(x => {
            b[c] = "0x" + Vibrant.Util.rgbToHex(
                x.Vibrant._rgb[0],
                x.Vibrant._rgb[1],
                x.Vibrant._rgb[2]
            ).split("#")[1];
            getAvatarColors(a, b, c + 1, d);
        }).catch(e => {
            workerSystem.parentPort.postMessage({
                command: "avatar",
                error: e
            });
        });
    else
        d(a, b);
};
var commands = {
    snap: (a, b, c, d) => {
        var p = Math.floor(Math.random() * patterns.snap.length),
            m = "";
        for (var i in patterns.snap[p].pattern) {
            if (patterns.snap[p].pattern[i] === "targets")
                for (var j in d)
                    if (j == d.length - 1)
                        m += "<@" + d[j].user + ">";
                    else
                        m += "<@" + d[j].user + ">, ";
            else if (patterns.snap[p].pattern[i] === "initiator")
                m += "<@" + c + ">";
            else if (!patterns.snap[p].pattern[i].indexOf("string"))
                m += patterns.snap[p].strings[parseInt(patterns.snap[p].pattern[i]
                    .charAt(patterns.snap[p].pattern[i].length - 1)) - 1][a];
        }
        workerSystem.parentPort.postMessage({
            command: "snap",
            guild: a,
            channel: b,
            message: m,
            dmmessage: a ? " snapped you." : " дал(а) щелбан вам.",
            initiator: c,
            targets: d
        });
    },
    hug: (a, b, c, d) => {
        var p = Math.floor(Math.random() * patterns.hug.length),
            m = "";
        for (var i in patterns.hug[p].pattern) {
            if (patterns.hug[p].pattern[i] === "targets")
                for (var j in d)
                    if (j == d.length - 1)
                        m += "<@" + d[j].user + ">";
                    else
                        m += "<@" + d[j].user + ">, ";
            else if (patterns.hug[p].pattern[i] === "initiator")
                m += "<@" + c + ">";
            else if (!patterns.hug[p].pattern[i].indexOf("string"))
                m += patterns.hug[p].strings[parseInt(patterns.hug[p].pattern[i]
                    .charAt(patterns.hug[p].pattern[i].length - 1)) - 1][a];
        }
        workerSystem.parentPort.postMessage({
            command: "hug",
            guild: a,
            channel: b,
            message: m,
            dmmessage: a ? " hugged you." : " обнял(а) вас.",
            initiator: c,
            targets: d
        });
    },
    pat: (a, b, c, d) => {
        var p = Math.floor(Math.random() * patterns.pat.length),
            m = "";
        for (var i in patterns.pat[p].pattern) {
            if (patterns.pat[p].pattern[i] === "targets")
                for (var j in d)
                    if (j == d.length - 1)
                        m += "<@" + d[j].user + ">";
                    else
                        m += "<@" + d[j].user + ">, ";
            else if (patterns.pat[p].pattern[i] === "initiator")
                m += "<@" + c + ">";
            else if (!patterns.pat[p].pattern[i].indexOf("string"))
                m += patterns.pat[p].strings[parseInt(patterns.pat[p].pattern[i]
                    .charAt(patterns.pat[p].pattern[i].length - 1)) - 1][a];
        }
        workerSystem.parentPort.postMessage({
            command: "pat",
            guild: a,
            channel: b,
            message: m,
            dmmessage: a ? " patted you." : " погладил(а) вас.",
            initiator: c,
            targets: d
        });
    },
    avatar: (a, b, c) => {
        getAvatarColors(c, [], 0, (x, y) => {
            workerSystem.parentPort.postMessage({
                command: "avatar",
                guild: a,
                channel: b,
                images: x,
                colors: y
            });
        });
    }
};

workerSystem.parentPort.on("message", a => {
    if (a)
        switch (a.command) {
            case "snap":
                commands.snap(a.guild, a.channel, a.initiator, a.targets);
                break;
            case "hug":
                commands.hug(a.guild, a.channel, a.initiator, a.targets);
                break;
            case "pat":
                commands.pat(a.guild, a.channel, a.initiator, a.targets);
                break;
            case "avatar":
                commands.avatar(a.guild, a.channel, a.images);
                break;
        }
});