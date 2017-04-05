/*jshint jquery: true, devel: true */
$(function () {
    $('#startGame').on('click', function () {
        var numberOfMoves = $('#numberOfMoves').val();
        var lengthOfCode = $('#lengthOfCode').val();
        var numberOfColors = $('#numberOfColors').val();
        $.get(`/play/size/${lengthOfCode}/dim/${numberOfColors}/max/${numberOfMoves}/`, function (data) {
            console.log(data);
        });
    });
});