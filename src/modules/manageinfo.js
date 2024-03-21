var create = {
    welcome: a => {
        switch (a) {
            case 0:
                var b = require("../../data/welcome_ru.json");
                for (var i in b)
                    svgbot.client.guilds.cache.get(svgbot.serversData.guilds[0])
                        .channels.cache.get(svgbot.serversData.channels.welcome[0])
                        .send(b[i]);
                break;
            case 1:
                var b = require("../../data/welcome_en.json");
                for (var i in b)
                    svgbot.client.guilds.cache.get(svgbot.serversData.guilds[1])
                        .channels.cache.get(svgbot.serversData.channels.welcome[1])
                        .send(b[i]);
                break;
        };
    },
    servermap: a => {
        switch (a) {
            case 0:
                var b = require("../../data/servermap_ru.json");
                for (var i in b)
                    svgbot.client.guilds.cache.get(svgbot.serversData.guilds[0])
                        .channels.cache.get(svgbot.serversData.channels.servermap[0])
                        .send(b[i]);
                break;
            case 1:
                var b = require("../../data/servermap_en.json");
                for (var i in b)
                    svgbot.client.guilds.cache.get(svgbot.serversData.guilds[1])
                        .channels.cache.get(svgbot.serversData.channels.servermap[1])
                        .send(b[i]);
                break;
        };
    }
};
var clear = {
    welcome: a => {
        switch (a) {
            case 0:
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[0])
                    .channels.cache.get(svgbot.serversData.channels.welcome[0])
                    .messages.fetch().then(m => {
                        var b = m.array();
                        for (var i in b)
                            b[i].delete();
                    }).catch(() => {});
                break;
            case 1:
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[1])
                    .channels.cache.get(svgbot.serversData.channels.welcome[1])
                    .messages.fetch().then(m => {
                        var b = m.array();
                        for (var i in b)
                            b[i].delete();
                    }).catch(() => {});
                break;
        };
    },
    servermap: a => {
        switch (a) {
            case 0:
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[0])
                    .channels.cache.get(svgbot.serversData.channels.servermap[0])
                    .messages.fetch().then(m => {
                        var b = m.array();
                        for (var i in b)
                            b[i].delete();
                    }).catch(() => {});
                break;
            case 1:
                svgbot.client.guilds.cache.get(svgbot.serversData.guilds[1])
                    .channels.cache.get(svgbot.serversData.channels.servermap[1])
                    .messages.fetch().then(m => {
                        var b = m.array();
                        for (var i in b)
                            b[i].delete();
                    }).catch(() => {});
                break;
        };
    }
}

module.exports = {create, clear};