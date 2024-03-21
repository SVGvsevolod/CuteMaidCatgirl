// Copyright 2020, S.V.G and FoxShadowhide

var workerSystem = require("worker_threads");
var fileSystem = require("fs");

var talk_in = require("./../../data/talk_in.json");
var talk_out = require("./../../data/talk_out.json");

var old_state = {
    a: undefined,
    b: undefined
};

var talk = (a, b, c) => {
    
    var d = Object.keys(talk_in),
        e = undefined;
    
    for (var i in d)
        if (c.toLowerCase().indexOf(d[i]) > -1) {
            e = i;
            break;
        }
    
    var f = talk_in[e],
        h = Object.keys(talk_out),
        g = [];
    
    for (var i in h)
        if (talk_out[h[i]] === f)
            g[g.length] = i;
    
    var k = [];
    
    for (var i in g)
        k[i] = verify(g[i], e)
    
    var l = [],
        m = k[0];
    
    for (var i in k)
        if (m < k[0])
            m = k[0];
    
    for (var i in k)
        if (k[i] === m)
            l[l.length] = i;
    
    var n = Math.random() * l.length;
    
    correct(m);
            
    old_state.a = n;
    old_state.b = e;
    
    workerSystem.parentPort.postMessage({
        action: "talk",
        guild: a,
        channel: b,
        message: talk_out[Object.keys(talk_out)[n]]
    });
    
};

var verify = (a,b) => {
    var c = 0.5;
    if (talk_out[Object.keys(talk_in)[a]] === talk_in[Object.keys(talk_in)[b]])
        c = 1;
    else if (talk_out[Object.keys(talk_in)[a]] !== talk_in[Object.keys(talk_in)[b]])
        c = 0;
    else if (talk_in[a])
        c = talk_in[a];
    return c;
};

var correct = a => {
    if (old_state) {
        var b = verify(old_state.a, old_state.b);
        talk_in[Object.keys(talk_in)[old_state]] = b + 0.1 * (a - b);
    }
};

workerSystem.parentPort.on("message", a => {
    switch (a.action) {
        case "talk":
            talk(a.guild, a.channel, a.message);
            break;
    }
});