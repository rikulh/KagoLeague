let quizState = "show";
let quizes = quizSet;
let quizIndex = 0;
let selected = "none";
function quiz() {
    var ask = new Audio('./sound/ask.mp3');
    ask.play();
    selected = "none";
    $(".question").attr("style","");
    if (quizes[quizIndex].type == "imageOne") {
        $(".queImgWrapper").css("display","inline");
        $(".questionImage").attr("src",quizes[quizIndex].quiz.image)
        $(".btnb").addClass("one");
        $(".btna").addClass("one");
        $(".imga").css("display","none");
        $(".imgb").css("display","none");
    } else {
        $(".queImgWrapper").css("display","none");
        $(".btnb").removeClass("one");
        $(".btna").removeClass("one");
        $(".imga").css("display","inline");
        $(".imgb").css("display","inline");
        $(".imga").attr("src", quizes[quizIndex].quiz.choice.a.image);
        $(".imgb").attr("src", quizes[quizIndex].quiz.choice.b.image);
    };
    $(".texta").html("<h2>" + quizes[quizIndex].quiz.choice.a.text + "</h2>");
    $(".textb").html("<h2>" + quizes[quizIndex].quiz.choice.b.text + "</h2>");
    textAdjust("texta");
    textAdjust("textb");
    $(".question").html("<h2>" + quizes[quizIndex].quiz.question + "</h2>");
    $(".countdownVideo").get(0).play();
    $(".choices").fadeIn(0);
    $(".choices").css("transform", "scale(1)");
    $(".question").css("transform", "translate(0, 0)");
    $(".countdown").css("transform", "translate(0, 0)");
    quizState = "answer";
    let timeCount = 14;
    $(".countImg").css("transform","scale(1.5) translate(-33.3333%, -33.3333%)");
    let countDown = setInterval(function() {
        if (timeCount <= 5) {
            $(".countImg").attr("src", "./image/" + timeCount + ".png");
            $(".countImg").fadeIn(100);
            $(".countImg").css("transform", "scale(1) translate(-50%, -50%)");
            setTimeout(function() {
                if (timeCount != -1) {
                    $(".countImg").fadeOut(100);
                    $(".countImg").css("transform", "scale(0.8) translate(-62.5%, -62.5%)");
                    setTimeout(function() {
                        $(".countImg").css("transform","scale(1.5) translate(-33.3333%, -33.3333%)");
                    },100);
                };
            },500);
        };
        timeCount -= 1;
        if (timeCount == -1) {
            clearInterval(countDown);
            $(".countdown").css("transition", "transform .5s cubic-bezier(.75,-0.53,.41,.75)");
            $(".countdown").css("transform", "translate(15vw, 0)");
            branch();
        };
    }, 1000);
};

function branch() {
    quizState = "branched";
    setTimeout(function() {
        $(".countImg").fadeOut(100);
        $(".countImg").css("transform", "scale(0.8) translate(-62.5%, -62.5%)");
        if (selected == "b") {
            $(".btnb").removeClass("selected");
            $(".btna").css("transform", "translate(50vw,0)");
            $(".btnb").css("transform", "translate(15vw,0)");
            queue = "left";
        } else if (selected == "a") {
            $(".btna").removeClass("selected");
            $(".btnb").css("transform", "translate(-50vw,0)");
            $(".btna").css("transform", "translate(-15vw,0)");
            queue = "right";
        } else {
            $(".btnb").css("transform", "translate(-50vw,0)");
            $(".btna").css("transform", "translate(50vw,0)");
            $(".question").css("transition", "transform .5s ease-in");
            $(".question").css("transform", "translate(0, -25vw)");
            $(".queImgWrapper").css("transform","translate(0, -50vw)");
            $(".el" + quizIndex).addClass("neverSelected");
            setTimeout(function() {
                $(".queImgWrapper").attr("style","");
                $(".choices").attr("style","");
                $(".choice").attr("style","");
                comedyEnd();
            },1500)
        };
    }, 1000);
};

function check() {
    if (selected == quizes[quizIndex].answer.choice) {
        var correct = new Audio('./sound/correct.mp3');
        correct.play();
        $(".countImg").attr("src", "./image/correct.png");
        $(".el" + quizIndex).addClass("correct");
        queue = "correctRest";
    } else {
        var wrong = new Audio('./sound/wrong.mp3');
        wrong.play();
        $(".countImg").attr("src", "./image/wrong.png");
        $(".el" + quizIndex).addClass("wrong");
        queue = "wrongRest";
    };
    $(".countImg").css("transform", "scale(3) translate(-16.6667%, -16.6667%)");
    $(".countImg").fadeIn(100);
    $(".countImg").css("transform", "scale(2) translate(-25%, -25%)");
    setTimeout(function() {
        $(".countImg").fadeOut();
        $(".countImg").css("transform", "scale(1.6) translate(-31.252%, -31.25%)");
    },2000);
};

function restEnd() {
    if (selected == "b") {
        $(".btnb").css("transition", "transform .5s cubic-bezier(.75,-0.53,.41,.75)");
        $(".btnb").css("transform", "translate(15vw,-50vw)");
    } else if (selected == "a") {
        $(".btna").css("transition", "transform .5s cubic-bezier(.75,-0.53,.41,.75)");
        $(".btna").css("transform", "translate(-15vw,-50vw)");
    };
    $(".queImgWrapper").css("transform", "translate(0,-50vw)");
    $(".question").css("transition", "transform .5s ease-in");
    $(".question").css("transform", "translate(0, -25vw)");
    setTimeout(function() {
        $(".choices").attr("style","");
        $(".choice").attr("style","");
        $(".queImgWrapper").attr("style","");
        comedyEnd();
    },1500);
};
function comedyEnd() {
    fadein();
    if (quizIndex != quizes.length - 1) {
        setTimeout(function() {
            quizState = "quiz";
            quizIndex += 1;
            quiz();
        },800);
    } else {
        setTimeout(function() {
            screen.stage = "end";
            queue = "end";
        },800);
    };
};

function showCheckVideo() {
    if (selected == quizes[quizIndex].answer.choice) {
        queue = "correct";
    } else {
        queue = "wrong";
    };
};