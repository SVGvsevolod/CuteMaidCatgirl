var workerSystem = require("worker_threads");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require("request").defaults({
    encoding: null
});
var fileSystem = require("fs");
var xhr = new XMLHttpRequest;

var pixivExtract = (a, o, p) => {
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var b = JSON.parse(this.responseText).body,
                c = [ [] ];
            if (b.pageCount > 1) {
                var d = b.urls.regular.split("p0"),
                    e = (f, g, h) => {
                        if (g < h) {
                            var i = f[0] + "p" + g + f[1],
                                j = i.split("/")[i.split("/").length - 1];
                            request.get(i, {
                                headers: {
                                    "Referer": "https://www.pixiv.net/"
                                }
                            }, function(k, l, m) {
                                fileSystem.writeFile("svgbot/pixivdata/" + j, m, (n) => {
                                    c[c.length - 1][c[c.length - 1].length] = {
                                        attachment: "svgbot/pixivdata/" + j,
                                        name: j
                                    };
                                    if (!((g + 1) % 10))
                                        c[c.length] = [];
                                    e(f, g+1, h);
                                });
                            });
                        } else {
                            workerSystem.parentPort.postMessage({
                                guild: o,
                                channel: p,
                                files: c
                            });
                        }
                    };
                e(d, 0, b.pageCount);
            } else {
                var d = b.urls.regular.split("/")[b.urls.regular.split("/").length - 1]
                request.get(b.urls.regular, {
                    headers: {
                        "Referer": "https://www.pixiv.net/"
                    }
                }, function(k, l, m) {
                    fileSystem.writeFile("svgbot/pixivdata/" + d, m, (n) => {
                        c[c.length - 1][c[c.length - 1].length] = {
                            attachment: "svgbot/pixivdata/" + d,
                            name: d
                        };
                        workerSystem.parentPort.postMessage({
                            guild: o,
                            channel: p,
                            files: c
                        });
                    });
                });
            }
        }
    };
    xhr.open("GET", "https://www.pixiv.net/ajax/illust/" + a);
    xhr.send();
};

workerSystem.parentPort.on("message", (a) => {
    if (a && a.url) {
        if (a.url.indexOf("pixiv.net") > -1 && a.url.indexOf("artworks/") > -1) {
            pixivExtract(a.url.split("artworks/")[1].split("?")[0], a.guild, a.channel);
        }
    }
});