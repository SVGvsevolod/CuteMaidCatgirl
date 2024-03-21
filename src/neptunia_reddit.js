var workerSystem = require("worker_threads");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest;
var fileSystem = require("fs");
var past_post = require("../neptunia_reddit.json");
var url = "https://www.reddit.com/r/gamindustri/new.json?limit=1";
var new_post = undefined;
var posted = true;
var make_post = function(a, b) {
    if (!posted) {
        workerSystem.parentPort.postMessage({
            action: "post",
            title: a.title,
            description: a.selftext,
            url: "https://redd.it/" + a.id,
            image: a.url,
            author: a.author
        });
        fileSystem.writeFile("neptunia_reddit.json", b, (e) => {
            workerSystem.parentPort.postMessage({
                action: "post",
                error: e
            });
        });
        past_post = new_post;
        posted = true;
    }
};
xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        try {
            new_post = JSON.parse(this.responseText);
            if (past_post.data.children[0].data.id !== new_post.data.children[0].data.id) {
                posted = false;
                make_post(new_post.data.children[0].data, this.responseText);
            }
        } catch(e) {
            workerSystem.parentPort.postMessage({
                action: "post",
                error: e
            });
        }
    }
};
setInterval(() => {
    xhr.open("GET", url);
    xhr.send();
}, 5000);