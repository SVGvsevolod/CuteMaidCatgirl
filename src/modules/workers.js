function Workers() {}

var _w_init = () => {
    Workers.prototype.workerSystem = require("worker_threads");
    Workers.prototype.start = (a, b, d, e) => {
        var w = svgbot.workers[a] = 
            new svgbot.workers.workerSystem.Worker("./svgbot/workers/" + a + ".js");
        w.on("online", () => {
            svgbot.terminal.log(":information_source: Worker " + a + " has been started.");
            if (b)
                w.postMessage(b);
        });
        w.on("message", x => {
            d(x);
        });
        w.on("error", x => {
            svgbot.terminal.log(":warning: Worker " + a + " encountered an error:\n```js\n"
                + x.message + "\n" + x.stack + "```");
            if (e)
                svgbot.workers.start(a, b, d, e);
        });
        w.on("exit", x => {
            svgbot.terminal.log(":information_source: Worker " + w.name +
                " was closed with exit code " + x);
            if (e)
                svgbot.workers.start(a, b, d, e);
        });
    };
    return new Workers();
};

module.exports = {Workers, _w_init};