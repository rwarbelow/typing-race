typedWord = ""
words = []

function collision($div1, $div2) {
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var h2 = $div2.outerHeight(true);
	var w2 = $div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

$(document).ready(function(){
	$('.play-again').click(function(){
		window.reload();
	});
	$('form').submit(function(e){
		e.preventDefault();
		$('.enter-values').hide();
		$('.game').css('visibility', 'visible')
		$("form input[class=word]").each(function() {
			words.push($(this).val());
		});
		countdown = parseInt($(this).find('#seconds').val());
		chosenWord = words[Math.floor(Math.random()*words.length)]
		$('.word-box').html(chosenWord)

		var timer = setInterval(function(){
			if (countdown === 0) {
				clearInterval(timer)
			}
			$(".countdown").html(countdown)
			countdown -= 1
		}, 1000);

		$(document).keypress(function(e) {
			if (countdown === 0) {
				clearInterval(timer)
				$(document).off("keypress");
				$('.result').replaceWith($('.lose-screen'))
				$('.lose-screen').css('visibility', 'visible')
			}
			if (collision($('.versa'), $('.finish-line'))) {
				clearInterval(timer)
				$(document).off("keypress");
				$('.result').replaceWith($('.win-screen'))
				$('.win-screen').css('visibility', 'visible')
			}
			typedWord += letters[e.which]
			$('.typed-box').html('You typed: ' + typedWord)
			if (typedWord.length > chosenWord.length || (typedWord.indexOf("undefined") >= 0)) {
				$('.status').html('<img class="red" src="redx.png" alt="" />')
				$('.red').fadeOut('slow')
				chosenWord = words[Math.floor(Math.random()*words.length)]
				$('.word-box').html(chosenWord)
				typedWord = ""
			}
			if (typedWord == chosenWord) {
				$( ".versa" ).animate({ "left": "+=70px" }, "slow" );
				$('.status').html('<img class="green" src="greencheck.png" alt="" />')
				$('.green').fadeOut('slow')
				chosenWord = words[Math.floor(Math.random()*words.length)]
				$('.word-box').html(chosenWord)
				typedWord = ""
			}

		});
});

});


var letters = {
	97:"a",
	98:"b",
	99:"c",
	100:"d",
	101:"e",
	102:"f",
	103:"g",
	104:"h",
	105:"i",
	106:"j",
	107:"k",
	108:"l",
	109:"m",
	110:"n",
	111:"o",
	112:"p",
	113:"q",
	114:"r",
	115:"s",
	116:"t",
	117:"u",
	118:"v",
	119:"w",
	120:"x",
	121:"y",
	122:"z"
}
