function refresh() {

    document.getElementById("scoretext").innerText = score;

    questions.item(last_question_ind).classList.add("hidden");

    if(question_ind >= 0){
        questions.item(question_ind).classList.remove("hidden");
    }else{
        if (weird_count < weird_thresh) {
            document.getElementById("quizover").classList.remove("hidden");
            document.getElementById("score_line").classList.add("hidden");
            document.getElementById("finalscore").textContent = score;
        } else {
            document.getElementById("weirdover").classList.remove("hidden");
        }
    }
}


function nextQuestion() {
    // advance 1 question; then keep advancing until we find an appropriate question
    asked_questions.add(questions.item(question_ind));

    last_question_ind = question_ind;

    do {

        // advance
        question_ind += 1;
        question_ind %= questions.length;

        // give up after going full circle
        if(question_ind == last_question_ind){
            question_ind = -1;
            break;
        }

    } while(
            // don't ask weird questions early
            (weird_count < weird_thresh && questions.item(question_ind).dataset.weird == "True")
            // don't ask any question twice
            || asked_questions.has(questions.item(question_ind))
    );
}


function answerClicked(event) {

    if(event.target.dataset.weird == "True"){
        weird_count += 1;
    }

    if(event.target.dataset.correct == "True"){
        score += 1;
    }

    nextQuestion();

    // cleanup
    refresh();
}


// ACTUAL SETUP

let questions = document.getElementsByClassName("question");
let asked_questions = new Set();
let score = 0;
let weird_count = 0;
let weird_thresh = 1; // CHANGE THIS NUMBER TO CHANGE THE NUMBER OF WEIRD ANSWERS NEEDED TO GET WEIRD Q'S

let last_question_ind = 0;
let question_ind = 0;

for(var i = 0; i < questions.length; i++){
    questions.item(i).classList.add("hidden");
    let answers = questions.item(i).getElementsByClassName("answer");
    for(var j = 0; j < answers.length; j++){
        answers.item(j).onclick = answerClicked;
    }
}

document.getElementById("quizover").classList.add("hidden");

refresh();
