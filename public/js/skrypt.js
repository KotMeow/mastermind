/*jshint jquery: true, devel: true, esversion: 6 */
$(function () {
    'use strict';
    var moves = 1;
    var gameAreaInput = $('.game-area-input');
    $('#startGame').on('click', function () {
        var numberOfMoves = $('#numberOfMoves').val();
        var lengthOfCode = $('#lengthOfCode').val();
        var numberOfColors = $('#numberOfColors').val();
        $.get(`/play/size/${lengthOfCode}/dim/${numberOfColors}/max/${numberOfMoves}/`, function (data) {
            $('.game-info').html(`Długość twojego kodu wynosi ${data.puzzle.size}, masz ${data.puzzle.max} ruchów by go odgadnąć.`);
            console.log(data.puzzle.data);
        });

        $('.start-game-form').hide();
        $(this).hide();
        $('.game-area').show();
    });
    $('#send').on('click', function () {
        var mark = $('#code' + moves).val().split('').join('/');
        $.get(`/mark/${mark}/`, function (data) {
            console.log(data);
            for (let i = 0; i < data.result.czarne; i++) {
                gameAreaInput.append('<i class="fa fa-circle fa-2x" aria-hidden="true"></i>');
            }
            for (let i = 0; i < data.result.biale; i++) {
                gameAreaInput.append('<i class="fa fa-circle-o fa-2x" aria-hidden="true"></i>');
            }
            gameAreaInput.append(`<br><input class="input code-input" type="number" id="code${moves}">`);
            $('.game-info').html(`Długość twojego kodu wynosi ${data.puzzle.size}, masz ${data.puzzle.max-moves} ruchów by go odgadnąć.`);
        });
        moves = moves + 1;
        console.log(moves);
    });
});