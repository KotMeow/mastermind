/*jshint node: true, esversion: 6 */
'use strict';

exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        return {
            "retMsg": "coś o aktualnej koniguracji…",
            "size": req.params[2],
            "dim": req.params[4],
            "max": req.params[6],
            "puzzle": req.session.puzzle
        };
    };
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');


    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }
    res.json(newGame());
};

exports.mark = function (req, res) {
    const markAnswer = function () {
        let move = req.params[0].split('/').map(Number);
        move = move.slice(0, move.length - 1);
        var tempPuzzle = Array.from(req.session.puzzle.data);
        var result = {
            biale: 0,
            czarne: 0,
            wygrales: false
        };

        for (let i in move) {
            if (move[i] === tempPuzzle[i]) {
                result.czarne = result.czarne + 1;
                tempPuzzle[i] = null;
            } else if (tempPuzzle.indexOf(move[i]) != -1) {
                tempPuzzle[tempPuzzle.indexOf(move[i])] = null;
                result.biale = result.biale + 1;
            }
        }
        if (req.session.puzzle.size == result.czarne) {
          result.wygrales = true;
        }
        return {
            "move": move,
            "puzzle": req.session.puzzle,
            "result": result
        };
    };
    res.json(markAnswer());
};