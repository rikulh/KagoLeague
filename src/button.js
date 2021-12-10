function reverseAB(str) {
	if (str == "a") {
		return "b";
	} else if (str == "b") {
		return "a";
	}
}

document.addEventListener("keydown", event => {
	var keyName = event.key;
	if (event.keyCode == 39) {
		keyName = "a";
	} else if (event.keyCode == 37) {
		keyName = "b";
	}
	if (screen.stage == "start") {
        if (keyName == "e") {
            space.loop = true;
            space.play();
        } else {
            console.log($("#" + playing).get(0).currentTime);
            $("#" + playing).get(0).playbackRate = 5.0;
            screen.stage = "intro";
        };
	} else if (screen.stage == "quiz") {
		if (quizState == "answer") {
			$(".btn" + keyName).addClass("selected");
			$(".btn" + reverseAB(keyName)).removeClass("selected");
			selected = keyName;
		}
	}
});

function btn(keyName) {
	if (screen.stage == "quiz") {
		if (quizState == "answer") {
			$(".btn" + keyName).addClass("selected");
			$(".btn" + reverseAB(keyName)).removeClass("selected");
			selected = keyName;
		}
	}
}