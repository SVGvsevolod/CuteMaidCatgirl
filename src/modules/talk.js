var request = (a, b, c) => {
    svgbot.workers.worker_talk.postMessage({
        action: "talk",
        guild: a,
        channel: b,
        message: c
    });
};
var execute = (a, b, c) => {
    svgbot.guilds.cache.get(svgbot.serversData.guilds[a]).
        channels.cache.get(b).send(c).then(()=>{
        
        }).catch(()=>{
        
        });
};

module.exports = {request, execute};