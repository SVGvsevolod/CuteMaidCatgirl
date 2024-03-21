// Copyright 2020, S.V.G and FoxShadowhide

var workerSystem = require("worker_threads");
var fileSystem = require("fs");
var bot = "690342724335173823";
var status = [];
var ai = {
    states: require("./../../data/tictactoe.json"), // таблица состояний и их весов
    oldstate: undefined // последнее состояние доски
};
var start = (a, b, c, d) => {
    var e = status[status.length] = {
        guild: a,
        channel: b,
        playera: c, // игрок
        playerb: d, // ии (если выбрали бота как соперника)
        turn: Math.round(Math.random()),
        time: 60,
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0] // игровая доска
    };
    workerSystem.parentPort.postMessage({
        action: "start",
        guild: a,
        channel: b,
        playera: c,
        playerb: d,
        turn: e.turn
    });
    // если соперник бот и его ход первый
    if (e.playerb === bot && e.turn)
        turn(a, b, d, undefined, true); // бот совершает ход
};
var stop = (a, b, c) => {
    var d = status[a];
    status.splice(a, 1);
    if (d.playerb === bot) {
        if (b !== undefined && b)
            correct(1);
        else if (b !== undefined && !b)
            correct(0);
        else if (c)
            correct(0.5);
        fileSystem.writeFile("data/tictactoe.json", JSON.stringify(ai.states), e => {
            workerSystem.parentPort.postMessage({
                action: "error",
                message: ":warning: There was error in saving worker data."
            });
        });
    }
    workerSystem.parentPort.postMessage({
        action: "stop",
        guild: d.guild,
        channel: d.channel,
        playera: d.playera,
        playerb: d.playerb,
        winner: b,
        draw: c,
        board: d.board
    });
};
var update = () => {
    for (var i in status)
        if (status[i].time)
            status[i].time--;
        else
            stop(i);
};
var turn = (a, b, c, d, z) => {
    // нахождение соответствующей игры и проверка, чей ход
    var e = undefined;
    for (var i in status)
        if (status[i].guild === a
         && status[i].channel === b
         && (!status[i].turn
         && status[i].playera === c)
         || (status[i].turn
         && status[i].playerb === c)
        ) {
            e = i;
            break;
        }
    if (e !== undefined) {
        var f = false, // флаг для победы
            g = true; // флаг для ничьи
        if (c === bot && status[e].turn && !d) {
            status[e].board[calculate(status[e].board,z)] = 2; // просчет ходов и выбор оптимального варианта
            ai.oldstate = status[e].board;
        } else {
            // расположение крестика/нолика в указанной позициии
            if (d[0] === "1") {
                if (d[1] === "1" && !status[e].board[0])
                    status[e].board[0] = status[e].turn ? 2 : 1;
                else if(d[1] === "2" && !status[e].board[1])
                    status[e].board[1] = status[e].turn ? 2 : 1;
                else if(d[1] === "3" && !status[e].board[2])
                    status[e].board[2] = status[e].turn ? 2 : 1;
            } else if (d[0] === "2") {
                if(d[1] === "1" && !status[e].board[3])
                    status[e].board[3] = status[e].turn ? 2 : 1;
                else if(d[1] === "2" && !status[e].board[4])
                    status[e].board[4] = status[e].turn ? 2 : 1;
                else if(d[1] === "3" && !status[e].board[5])
                    status[e].board[5] = status[e].turn ? 2 : 1;
            } else if (d[0] === "3") {
                if(d[1] === "1" && !status[e].board[6])
                    status[e].board[6] = status[e].turn ? 2 : 1;
                else if(d[1] === "2" && !status[e].board[7])
                    status[e].board[7] = status[e].turn ? 2 : 1;
                else if(d[1] === "3" && !status[e].board[8])
                    status[e].board[8] = status[e].turn ? 2 : 1;
            }
        }
        // проверка на победу
        if (status[e].board[0] === (status[e].turn ? 2 : 1)
         && status[e].board[4] === (status[e].turn ? 2 : 1)
         && status[e].board[8] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[2] === (status[e].turn ? 2 : 1)
         && status[e].board[4] === (status[e].turn ? 2 : 1)
         && status[e].board[6] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[0] === (status[e].turn ? 2 : 1)
         && status[e].board[1] === (status[e].turn ? 2 : 1)
         && status[e].board[2] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[3] === (status[e].turn ? 2 : 1)
         && status[e].board[4] === (status[e].turn ? 2 : 1)
         && status[e].board[5] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[6] === (status[e].turn ? 2 : 1)
         && status[e].board[7] === (status[e].turn ? 2 : 1)
         && status[e].board[8] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[0] === (status[e].turn ? 2 : 1)
         && status[e].board[3] === (status[e].turn ? 2 : 1)
         && status[e].board[6] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[1] === (status[e].turn ? 2 : 1)
         && status[e].board[4] === (status[e].turn ? 2 : 1)
         && status[e].board[7] === (status[e].turn ? 2 : 1))
            f = true;
        else if (status[e].board[2] === (status[e].turn ? 2 : 1)
         && status[e].board[5] === (status[e].turn ? 2 : 1)
         && status[e].board[8] === (status[e].turn ? 2 : 1))
            f = true;
        // проверка на ничью
        for (var i in status[e].board)
            if (!status[e].board[i]){
                g = false;
                break;
            }
        if (f)
            stop(e, status[e].turn); // остановка с объявлением победителя
        else if (g)
            stop(e, undefined, true); // остановка с объявлением ничьи
        else {
            status[e].turn = status[e].turn ? 0 : 1; // смена хода
            // если соперник бот и его ход настал
            if(status[e].playerb === bot && status[e].turn)
                turn(a, b, status[e].playerb); // бот совершает ход
            else
                workerSystem.parentPort.postMessage({
                    action: "turn",
                    guild: a,
                    channel: b,
                    playera: status[e].playera,
                    playerb: status[e].playerb,
                    turn: status[e].turn,
                    board: status[e].board
                });
        }
    }
};
var calculate = (a, b) => {
    var c = [], // пустые ячейки
        d = undefined;
    for (var i in a)
        if (!a[i])
            c[c.length] = i; // Запись пустых ячеек
    if (b || Math.random() * 100 < 5) {
        // зондирование если первый ход
        d = c[Math.floor(Math.random() * c.length)];
    } else {
        // жадный ход, где определяется куда лучше ставить
        var e = [], // ходы с вероятностью выигрыша
            g = []; // все выигрышные ходы
        for (var i in c) {
            // симулируем состояние игры на ход вперед
            var f = [...a];
            f[c[i]] = 2;
            e[e.length] = verify(f);
        }
        // определяем выгодный ход
        var h = e[0];
        for (var i = 0; i < e.length; i++)
            if (h < e[i])
                h = e[i];
        for (var i in e)
            if (e[i] === h)
                g[g.length] = i;
        correct(h);
        d = c[g[Math.floor(Math.random() * g.length)]];
    }
    return d;
};
var verify = a => {
    var b = 0.5;
    // проверяем вероятность выигрыша
    if ((a[0] === 1 && a[4] === 1) || (a[0] === 2 && a[4] === 2))
        b = a[8] === 2 ? 1 : 0;
    else if ((a[2] === 1 && a[4] === 1) || (a[2] === 2 && a[4] === 2))
        b = a[6] === 2 ? 1 : 0;
    else if ((a[0] === 1 && a[1] === 1) || (a[0] === 2 && a[1] === 2))
        b = a[2] === 2 ? 1 : 0;
    else if ((a[3] === 1 && a[4] === 1) || (a[3] === 2 && a[4] === 2))
        b = a[5] === 2 ? 1 : 0;
    else if ((a[6] === 1 && a[7] === 1) || (a[6] === 2 && a[7] === 2))
        b = a[8] === 2 ? 1 : 0;
    else if ((a[0] === 1 && a[3] === 1) || (a[0] === 2 && a[3] === 2))
        b = a[6] === 2 ? 1 : 0;
    else if ((a[1] === 1 && a[4] === 1) || (a[1] === 2 && a[4] === 2))
        b = a[7] === 2 ? 1 : 0;
    else if ((a[1] === 1 && a[4] === 1) || (a[2] === 2 && a[5] === 2))
        b = a[8] === 2 ? 1 : 0;
    else if (ai.states[JSON.stringify(a)])
        b = ai.states[JSON.stringify(a)];
    return b;
};
var correct = a => {
    // корректируем вес состояния
    if (ai.oldstate) {
        var b = verify(ai.oldstate);
        ai.states[JSON.stringify(ai.oldstate)] = b + 0.1 * (a - b);
    }
};

workerSystem.parentPort.on("message", a => {
    switch (a.action) {
        case "start":
            start(a.guild, a.channel, a.playera, a.playerb);
            break;
        case "turn":
            turn(a.guild, a.channel, a.player, a.position);
            break;
    }
});

setInterval(update, 1000);