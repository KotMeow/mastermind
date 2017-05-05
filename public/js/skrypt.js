/*jshint jquery: true, devel: true, esversion: 6 */
$(function () {
  'use strict';
  var moves = 1;
  var gameAreaInput = $('.game-area-input');
  var gameInfo = $('.game-info');
  var restartButton = $('#restart');
  var sendButton = $('#send');
  restartButton.hide();

  var enter = function (e) {
    if (e.which == 13) sendButton.click();
  };
  $('#startGame').on('click', function () {
    var numberOfMoves = $('#numberOfMoves').val() ? $('#numberOfMoves').val() : 5;
    var lengthOfCode = $('#lengthOfCode').val() ? $('#lengthOfCode').val() : 5;
    var numberOfColors = $('#numberOfColors').val() ? $('#numberOfColors').val() : 5;

    $.get(`/play/size/${lengthOfCode}/dim/${numberOfColors}/max/${numberOfMoves}/`, function (data) {
      gameInfo.html(`Długość twojego kodu wynosi ${data.puzzle.size}, masz ${data.puzzle.max} ruchów by go odgadnąć.`);
      gameAreaInput.append(`<input class="input code-input" type="text" maxlength="${data.puzzle.size}" id="code1">`);
    });
    sendButton.show();
    $('.start-game-form').hide();
    $(this).hide();
    $('.game-area').show();
  });
  sendButton.on('click', function () {
    var mark = $('#code' + moves).val().split('').join('/');
    if (mark === '') return;
    $.get(`/mark/${mark}/`, function (data) {
      var liczbaRuchow = Number(data.puzzle.max) - moves;
      var ruch = liczbaRuchow < 5 ? 'ruchy' : 'ruchów';
      if (liczbaRuchow == 1) ruch = 'ruch';
      for (let i = 0; i < data.result.czarne; i++) {
        gameAreaInput.append('<i class="fa fa-circle fa-2x" aria-hidden="true"></i> ');
      }
      for (let i = 0; i < data.result.biale; i++) {
        gameAreaInput.append('<i class="fa fa-circle-o fa-2x" aria-hidden="true"></i> ');
      }
      if (data.result.wygrales) {
        gameInfo.html('Brawo! Odgadłeś kod!');
        sendButton.hide();
        restartButton.show();
        $('.game-area-input').off('keypress');
      } else if (liczbaRuchow < 1) {
        gameInfo.html('Wykorzystałeś wszystkie ruchy. Game over!');
        sendButton.hide();
        restartButton.show();
        $('.game-area-input').off('keypress');
      } else {
        gameInfo.html(`Długość twojego kodu wynosi ${data.puzzle.size}, masz ${Number(data.puzzle.max)-moves} ${ruch} by go odgadnąć.`);
        moves = moves + 1;
        gameAreaInput.append(`<br><input class="input code-input" type="text" maxlength="${data.puzzle.size}" id="code${moves}">`);
      }
      $('.code-input').last().focus();

    });

  });
  restartButton.on('click', function () {
    gameAreaInput.html(' ');
    $('.start-game-form').show();
    $('#startGame').show();
    $(this).hide();
    gameInfo.html(' ');
    moves = 1;
    $('.game-area-input').on('keypress', 'input', enter);
  });
  $('.game-area-input').on('keypress', 'input', enter);

});