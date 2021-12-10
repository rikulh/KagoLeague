function reverseAB(str) {
	if (str == "a") {
		return "b";
	} else if (str == "b") {
		return "a";
	}
}

document.addEventListener("keydown", event => {
	var keyName = event.key;
	console.log(`keydown:${keyName}`);
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
	var cur = keyName;
});
