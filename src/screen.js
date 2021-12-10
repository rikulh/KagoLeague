let queue = "start";
let ended = "";
let playing = "first";

let space = new Audio("./sound/space.mp3");

function onEnd(str) {
	console.log("ended");
	videoEnd();
	if (str == "first") {
		console.log("1");
		$("#second").attr("src", "./video/" + queue + ".mp4");
		ended = queue;
		queue = "";
		$("#second").css("z-index", "-2");
		$("#first").css("z-index", "-5");
		$("#second").get(0).play();
		$("#second").show();
		if (screen.stage == "open") {
			$("#first").hide();
		}
		playing = "second";
	} else {
		console.log("1");
		$("#first").attr("src", "./video/" + queue + ".mp4");
		ended = queue;
		queue = "";
		$("#first").css("z-index", "-2");
		$("#second").css("z-index", "-5");
		$("#first").get(0).play();
		$("#first").show();
		if (screen.stage == "open") {
			$("#second").hide();
		}
		playing = "first";
	}
	videoStart();
}
let screen = new Vue({
	el: ".screen",
	data: {
		stage: "start"
	}
});

let straightNum = 0;
let bgmPlayed = false;
let bgm = new Audio("./sound/energy.mp3");

function videoEnd() {
	if (screen.stage == "start") {
		queue = "start";
	} else if (screen.stage == "intro") {
		queue = "intro";
		screen.stage = "open";
	} else if (screen.stage == "open") {
		queue = "open";
		screen.stage = "quiz";
	} else if (screen.stage == "quiz") {
		console.log(straightNum);
		if (straightNum == 0) {
			quiz();
		}
		if (queue == "") {
			queue = "straight";
		}
		straightNum += 1;
		console.log(ended);
		if (ended == "left" || ended == "right") {
			showCheckVideo();
		} else if (ended == "correct" || ended == "wrong") {
			check();
		} else if (ended == "correctRest" || ended == "wrongRest") {
			restEnd();
		}
	} else if (screen.stage == "end") {
		if (ended == "end") {
            bgm.pause();
			ended = "";
			playing = "first";
			screen.stage = "start";
			queue = "start";
			quizState = "show";
            bgmPlayed = false;
			quizes = [];
			for (let i = 1; i <= 3; i++) {
				const r = Math.random();
				console.log(Math.floor(r * quizSet.length));
				quizes.push(quizSet[Math.floor(r * quizSet.length)]);
				quizSet.splice(r * quizSet.length, 1);
				console.log("quizSetCount:" + quizSet.length);
			}
			quizIndex = 0;
			selected = "none";
			straightNum = -1;
		}
	}
}
function videoStart() {
	if (ended == "open") {
        space.pause();
        space.volume = 1.0;
		let open = new Audio("./sound/open.mp3");
		open.play();
        setTimeout(function() {
            if (!bgmPlayed) {
                bgm.play();
                bgm.loop = true;
                bgmPlayed = true;
            }
        },181)
	} else if (ended == "intro") {
        spaceFade();
    }
}
function spaceFade() {
    var vl = space.volume;
    if (vl > 0) {
        space.volume = Math.floor((vl - 0.1) * 10) / 10;
        setTimeout("spaceFade()", 500);
    }
}
function textAdjust(Class) {
	document.addEventListener("DOMContentLoaded", adjust);
	function adjust() {
		const title = document.getElementsByClassName(Class);
		for (i = 0; i < title.length; i++) {
			title[i].style.display = "block";
			const contentWidth = title[i].clientWidth;
			const font_size = document.defaultView.getComputedStyle(
				title[i],
				null
			).fontSize;

			title[i].style.display = "inline-block";
			title[i].style.whiteSpace = "nowrap";
			const titleWidth = title[i].clientWidth;

			if (titleWidth > contentWidth) {
				const percent = Math.floor((contentWidth / titleWidth) * 100);
				const fontEm_size = percent / 100 + "em";

				title[i].parentNode.style.fontSize = font_size;
				title[i].style.fontSize = fontEm_size;
			}
		}
	}
}

function fadein() {
	var vl = bgm.volume;
	if (vl < 1.0) {
		bgm.volume = Math.ceil((vl + 0.1) * 10) / 10;
		setTimeout("fadein()", 200);
	}
}
function fadeout() {
	var vl = bgm.volume;
	if (vl > 0) {
		bgm.volume = Math.floor((vl - 0.1) * 10) / 10;
		setTimeout("fadeout()", 200);
	}
}
