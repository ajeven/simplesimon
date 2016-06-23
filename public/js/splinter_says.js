$(document).ready(function() {
	"use strict";
	
var splinter = {
	sequence: [],
	copy: [],
	music: null,
	round: 0,
	active: true,

		startGame: function(){
			this.music = new Audio("/mp3/turtle_theme.mp3");
			this.music.play();
			this.sequence = [];
			this.copy = [];
			this.round = 0;
			this.active = true;
			this.newRound();
		},
		newRound: function(){
			$("#lvl").text(++this.round);
			this.sequence.push(this.randomNumber());
			this.copy = [];
			this.animate(this.sequence);
		},
		findNext: function(){
			if(this.copy.join() == this.sequence.slice(0, this.copy.length).join()) {
				if (this.copy.length == this.sequence.length) {
					this.newRound();
					this.turnOff();
				}
			} else {
				this.gameOver();
				this.turnOff();
			}
		},
		animate: function(sequence) {
			var i = 0;
			var that = this;
			var interval = setInterval(function(){
				that.show(sequence[i]);
				i++;
				if(i == sequence.length) {
					clearInterval(interval);
					that.activateGame();
				}
			}, 600);
		},
		show: function(tile) {
			var $tile = $("[data-tile=" + tile + "]").addClass("active");
			window.setTimeout(function(){
				$tile.removeClass("active");
			}, 300);
		},
		activateGame: function() {
		$(".tile")
			.on("mouseenter", function(){
			$(this).addClass("active")
		})
			.on("mouseleave", function(){
			$(this).removeClass("active")
		});
		},
		playerInput: function(event) {
			var isCorrect = this.copy;
			var  inputCorrect = $(event.target).attr("data-tile");
			this.copy.push(inputCorrect)
				this.findNext();
		},
		gameOver: function() {
			alert("Oh noes! You lost because you didnt pay attention.");
			$($("[data-level]").get(0)).text("You Lose")
		},
		turnOff: function() {
			if (splinter.active == true) {
				$(".splinter")
					.off("click", "[data-tile]")
					.off("mousedown", "[data-tile]")
					.off("mouseup", "[data-tile]")
				$(".tile").removeClass("active")
			}
		},
		randomNumber: function() {
			return Math.floor((Math.random()*5)+1);
		}

};

$("#start").click(function(){
	splinter.startGame();
});
$(".tile").on("click", function(event) {
	splinter.playerInput(event);
})

});

