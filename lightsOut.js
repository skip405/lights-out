(function(document){
    'use strict';

    var LightsOut = function(litOnLoad){
        this.numberOfLitOnLoad = litOnLoad;
        this.pad = document.createElement('div');
        this.pad.classList.add('lights-out');
        document.body.appendChild(this.pad);

        this.init();
    };

    LightsOut.prototype = {
        init: function(){
            this.pad.innerHTML = this.createSquares();
            this.rows = this.pad.getElementsByClassName('lights-out__row');
            this.buttons = this.pad.getElementsByTagName('button');
            this.buttonsLength = this.buttons.length;

            this.generateRandomLit(this.numberOfLitOnLoad);
            this.addListeners();
        },
        addListeners: function(){
            var self = this,
                target;

            this.pad.addEventListener('click', function(e){
                target = e.target;

                if( target.nodeName === 'BUTTON' ) {
                    self.toggleSquares(target.getAttribute('data-row'), target.getAttribute('data-column'));
                }
            })
        },
        generateRandomLit: function(numberOfSquaresToLight){
            for( var i = 0; i < numberOfSquaresToLight; i++ ) {
                this.buttons[Math.floor(Math.random() * this.buttonsLength)].classList.add('lights-out__btn--lit');
            }
        },
        toggleSquares: function(clickedRow, clickedColumn){
            var button, buttonRow, buttonCol;

            clickedRow = Number(clickedRow);
            clickedColumn = Number(clickedColumn);

            for(var i = 0; i < this.buttonsLength; i++) {
                button = this.buttons[i];
                buttonRow = button.getAttribute('data-row');
                buttonCol = button.getAttribute('data-column');

                if( buttonRow == clickedRow - 1 || buttonRow == clickedRow || buttonRow == clickedRow + 1 ){
                    if( buttonCol == clickedColumn - 1 || buttonCol == clickedColumn || buttonCol == clickedColumn + 1 ){
                        button.classList.toggle('lights-out__btn--lit');
                    }
                }
            }

            this.checkWin();
        },
        checkWin: function(){
            var lit = this.pad.getElementsByClassName('lights-out__btn--lit');

            if(lit.length == 0) {
                this.congratulate();
            }
        },
        congratulate: function(){
            alert('Congrats!');

            if( prompt('Again?') ) {
                this.reset();
            }
        },
        reset: function(){
            this.generateRandomLit(this.numberOfLitOnLoad);
        },
        createSquares: function(){
            var html = '<ol>',
                i, j, len, leng;

            for(i = 1, len = 5; i <= len; i++) {
                html += '<li class="lights-out__row" data-row="' + i + '">';
                for(j = 1, leng = 5; j <= leng; j++ ){
                    html += '<button type="button" data-row="' + i + '" data-column="' + j + '" class="lights-out__btn"></button>';
                }
                html += '</li>';
            }
            html += '</ol>';

            return html;
        }
    };

    document.addEventListener('DOMContentLoaded', function(){
        new LightsOut(1);
    });
})(document);