var check = (a, b, c) => {
    var d = svgbot.serversData.tttstatus,
        r = false;
    for (var i in d)
        if (d[i].guild === a
         && d[i].channel === b
         && (!d[i].turn
         && d[i].playera === c)
         || (d[i].turn
         && d[i].playerb === c)
        ) {
            r = true;
            break;
        }
    return r;
};
var turn = (a, b, c, d, e) => {
    svgbot.workers.tictactoe.postMessage({
        action: "turn",
        guild: a,
        channel: b,
        player: c,
        position: [d, e]
    });
};
var execute = {
    start: a => {
        svgbot.serversData.tttstatus[svgbot.serversData.tttstatus.length] = {
            guild: a.guild,
            channel: a.channel,
            playera: a.playera,
            playerb: a.playerb,
            turn: a.turn
        };
        svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
            .channels.cache.get(a.channel).send({
                embed: {
                    color: "0xff0000",
                    description: a.guild
                        ? "**<@" + a.playera + "> started a tic-tac-toe game with <@" + a.playerb + ">**"
                        : "**<@" + a.playera + "> начал игру в крестики-нолики с <@" + a.playerb + ">**",
                    footer: {
                        text: a.guild
                            ? "Game lasts 60 seconds. After that time, sending numbers won't give result."
                            : "Игра длится 60 секунд. После этого, ввод цифр не даст никакого результата."
                    },
                    fields: [
                        {
                            name: a.guild ? "How to play" : "Как играть",
                            value: a.guild
                                ? "Board size is 3x3.\nType message with two numbers to make a turn. (from 1 to 3)\nFirst number is horizontal position of cell.\nSecond number is vertical position of cell."
                                : "Размер доски - 3x3.\nНапиши сообщение с двумя цифрами. (от 1 до 3)\nПервая цифра отвечает за позицию ячейки по горизонтали.\nВторая цифра отвечает за позицию ячейки по вертикали."
                        }
                    ]
                }
            }).then(b => {
                if (!(a.playerb === svgbot.serversData.bot && a.turn))
                    b.channel.send(a.guild
                        ? a.turn
                            ? "<@" + a.playerb + ">'s first turn."
                            : "<@" + a.playera + ">'s first turn."
                        : a.turn
                            ? "<@" + a.playerb + "> ходит первым."
                            : "<@" + a.playera + "> ходит первым."
                    ).then(() => {
                    
                }).catch(e => {
                    svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
            svgbot.terminal.log({
                content: ":information_source: tictactoe worker: started game with players `"
                    + a.playera + "` and `" + a.playerb + "`.",
                embed: {
                    color: "0xff0000",
                    description: "```js\n{\naction: " + a.action + ",\nguild: " + b.guild.id +
                        ",\nchannel: " + b.channel.id + ",\nplayera: " + a.playera + ",\nplayerb: " + a.playerb +
                        ",\nturn: " + a.turn + "\n}\n```[Link to message](https://discord.com/channels/" +
                        b.guild.id + "/" + b.channel.id + "/" + b.id + ")"
                }
            });
        }).catch(e => {
            svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                + e.message + "\n" + e.stack + "```");
        });
    },
    stop: a => {
        var b = svgbot.serversData.tttstatus,
            d = "";
        for (var i in b)
            if (b[i].guild === a.guild
             && b[i].channel === a.channel
             && b[i].playera === a.playera
             && b[i].playerb === a.playerb
            ) {
                b.splice(i, 1);
                break;
            }
        if (a.winner !== undefined || a.draw !== undefined)
            for (var i in a.board)
                switch (a.board[i]) {
                    case 0:
                        d += ":black_large_square:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                    case 1:
                        d += ":o:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                    case 2:
                        d += ":x:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                }
        svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
            .channels.cache.get(a.channel).send({
                embed: {
                    color: "0xff0000",
                    description: "**<@" + a.playera + "> vs <@" + a.playerb + ">.**",
                    fields: [
                        {
                            name: a.guild ? "Game has ended" : "Игра окончена",
                            value: a.winner !== undefined
                                ? (a.guild
                                    ? "<@" + (a.winner?a.playerb:a.playera) + "> is a winner."
                                    : "<@" + (a.winner?a.playerb:a.playera) + "> побеждает.")
                                : a.draw !== undefined
                                    ? (a.guild ? "Draw." : "Ничья.")
                                    : (a.guild ? "Timer has passed." : "Время вышло.")
                        }
                    ]
                }
            }).then(c => {
                if (a.winner !== undefined || a.draw !== undefined)
                    c.channel.send(d).then(() => {

                    }).catch(e => {
                        svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                            + e.message + "\n" + e.stack + "```");
                    });
                svgbot.terminal.log({
                    content: ":information_source: tictactoe worker: stopped game with players `"
                        + a.playera + "` and `" + a.playerb + "`.",
                    embed: {
                        color: "0xff0000",
                        description: "```js\n{\naction: " + a.action + ",\nguild: " + c.guild.id + ",\nchannel: " + c.channel.id +
                            ",\nplayera: " + a.playera + ",\nplayerb: " + a.playerb + ",\nwinner: " + a.winner +
                            "\n}\n```[Link to message](https://discord.com/channels/" +
                            c.guild.id + "/" + c.channel.id + "/" + c.id + ")"
                    }
                });
            }).catch(e => {
                svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                    + e.message + "\n" + e.stack + "```");
            });
    },
    turn: a => {
        var b = svgbot.serversData.tttstatus,
            c = undefined,
            d = "";
        for (var i in b)
            if (b[i].guild === a.guild
             && b[i].channel === a.channel
             && b[i].playera === a.playera
             && b[i].playerb === a.playerb
            ) {
                c = b[i];
                break;
            }
        if (c) {
            c.turn = a.turn;
            for (var i in a.board)
                switch (a.board[i]) {
                    case 0:
                        d += ":black_large_square:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                    case 1:
                        d += ":o:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                    case 2:
                        d += ":x:";
                        if (i == 2 || i == 5 || i == 8)
                            d += "\n";
                        break;
                }
            svgbot.client.guilds.cache.get(svgbot.serversData.guilds[a.guild])
                .channels.cache.get(a.channel).send({
                    embed: {
                        color: "0xff0000",
                        description: "**<@" + a.playera + "> vs <@" + a.playerb + ">.**"
                    }
                }).then(x => {
                    x.channel.send(d).then(x => {
                        x.channel.send(a.guild
                            ? a.turn
                                ? "<@" + a.playerb + ">'s turn."
                                : "<@" + a.playera + ">'s turn."
                            : a.turn
                                ? "<@" + a.playerb + "> ходит."
                                :"<@" + a.playera + "> ходит."
                        ).then(x => {
                            
                        }).catch(e => {
                            svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                                + e.message + "\n" + e.stack + "```");
                        });
                    }).catch(e => {
                        svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                            + e.message + "\n" + e.stack + "```");
                    });
                }).catch(e => {
                    svgbot.terminal.log(":warning: tictactoe worker: something went wrong while sending message.\n```js\n"
                        + e.message + "\n" + e.stack + "```");
                });
        }
    }
};

module.exports = {check, turn, execute};